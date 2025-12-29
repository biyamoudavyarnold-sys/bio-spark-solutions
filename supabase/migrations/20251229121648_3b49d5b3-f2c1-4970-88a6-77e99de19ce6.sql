-- Create table for email requests
CREATE TABLE public.email_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_name TEXT NOT NULL,
  employee_position TEXT NOT NULL,
  department TEXT NOT NULL,
  requested_email TEXT NOT NULL,
  phone_number TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'created')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.email_requests ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (anyone can submit a request)
CREATE POLICY "Anyone can submit email requests" 
ON public.email_requests 
FOR INSERT 
WITH CHECK (true);

-- Create policy for public select (anyone can view requests - for admin purposes)
CREATE POLICY "Anyone can view email requests" 
ON public.email_requests 
FOR SELECT 
USING (true);

-- Create policy for public update (for admin to update status)
CREATE POLICY "Anyone can update email requests" 
ON public.email_requests 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_email_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_email_requests_updated_at
BEFORE UPDATE ON public.email_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_email_requests_updated_at();