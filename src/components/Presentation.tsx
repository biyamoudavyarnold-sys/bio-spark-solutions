import { Building2, Calendar, MapPin, Target, Eye, Award, Shield, Users, Heart, Briefcase } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import presentationVideo from "@/assets/videos/founder-presentation.mp4";

const Presentation = () => {
  const { ref, isVisible } = useScrollReveal();

  const infoCards = [
    {
      icon: Building2,
      title: "Qui sommes-nous ?",
      content: "La première entreprise de méthanisation, du crédit carbone, de valorisation des déchets et de production des énergies renouvelables au Congo-Brazzaville et en Afrique.",
    },
    {
      icon: Briefcase,
      title: "Secteur d'activité",
      content: "Environnement et Énergies Renouvelables",
    },
    {
      icon: Calendar,
      title: "Date de création",
      content: "Créée depuis le 01 Octobre 2021 à Pointe-Noire au Congo-Brazzaville.",
    },
    {
      icon: MapPin,
      title: "Siège social",
      content: "01er étage, immeuble GIFRON en diagonale de la Clinique Saint Raphael, Rue Enyelle, Derrière l'Église Catholique Orthodoxe au Centre-ville, Pointe-Noire.",
    },
  ];

  const values = [
    { icon: Shield, label: "Le Respect" },
    { icon: Heart, label: "La Protection de l'Environnement" },
    { icon: Award, label: "Le Professionnalisme" },
    { icon: Users, label: "L'Orientation et la Satisfaction du Client" },
  ];

  return (
    <section id="presentation" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Présentation de <span className="text-primary">BIOENERGIES</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Fondée en 2021 par Prince MAMPOUELE MAKAYA, ingénieur en Pétrochimie et Énergies Renouvelables de l'université THE AMERICAN CHRISTIAN LIBERAL ARTS UNIVERSITY IN CONGO (DRC), <span className="text-primary font-semibold">BIOENERGIES</span> <span className="text-secondary font-semibold">CONGO</span> révolutionne l'écosystème énergétique africain par l'innovation technologique.
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6 mb-8" />
            
            {/* Video Section */}
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              >
                <source src={presentationVideo} type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Pioneer Badge */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-primary text-primary-foreground rounded-full font-heading font-semibold shadow-glow">
              <Award className="w-5 h-5" />
              Pionnier en Afrique | Première entreprise écologique et durable du Congo-Brazzaville
            </div>
          </div>

          {/* Info Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {infoCards.map((card, index) => (
              <div
                key={card.title}
                className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <card.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-2">{card.title}</h3>
                    <p className="text-muted-foreground">{card.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 bg-primary rounded-2xl text-primary-foreground">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8" />
                <h3 className="font-heading font-bold text-2xl">Notre Mission</h3>
              </div>
              <p className="leading-relaxed opacity-95">
                Révolutionner l'écosystème énergétique africain en transformant les défis environnementaux en opportunités durables, propulsant les entreprises vers la neutralité carbone grâce à nos innovations technologiques de pointe.
              </p>
            </div>

            <div className="p-8 bg-secondary rounded-2xl text-secondary-foreground">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-8 h-8" />
                <h3 className="font-heading font-bold text-2xl">Notre Vision</h3>
              </div>
              <p className="leading-relaxed opacity-95">
                Devenir le leader technologique incontournable de la transition énergétique en Afrique, créant un impact positif mesurable sur l'environnement et l'économie continentale par nos solutions innovantes.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-8">
            <h3 className="font-heading font-bold text-2xl mb-8">Nos Valeurs</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {values.map((value, index) => (
                <div
                  key={value.label}
                  className="group p-6 bg-muted rounded-xl hover:bg-primary/5 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                    <value.icon className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <span className="text-foreground font-medium text-sm">{value.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Presentation;
