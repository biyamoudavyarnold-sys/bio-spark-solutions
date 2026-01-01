-- Restrict SELECT to authenticated users only (protect employee data)
DROP POLICY IF EXISTS "Anyone can view email requests" ON public.email_requests;
CREATE POLICY "Authenticated users can view email requests"
ON public.email_requests FOR SELECT
TO authenticated
USING (true);

-- Restrict UPDATE to authenticated users only
DROP POLICY IF EXISTS "Anyone can update email requests" ON public.email_requests;
CREATE POLICY "Authenticated users can update email requests"
ON public.email_requests FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Keep INSERT policy public for form submissions (already exists)
-- Keep DELETE policy for authenticated users (already exists)