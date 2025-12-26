import { Recycle, Factory, Truck, Search, Zap, Leaf } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
      icon: Truck,
      title: "Distribution",
      description: "Réseau de distribution efficace pour nos produits énergétiques et écologiques.",
    },
    {
      icon: Search,
      title: "Inspections et Études d'Impact",
      description: "Audits environnementaux et études d'impact pour accompagner vos projets.",
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
      color: "secondary",
    },
    {
      name: "BIOENERGIES DISTRIBUTION",
      description: "Chargée de la distribution et la commercialisation de nos produits.",
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
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
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

          <div className="grid md:grid-cols-3 gap-6">
            {subsidiaries.map((subsidiary, index) => (
              <div
                key={subsidiary.name}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 hover-lift ${
                  subsidiary.color === "primary"
                    ? "border-primary bg-primary/5 hover:bg-primary/10"
                    : subsidiary.color === "secondary"
                    ? "border-secondary bg-secondary/5 hover:bg-secondary/10"
                    : "border-accent bg-accent/5 hover:bg-accent/10"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h4 className={`font-heading font-bold mb-3 ${
                  subsidiary.color === "primary"
                    ? "text-primary"
                    : subsidiary.color === "secondary"
                    ? "text-secondary"
                    : "text-accent-dark"
                }`}>
                  {subsidiary.name}
                </h4>
                <p className="text-muted-foreground text-sm">{subsidiary.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
