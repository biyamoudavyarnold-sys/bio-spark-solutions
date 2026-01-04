import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// In-memory rate limiting store (per instance)
// For production scale, use Redis/Upstash
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000 // 5 minutes
const MAX_REQUESTS_PER_IP = 3 // 3 requests per IP per 5 minutes

function getClientIP(req: Request): string {
  // Try various headers that may contain the real client IP
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim()
  }
  
  const realIP = req.headers.get('x-real-ip')
  if (realIP) {
    return realIP.trim()
  }
  
  const cfConnectingIP = req.headers.get('cf-connecting-ip')
  if (cfConnectingIP) {
    return cfConnectingIP.trim()
  }
  
  // Fallback - should not happen in production
  return 'unknown'
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now()
  const record = rateLimitStore.get(ip)
  
  // Clean up expired entries
  if (record && now > record.resetTime) {
    rateLimitStore.delete(ip)
  }
  
  const currentRecord = rateLimitStore.get(ip)
  
  if (!currentRecord) {
    // First request from this IP
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true }
  }
  
  if (currentRecord.count >= MAX_REQUESTS_PER_IP) {
    const retryAfterSeconds = Math.ceil((currentRecord.resetTime - now) / 1000)
    return { allowed: false, retryAfterSeconds }
  }
  
  // Increment count
  currentRecord.count++
  return { allowed: true }
}

// Input validation schema (server-side)
interface EmailRequestInput {
  employee_name: string
  employee_position: string
  department: string
  requested_email: string
  phone_number?: string
  notes?: string
}

function validateInput(data: unknown): { valid: true; data: EmailRequestInput } | { valid: false; error: string } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' }
  }
  
  const input = data as Record<string, unknown>
  
  // Required fields
  if (typeof input.employee_name !== 'string' || input.employee_name.length < 2 || input.employee_name.length > 100) {
    return { valid: false, error: 'Employee name must be between 2 and 100 characters' }
  }
  
  if (typeof input.employee_position !== 'string' || input.employee_position.length < 2 || input.employee_position.length > 100) {
    return { valid: false, error: 'Employee position must be between 2 and 100 characters' }
  }
  
  if (typeof input.department !== 'string' || input.department.length < 1 || input.department.length > 100) {
    return { valid: false, error: 'Department is required' }
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (typeof input.requested_email !== 'string' || !emailRegex.test(input.requested_email) || input.requested_email.length > 255) {
    return { valid: false, error: 'Invalid email format' }
  }
  
  // Optional phone number validation
  let phone_number: string | undefined
  if (input.phone_number !== undefined && input.phone_number !== null && input.phone_number !== '') {
    if (typeof input.phone_number !== 'string') {
      return { valid: false, error: 'Invalid phone number format' }
    }
    const phoneRegex = /^\+?[0-9\s\-\(\)]+$/
    if (!phoneRegex.test(input.phone_number) || input.phone_number.length > 20) {
      return { valid: false, error: 'Invalid phone number format (max 20 characters)' }
    }
    phone_number = input.phone_number
  }
  
  // Optional notes validation
  let notes: string | undefined
  if (input.notes !== undefined && input.notes !== null && input.notes !== '') {
    if (typeof input.notes !== 'string' || input.notes.length > 500) {
      return { valid: false, error: 'Notes must be less than 500 characters' }
    }
    notes = input.notes
  }
  
  return {
    valid: true,
    data: {
      employee_name: input.employee_name.trim(),
      employee_position: input.employee_position.trim(),
      department: input.department.trim(),
      requested_email: input.requested_email.trim().toLowerCase(),
      phone_number: phone_number?.trim(),
      notes: notes?.trim(),
    }
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(req)
    console.log(`Email request from IP: ${clientIP}`)

    // Check per-IP rate limit
    const rateLimitResult = checkRateLimit(clientIP)
    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`)
      return new Response(
        JSON.stringify({ 
          error: 'Trop de demandes. Veuillez réessayer plus tard.',
          retryAfterSeconds: rateLimitResult.retryAfterSeconds 
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': String(rateLimitResult.retryAfterSeconds)
          } 
        }
      )
    }

    // Parse and validate input
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const validation = validateInput(body)
    if (!validation.valid) {
      console.log(`Validation error: ${validation.error}`)
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase client with service role for insert
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Insert the email request
    const { data, error } = await supabase
      .from('email_requests')
      .insert([{
        employee_name: validation.data.employee_name,
        employee_position: validation.data.employee_position,
        department: validation.data.department,
        requested_email: validation.data.requested_email,
        phone_number: validation.data.phone_number || null,
        notes: validation.data.notes || null,
      }])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ error: 'Erreur lors de la soumission de la demande.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Email request submitted successfully: ${data.id}`)
    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Une erreur inattendue est survenue.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
