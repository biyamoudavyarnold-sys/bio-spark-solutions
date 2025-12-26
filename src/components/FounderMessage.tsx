import { Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import founderImage from "@/assets/founder-ceo.jpg";

const FounderMessage = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="fondateur" className="py-20 md:py-32 bg-muted particle-bg">
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
              Mot du <span className="text-primary">Fondateur</span> &{" "}
              <span className="text-secondary">CEO</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-12 gap-12 items-start">
            {/* Founder Image */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-primary rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl" />
                <div className="relative">
                  <img
                    src={founderImage}
                    alt="Prince MAMPOUELE MAKAYA - Fondateur & PDG"
                    className="w-full rounded-2xl shadow-card object-cover aspect-[3/4]"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-6 rounded-b-2xl">
                    <h3 className="font-heading font-bold text-primary-foreground text-lg">
                      Prince MAMPOUELE MAKAYA
                    </h3>
                    <p className="text-primary-foreground/80 text-sm">
                      Fondateur & Président Directeur Général
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Content */}
            <div className="md:col-span-8 lg:col-span-9">
              <div className="relative">
                <Quote className="absolute -top-4 -left-4 w-12 h-12 text-primary/20" />
                <div className="space-y-6 text-foreground/80 leading-relaxed pl-8">
                  <p>
                    <span className="text-primary font-semibold">BIOENERGIES</span> n'est pas qu'une simple entreprise comme on pouvait la considérer, car derrière cette identité morale et professionnelle se révèle une identité divine traduite par la mission divine à travers le projet que nous déployons et accomplissons aujourd'hui.
                  </p>
                  
                  <p>
                    Après de nombreuses interrogations sur le but même de notre existence sur terre et ce qu'on a à offrir au monde en général et au Congo-Brazzaville en particulier qui pourrait marquer notre passage dans cette vie en fonction des potentiels qui nous ont été donnés par Dieu, une mission nous est confiée : celle d'apporter des solutions aux problèmes quotidiens des populations liés aux énergies.
                  </p>

                  <p>
                    Le sentiment qui nous anime c'est celui <span className="font-semibold text-accent-dark">«d'AIDER»</span> la société congolaise et africaine. Car nombreux sont des jeunes congolais et africains de notre génération, pensent toujours que l'eldorado c'est ailleurs et que l'Afrique sinon le Congo-Brazzaville est une terre déserte. Cependant, dès l'entame, nous avons considéré le Congo-Brazzaville et l'Afrique comme une terre d'<span className="font-semibold text-primary">OPPORTUNITES</span>, car si cela est un désert, nous savons que Dieu a fait couler de l'eau aux enfants d'Israël dans le désert et il est capable de le faire ici même.
                  </p>

                  <p>
                    Nous avons donc étudié notre environnement et quelquefois au-delà de celui-ci en rapport avec notre passion, nos connaissances et nos compétences diverses, nous avons compris les besoins des populations et particulièrement en <span className="font-semibold text-secondary">ENERGIES</span> puis nous les avons transformé en <span className="font-semibold text-primary">OPPORTUNITES</span>.
                  </p>

                  <p>
                    Comme pour se sentir en forme, pour se maintenir, pour travailler, pour vivre…, l'être vivant pour ne pas dire l'être humain a besoin de l'énergie et une énergie naturelle et étant donné que l'Etre même est naturel. C'est ce qui traduit l'activité de <span className="text-primary font-semibold">BIOENERGIES</span> comme vous pouvez le constater que le mot est composé de deux (02) syllabes, <span className="text-primary font-bold">BIO</span> qui vient du naturel et <span className="text-secondary font-bold">ENERGIES</span> qui tire sa source de la nature d'où <span className="text-primary font-semibold">BIO</span><span className="text-secondary font-semibold">ENERGIES</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
