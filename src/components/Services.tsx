import { Recycle, Factory, Truck, Search, Zap, Leaf, Sun, GraduationCap } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import servicesVideo from "@/assets/videos/services-video.mp4";

const Services = () => {
  const { ref, isVisible } = useScrollReveal();

  const services = [
    {
      icon: Recycle,
      title: "Collecte, Tri Sélectif et Gestion des Déchets",
      description: "Solutions complètes pour la collecte et le tri sélectif des déchets organiques et recyclables.",
    },
    {
      icon: Factory,
      title: "Traitement, Transformation et Production des Énergies Renouvelables",
      description: "Production de biogaz, énergie solaire et autres sources d'énergie renouvelable.",
    },
    {
      icon: Leaf,
      title: "Valorisation du Crédit Carbone",
      description: "Accompagnement des entreprises dans la certification et la valorisation de leurs crédits carbone.",
    },
    {
      icon: Zap,
      title: "Production des Engrais Écologiques",
      description: "Fabrication d'engrais bio à partir de la valorisation des déchets organiques.",
    },
    {
      icon: Sun,
      title: "Énergie Solaire",
      description: "Installation et maintenance de systèmes photovoltaïques pour une énergie propre et durable.",
    },
    {
      icon: Truck,
      title: "Distribution",
      description: "Réseau de distribution efficace pour nos produits énergétiques et écologiques.",
    },
    {
      icon: Search,
      title: "Inspections et Études d'Impact",
      description: "Audits environnementaux et études d'impact pour accompagner vos projets.",
    },
    {
      icon: GraduationCap,
      title: "R&D, Formation",
      description: "Innovation continue et programmes de formation pour développer les compétences dans le secteur des énergies renouvelables.",
    },
  ];

  const subsidiaries = [
    {
      name: "BIOENERGIES ENVIRONNEMENT & ASSAINISSEMENT",
      description: "Chargée de la collecte, tri et la gestion des déchets, des inspections et études d'impact environnementale.",
      color: "primary",
    },
    {
      name: "BIOENERGIES TRAITEMENT-TRANSFORMATION & PRODUCTION",
      description: "S'occupe du traitement et de la transformation des déchets pour la production du biogaz, de l'électricité verte et des engrais écologiques.",
      color: "black",
    },
    {
      name: "BIOENERGIES DISTRIBUTION",
      description: "Chargée de la distribution et la commercialisation de nos produits.",
      color: "secondary",
    },
    {
      name: "BIOENERGIES SOLAR",
      description: "Spécialisée dans les solutions d'énergie solaire et les installations photovoltaïques.",
      color: "accent",
    },
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-muted">
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
              Nos <span className="text-primary">Services</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-8" />
            
            {/* Video Section */}
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              >
                <source src={servicesVideo} type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Services Grid with 3D cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-500 card-3d spotlight ripple-container"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-glow">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">{service.description}</p>
                {/* Hover indicator line */}
                <div className="h-0.5 w-0 group-hover:w-full bg-gradient-primary mt-4 transition-all duration-500 rounded-full" />
              </div>
            ))}
          </div>

          {/* Subsidiaries */}
          <div className="text-center mb-12">
            <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
              Nos <span className="text-secondary">Filiales</span>
            </h3>
            <div className="w-16 h-1 bg-gradient-secondary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subsidiaries.map((subsidiary, index) => (
              <div
                key={subsidiary.name}
                className={`group p-6 rounded-2xl border-2 transition-all duration-500 card-3d relative overflow-hidden ${
                  subsidiary.color === "primary"
                    ? "border-primary bg-primary/5 hover:bg-primary/10"
                    : subsidiary.color === "secondary"
                    ? "border-secondary bg-secondary/5 hover:bg-secondary/10"
                    : subsidiary.color === "black"
                    ? "border-foreground bg-foreground/5 hover:bg-foreground/10"
                    : "border-accent bg-accent/5 hover:bg-accent/10"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  subsidiary.color === "primary"
                    ? "bg-gradient-to-bl from-primary/20 to-transparent"
                    : subsidiary.color === "secondary"
                    ? "bg-gradient-to-bl from-secondary/20 to-transparent"
                    : subsidiary.color === "black"
                    ? "bg-gradient-to-bl from-foreground/20 to-transparent"
                    : "bg-gradient-to-bl from-accent/20 to-transparent"
                }`} />
                <h4 className={`font-heading font-bold mb-3 transition-transform duration-300 group-hover:translate-x-1 ${
                  subsidiary.color === "primary"
                    ? "text-primary"
                    : subsidiary.color === "secondary"
                    ? "text-secondary"
                    : subsidiary.color === "black"
                    ? "text-foreground"
                    : "text-accent-dark"
                }`}>
                  {subsidiary.name}
                </h4>
                <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">{subsidiary.description}</p>
                {/* Animated underline */}
                <div className={`h-0.5 w-0 group-hover:w-1/2 mt-4 transition-all duration-500 rounded-full ${
                  subsidiary.color === "primary"
                    ? "bg-primary"
                    : subsidiary.color === "secondary"
                    ? "bg-secondary"
                    : subsidiary.color === "black"
                    ? "bg-foreground"
                    : "bg-accent"
                }`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
