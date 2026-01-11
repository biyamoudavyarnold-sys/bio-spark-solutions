import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useToast } from "@/hooks/use-toast";
import QRCodeComponent from "./QRCode";
import contactVideo from "@/assets/videos/contact-section.mp4";

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();
    
    if (!name || !email || !subject || !message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      });
      return;
    }
    
    // Open email client with pre-filled message
    const mailtoBody = `Nom: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${encodeURIComponent(message)}`;
    const mailtoLink = `mailto:contact@bioenergies-congo.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;
    
    window.location.href = mailtoLink;
    
    toast({
      title: "Client email ouvert",
      description: "Veuillez envoyer le message depuis votre application email.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Téléphone",
      value: "(+242) 06 741 42 05",
      href: "tel:+242067414205",
    },
    {
      icon: Mail,
      label: "Email",
      value: "contact@bioenergies-congo.com",
      href: "mailto:contact@bioenergies-congo.com",
    },
    {
      icon: MapPin,
      label: "Adresse",
      value: "01er étage immeuble GIFRON, Rue Enyelle en diagonal de la Clinique Saint Raphael, EP LUMUMBA, Centre-Ville, Pointe-Noire, République du Congo",
      href: null,
    },
    {
      icon: Clock,
      label: "Horaires",
      value: "Lun - Ven: 8h00 - 17h00",
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Video Banner */}
          <div className="relative rounded-2xl overflow-hidden mb-12 aspect-video max-w-4xl mx-auto shadow-2xl">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src={contactVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-muted/80 via-transparent to-transparent" />
          </div>

          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-primary">Contactez</span>-nous
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Vous avez des questions ou souhaitez collaborer avec nous ? N'hésitez pas à nous contacter.
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card p-8 rounded-2xl shadow-card">
              <h3 className="font-heading font-bold text-xl mb-6">Envoyez-nous un message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom complet</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Sujet</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-primary text-primary-foreground font-heading font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Send className="w-5 h-5" />
                  Envoyer le message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={info.label}
                    className="p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-all hover-lift"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-sm text-muted-foreground mb-1">
                          {info.label}
                        </h4>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-foreground hover:text-primary transition-colors text-sm"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground text-sm">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* QR Code */}
              <div className="p-6 bg-card rounded-xl border border-border text-center">
                <h4 className="font-heading font-bold text-lg mb-4">Scannez notre QR Code</h4>
                <QRCodeComponent />
                <p className="text-muted-foreground text-sm mt-4">
                  Scannez pour accéder à notre site web
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
