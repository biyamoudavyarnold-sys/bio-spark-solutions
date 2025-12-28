import { ArrowDown, Leaf, Zap, Globe } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo Animation */}
          <div className="mb-8 animate-scale-in">
            <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
              <Leaf className="w-12 h-12 md:w-16 md:h-16 text-primary-foreground animate-pulse-slow" />
            </div>
          </div>

          {/* Title */}
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-slide-up">
            <span className="text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">BIOENERGIES</span>{" "}
            <span className="text-secondary drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">CONGO</span>
          </h1>

          {/* Slogan */}
          <p className="text-accent font-heading font-semibold text-lg md:text-xl mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            All To Save Area / Tout Pour Sauver l'Environnement
          </p>

          {/* Description */}
          <p className="text-primary-foreground/90 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: "0.4s" }}>
            Pionnier de la méthanisation, du crédit carbone et des énergies renouvelables au Congo-Brazzaville et en Afrique
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Leaf, label: "Environnement", value: "100% Écologique" },
              { icon: Zap, label: "Énergies", value: "Renouvelables" },
              { icon: Globe, label: "Impact", value: "Afrique" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="flex flex-col items-center p-6 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 hover-lift animate-scale-in"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <stat.icon className="w-10 h-10 text-accent mb-3" />
                <span className="text-primary-foreground font-heading font-bold text-lg">{stat.value}</span>
                <span className="text-primary-foreground/70 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#fondateur"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-heading font-semibold rounded-full hover:bg-accent-light transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 animate-slide-up"
            style={{ animationDelay: "0.8s" }}
          >
            Découvrir notre mission
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
