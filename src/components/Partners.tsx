import { useScrollReveal } from "@/hooks/useScrollReveal";
import logoImage from "@/assets/logo-bioenergies.png";

const Partners = () => {
  const { ref, isVisible } = useScrollReveal();

  const partners = [
    {
      name: "BIOCARBONE R&D",
      country: "France",
      logo: logoImage, // Will be replaced with actual partner logo
    },
    {
      name: "MAGMA ENERGY",
      country: "France",
      logo: null,
    },
    {
      name: "ROTEK MANAGEMENT LTD",
      country: "Canada",
      logo: null,
    },
    {
      name: "FRISOMAT",
      country: "Belgique",
      logo: null,
    },
    {
      name: "BUSINESS CONSULTING LOGISTIQUES",
      country: "Congo",
      logo: null,
    },
    {
      name: "BANQUE DE DÉVELOPPEMENT DES ÉTATS DE L'AFRIQUE CENTRALE",
      country: "Afrique Centrale",
      logo: null,
    },
  ];

  return (
    <section id="partenaires" className="py-20 md:py-32 bg-background">
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
              Nos <span className="text-secondary">Partenaires</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nous collaborons avec des partenaires internationaux de confiance pour offrir les meilleures solutions énergétiques et environnementales.
            </p>
            <div className="w-24 h-1 bg-gradient-secondary mx-auto rounded-full mt-6" />
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, index) => (
              <div
                key={partner.name}
                className="group p-6 bg-card rounded-xl border border-border hover:border-secondary/30 transition-all duration-300 hover-lift flex flex-col items-center text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center group-hover:bg-secondary/10 transition-colors overflow-hidden">
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <span className="text-2xl font-heading font-bold text-secondary">
                      {partner.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h4 className="font-heading font-semibold text-sm mb-1 group-hover:text-secondary transition-colors">
                  {partner.name}
                </h4>
                <span className="text-muted-foreground text-xs">{partner.country}</span>
              </div>
            ))}
          </div>

          {/* Legal Info */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-wrap justify-center gap-4 px-6 py-4 bg-muted rounded-xl text-sm text-muted-foreground">
              <span>RCCM N°: CG-PNR-01-2025-B15-00008</span>
              <span className="hidden md:inline">|</span>
              <span>NIU N°: M2500000073707900</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
