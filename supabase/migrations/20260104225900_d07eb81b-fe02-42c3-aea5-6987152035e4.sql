-- Update the rate limit trigger to be stricter (5 requests per 15 minutes globally instead of 10 per 5 minutes)
CREATE OR REPLACE FUNCTION public.check_email_request_rate_limit()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  recent_count INTEGER;
BEGIN
  -- Count submissions in the last 15 minutes (max 5 allowed globally - stricter limit)
  SELECT COUNT(*) INTO recent_count
  FROM public.email_requests
  WHERE created_at > NOW() - INTERVAL '15 minutes';
  
  IF recent_count >= 5 THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please try again later.';
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Ensure the trigger exists and is attached to the table
DROP TRIGGER IF EXISTS email_request_rate_limit ON public.email_requests;
CREATE TRIGGER email_request_rate_limit
  BEFORE INSERT ON public.email_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.check_email_request_rate_limit();