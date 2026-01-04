import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, User, Briefcase, Building2, Phone, Send, CheckCircle } from "lucide-react";
import { z } from "zod";

const phoneRegex = /^\+?[0-9\s\-\(\)]+$/;

const emailRequestSchema = z.object({
  employee_name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  employee_position: z.string().min(2, "Le poste doit contenir au moins 2 caractères").max(100),
  department: z.string().min(1, "Veuillez sélectionner un département"),
  requested_email: z.string().email("Format d'email invalide").max(255),
  phone_number: z.string()
    .max(20, "Numéro trop long (max 20 caractères)")
    .regex(phoneRegex, "Format de téléphone invalide")
    .optional()
    .or(z.literal('')),
  notes: z.string().max(500, "Notes trop longues (max 500 caractères)").optional(),
});

const departments = [
  "Direction Générale",
  "Administration & Finance",
  "Ressources Humaines",
  "Exploitation",
  "Opérations",
  "Commercial & Marketing",
  "Qualité-Hygiène-Sécurité-Environnement",
  "Services Informatiques",
  "Juridique & Contentieux",
  "Environnement & Assainissement",
  "Laboratoire",
  "Autre",
];

const RATE_LIMIT_KEY = 'email_request_last_submission';
const RATE_LIMIT_MS = 60000; // 1 minute cooldown

const EmailRequestForm = () => {
  const { ref, isVisible } = useScrollReveal();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    employee_name: "",
    employee_position: "",
    department: "",
    requested_email: "",
    phone_number: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const generateEmailSuggestion = (name: string) => {
    if (!name) return "";
    const cleanName = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z\s]/g, "")
      .trim();
    const parts = cleanName.split(" ").filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0]}.${parts[parts.length - 1]}@bioenergies-congo.com`;
    }
    return parts[0] ? `${parts[0]}@bioenergies-congo.com` : "";
  };

  const handleNameChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      employee_name: value,
      requested_email: generateEmailSuggestion(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Client-side rate limiting (UX only, real security is server-side)
    const lastSubmission = localStorage.getItem(RATE_LIMIT_KEY);
    if (lastSubmission) {
      const timeSinceLastSubmission = Date.now() - parseInt(lastSubmission, 10);
      if (timeSinceLastSubmission < RATE_LIMIT_MS) {
        const secondsRemaining = Math.ceil((RATE_LIMIT_MS - timeSinceLastSubmission) / 1000);
        toast({
          title: "Veuillez patienter",
          description: `Vous pourrez soumettre une nouvelle demande dans ${secondsRemaining} secondes.`,
          variant: "destructive",
        });
        return;
      }
    }

    try {
      const validated = emailRequestSchema.parse(formData);
      setIsSubmitting(true);

      const requestData = {
        employee_name: validated.employee_name,
        employee_position: validated.employee_position,
        department: validated.department,
        requested_email: validated.requested_email,
        phone_number: validated.phone_number || null,
        notes: validated.notes || null,
      };

      // Use edge function for per-IP rate limiting and secure submission
      const { data, error } = await supabase.functions.invoke('submit-email-request', {
        body: requestData,
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Submission failed');
      }

      if (data?.error) {
        // Handle rate limit error from edge function
        if (data.retryAfterSeconds) {
          toast({
            title: "Trop de demandes",
            description: `Veuillez réessayer dans ${data.retryAfterSeconds} secondes.`,
            variant: "destructive",
          });
          return;
        }
        throw new Error(data.error);
      }

      // Update rate limit timestamp on successful submission
      localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());

      setIsSuccess(true);
      toast({
        title: "Demande envoyée !",
        description: "Votre demande de création d'email a été soumise avec succès.",
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          employee_name: "",
          employee_position: "",
          department: "",
          requested_email: "",
          phone_number: "",
          notes: "",
        });
        setIsSuccess(false);
      }, 3000);

    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Erreur",
          description: error instanceof Error ? error.message : "Une erreur est survenue lors de l'envoi de la demande.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="email-request" className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-heading text-3xl font-bold mb-4">Demande Envoyée !</h2>
            <p className="text-muted-foreground">
              Votre demande de création d'email professionnel a été soumise avec succès. 
              L'équipe IT traitera votre demande dans les plus brefs délais.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="email-request" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm">Email Professionnel</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Demande d'<span className="text-primary">Email</span> Professionnel
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Remplissez ce formulaire pour demander la création d'une adresse email 
              professionnelle @bioenergies-congo.com pour un employé.
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8 shadow-lg">
              <div className="space-y-6">
                {/* Employee Name */}
                <div className="space-y-2">
                  <Label htmlFor="employee_name" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    Nom complet de l'employé *
                  </Label>
                  <Input
                    id="employee_name"
                    placeholder="Ex: Jean-Pierre MBONGO"
                    value={formData.employee_name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className={errors.employee_name ? "border-destructive" : ""}
                  />
                  {errors.employee_name && (
                    <p className="text-sm text-destructive">{errors.employee_name}</p>
                  )}
                </div>

                {/* Position */}
                <div className="space-y-2">
                  <Label htmlFor="employee_position" className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    Poste / Fonction *
                  </Label>
                  <Input
                    id="employee_position"
                    placeholder="Ex: Manager Commercial"
                    value={formData.employee_position}
                    onChange={(e) => setFormData(prev => ({ ...prev, employee_position: e.target.value }))}
                    className={errors.employee_position ? "border-destructive" : ""}
                  />
                  {errors.employee_position && (
                    <p className="text-sm text-destructive">{errors.employee_position}</p>
                  )}
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <Label htmlFor="department" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    Département *
                  </Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
                  >
                    <SelectTrigger className={errors.department ? "border-destructive" : ""}>
                      <SelectValue placeholder="Sélectionnez un département" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.department && (
                    <p className="text-sm text-destructive">{errors.department}</p>
                  )}
                </div>

                {/* Requested Email */}
                <div className="space-y-2">
                  <Label htmlFor="requested_email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    Adresse email souhaitée *
                  </Label>
                  <Input
                    id="requested_email"
                    type="email"
                    placeholder="prenom.nom@bioenergies-congo.com"
                    value={formData.requested_email}
                    onChange={(e) => setFormData(prev => ({ ...prev, requested_email: e.target.value }))}
                    className={errors.requested_email ? "border-destructive" : ""}
                  />
                  {errors.requested_email && (
                    <p className="text-sm text-destructive">{errors.requested_email}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    L'email est généré automatiquement mais vous pouvez le modifier
                  </p>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone_number" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    Numéro de téléphone (optionnel)
                  </Label>
                  <Input
                    id="phone_number"
                    type="tel"
                    placeholder="+242 XX XXX XX XX"
                    value={formData.phone_number}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
                  />
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes additionnelles (optionnel)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Informations supplémentaires..."
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Soumettre la demande
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Info Box */}
            <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
              <h3 className="font-heading font-semibold mb-2 text-primary">Comment ça fonctionne ?</h3>
              <ol className="text-sm text-muted-foreground space-y-2">
                <li>1. Remplissez le formulaire avec les informations de l'employé</li>
                <li>2. L'équipe IT recevra et traitera votre demande</li>
                <li>3. L'adresse email sera créée et les identifiants envoyés à l'employé</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailRequestForm;
