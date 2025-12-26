import Logo from "./Logo";
import { Facebook, Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const quickLinks = [
    { label: "Accueil", href: "#accueil" },
    { label: "Présentation", href: "#presentation" },
    { label: "Services", href: "#services" },
    { label: "Produits", href: "#produits" },
    { label: "Activités", href: "#activites" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Logo size="md" className="mb-6 [&_span]:text-primary-foreground [&_.text-primary]:!text-primary-light [&_.text-secondary]:!text-secondary-light [&_.text-accent]:!text-accent" />
            <p className="text-primary-foreground/70 mb-6 max-w-md">
              Pionnier de la méthanisation, du crédit carbone et des énergies renouvelables au Congo-Brazzaville. Transformons ensemble les défis environnementaux en opportunités durables.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-3 text-primary-foreground/70">
              <li>
                <a href="tel:+242067414205" className="hover:text-accent transition-colors">
                  (+242) 06 741 42 05
                </a>
              </li>
              <li>
                <a href="mailto:contact@bioenergies-congo.com" className="hover:text-accent transition-colors">
                  contact@bioenergies-congo.com
                </a>
              </li>
              <li>Pointe-Noire, République du Congo</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm text-center md:text-left">
            © {new Date().getFullYear()} BIOENERGIES CONGO. Tous droits réservés.
          </p>
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary-light transition-colors"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
