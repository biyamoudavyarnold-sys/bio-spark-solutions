-- ============================================
-- FIX 1: Create user roles system for admin access
-- ============================================

-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Admin can see all roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

-- Create security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- ============================================
-- FIX 2: Restrict email_requests to admin only
-- ============================================

-- DROP existing permissive policies
DROP POLICY IF EXISTS "Authenticated users can view email requests" ON public.email_requests;
DROP POLICY IF EXISTS "Authenticated users can update email requests" ON public.email_requests;
DROP POLICY IF EXISTS "Only authenticated users can delete requests" ON public.email_requests;

-- Only admins can view email requests
CREATE POLICY "Admins can view email requests"
ON public.email_requests FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update email requests  
CREATE POLICY "Admins can update email requests"
ON public.email_requests FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete email requests
CREATE POLICY "Admins can delete email requests"
ON public.email_requests FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- ============================================
-- FIX 3: Database-level rate limiting for INSERT
-- ============================================

-- Create rate limit function
CREATE OR REPLACE FUNCTION public.check_email_request_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  -- Count submissions in the last 5 minutes (max 10 allowed globally)
  SELECT COUNT(*) INTO recent_count
  FROM public.email_requests
  WHERE created_at > NOW() - INTERVAL '5 minutes';
  
  IF recent_count >= 10 THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please try again later.';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for rate limiting
CREATE TRIGGER email_request_rate_limit
BEFORE INSERT ON public.email_requests
FOR EACH ROW
EXECUTE FUNCTION public.check_email_request_rate_limit();