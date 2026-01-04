import { Flame, Lightbulb, Sun, TreeDeciduous, BookOpen, Award } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import productsVideo from "@/assets/videos/products-video.mp4";

const Products = () => {
  const { ref, isVisible } = useScrollReveal();

  const products = [
    {
      icon: Flame,
      name: "Biogaz",
      description: "Gaz de cuisine écologique produit à partir de la méthanisation des déchets organiques.",
    },
    {
      icon: Lightbulb,
      name: "Electrigaz",
      description: "Électricité verte générée à partir de sources renouvelables.",
    },
    {
      icon: Sun,
      name: "Crédit Solaire",
      description: "Solutions de financement pour l'installation de panneaux solaires.",
    },
    {
      icon: Award,
      name: "Crédit Carbone",
      description: "Certification et valorisation des crédits carbone pour les entreprises.",
    },
    {
      icon: TreeDeciduous,
      name: "Engrais Écologiques",
      description: "Engrais bio produits à partir du digestat de la méthanisation.",
    },
    {
      icon: BookOpen,
      name: "Formations",
      description: "Énergie Solaire, Gestion des Déchets, Audits (Énergétique, Environnement et Déchets).",
    },
  ];

  return (
    <section id="produits" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-secondary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Nos <span className="text-primary">Produits</span>
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
                <source src={productsVideo} type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Products Grid with advanced effects */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={product.name}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-primary rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-500 blur-xl animate-morph" />
                <div className="relative p-8 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-500 card-3d spotlight text-center overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-secondary/5 to-transparent rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 bg-gradient-primary shadow-glow relative z-10">
                    <product.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3 text-primary group-hover:text-gradient-animated transition-all duration-300 relative z-10">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 relative z-10">{product.description}</p>
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-1 bg-gradient-primary rounded-t-full transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
