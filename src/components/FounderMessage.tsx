import { Quote, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import founderImage from "@/assets/founder-ceo.jpg";
import FloatingParticles from "./FloatingParticles";

const FounderMessage = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="fondateur" className="py-20 md:py-32 bg-muted relative overflow-hidden">
      {/* Background effects */}
      <FloatingParticles count={15} className="opacity-30" />
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-secondary/5 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Header with animation */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-elastic">
              <Sparkles className="w-4 h-4" />
              Message Inspirant
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Mot du <span className="text-gradient-animated">Fondateur & CEO</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full animate-gradient" style={{ backgroundSize: '200% 200%' }} />
          </div>

          <div className="grid md:grid-cols-12 gap-12 items-start">
            {/* Founder Image with 3D effect */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-primary rounded-2xl opacity-20 group-hover:opacity-40 transition-all duration-500 blur-xl animate-morph" />
                <div className="relative card-3d">
                  <img
                    src={founderImage}
                    alt="Prince MAMPOUELE MAKAYA - Fondateur & PDG"
                    className="w-full rounded-2xl shadow-card object-cover aspect-[3/4] transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/90 via-foreground/60 to-transparent p-6 rounded-b-2xl">
                    <h3 className="font-heading font-bold text-primary-foreground text-lg">
                      Prince MAMPOUELE MAKAYA
                    </h3>
                    <p className="text-primary-foreground/80 text-sm">
                      Fondateur & Président Directeur Général
                    </p>
                  </div>
                  {/* Decorative corner */}
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-accent rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-20 left-4 w-12 h-12 border-b-2 border-l-2 border-primary rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>

            {/* Message Content with staggered animation */}
            <div className="md:col-span-8 lg:col-span-9">
              <div className="relative glass rounded-2xl p-8 shadow-soft">
                <Quote className="absolute -top-4 -left-4 w-16 h-16 text-primary/10" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/10 to-transparent rounded-tr-2xl" />
                
                <div className="space-y-6 text-foreground leading-relaxed pl-8 relative z-10">
                  <p className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    <span className="text-primary font-semibold">BIOENERGIES</span> n'est pas qu'une simple entreprise comme on pouvait la considérer, car derrière cette identité morale et professionnelle se révèle une identité divine traduite par la mission divine à travers le projet que nous déployons et accomplissons aujourd'hui.
                  </p>
                  
                  <p className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    Après de nombreuses interrogations sur le but même de notre existence sur terre et ce qu'on a à offrir au monde en général et au Congo-Brazzaville en particulier qui pourrait marquer notre passage dans cette vie en fonction des potentiels qui nous ont été donnés par Dieu, une mission nous est confiée : celle d'apporter des solutions aux problèmes quotidiens des populations liés aux énergies.
                  </p>

                  <p className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    Le sentiment qui nous anime c'est celui <span className="font-semibold text-accent-dark px-2 py-0.5 bg-accent/10 rounded">«d'AIDER»</span> la société congolaise et africaine. Car nombreux sont des jeunes congolais et africains de notre génération, pensent toujours que l'eldorado c'est ailleurs et que l'Afrique sinon le Congo-Brazzaville est une terre déserte. Cependant, dès l'entame, nous avons considéré le Congo-Brazzaville et l'Afrique comme une terre d'<span className="font-semibold text-primary px-2 py-0.5 bg-primary/10 rounded">OPPORTUNITES</span>.
                  </p>

                  <p className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    Nous avons donc étudié notre environnement et quelquefois au-delà de celui-ci en rapport avec notre passion, nos connaissances et nos compétences diverses, nous avons compris les besoins des populations et particulièrement en <span className="font-semibold text-secondary px-2 py-0.5 bg-secondary/10 rounded">ENERGIES</span> puis nous les avons transformé en <span className="font-semibold text-primary">OPPORTUNITES</span>.
                  </p>

                  <p className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    Comme pour se sentir en forme, pour se maintenir, pour travailler, pour vivre…, l'être vivant pour ne pas dire l'être humain a besoin de l'énergie et une énergie naturelle étant donné que l'Être même est naturel. C'est ce qui traduit l'activité de <span className="text-primary font-semibold">BIOENERGIES</span> comme vous pouvez le constater que le mot est composé de deux (02) syllabes, <span className="text-primary font-bold text-lg">BIO</span> qui vient du naturel et <span className="text-secondary font-bold text-lg">ENERGIES</span> qui tire sa source de la nature d'où <span className="text-gradient-animated font-bold text-xl">BIOENERGIES</span>.
                  </p>
                </div>
                
                <Quote className="absolute bottom-4 right-8 w-12 h-12 text-secondary/10 rotate-180" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
