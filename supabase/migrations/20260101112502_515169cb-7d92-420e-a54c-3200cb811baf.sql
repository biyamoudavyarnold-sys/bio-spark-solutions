-- Add length constraints for phone_number and notes fields
ALTER TABLE public.email_requests
ADD CONSTRAINT phone_number_length CHECK (phone_number IS NULL OR length(phone_number) <= 20);

ALTER TABLE public.email_requests
ADD CONSTRAINT phone_number_format CHECK (phone_number IS NULL OR phone_number ~ '^\+?[0-9\s\-\(\)]+$');

ALTER TABLE public.email_requests
ADD CONSTRAINT notes_length CHECK (notes IS NULL OR length(notes) <= 500);

-- Add explicit DELETE policy for authenticated users only
CREATE POLICY "Only authenticated users can delete requests"
ON public.email_requests FOR DELETE
TO authenticated
USING (true);