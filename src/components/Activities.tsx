import { Calendar, MapPin, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import siteVisit from "@/assets/site-visit.jpg";
import teamMeeting from "@/assets/team-meeting.jpg";
import mayDay from "@/assets/may-day.jpg";
import conferenceOser from "@/assets/conference-oser.jpg";
import activityBiogas from "@/assets/activity-biogas.jpg";
import pilotTeam from "@/assets/pilot-team.jpg";

const Activities = () => {
  const { ref, isVisible } = useScrollReveal();

  const activities = [
    {
      image: siteVisit,
      title: "Première visite du site d'exploitation",
      date: "1er Mai 2025",
      location: "MBOUKOU, Département du Kouilou",
      description: "Les images de la visite du site d'exploitation de BIOENERGIES CONGO le 1er Mai 2025 à MBOUKOU dans le Département du Kouilou en République du Congo.",
    },
    {
      image: teamMeeting,
      title: "Réunion de l'équipe pilotage",
      date: "2025",
      location: "Pointe-Noire",
      description: "Réunion de l'équipe pilotage BIOENERGIES CONGO pour définir les orientations stratégiques de l'entreprise.",
    },
    {
      image: mayDay,
      title: "Célébration de la Fête du Travail",
      date: "1er Mai 2025",
      location: "Pointe-Noire",
      description: "1er Mai 2025, la société BIOENERGIES CONGO célèbre la fête du travail, le tout premier avec son personnel pilote.",
    },
    {
      image: activityBiogas,
      title: "Mission de service auprès de nos partenaires",
      date: "17 au 19 Septembre 2025",
      location: "Brazzaville",
      description: "De Mercredi 17 au Vendredi 19 septembre 2025 : Mission de service auprès de nos partenaires à Brazzaville.",
    },
  ];

  const conferencePhotos = [
    { image: conferenceOser, alt: "Conférence OSER - Vue 1" },
    { image: activityBiogas, alt: "Conférence OSER - Vue 2" },
    { image: teamMeeting, alt: "Conférence OSER - Vue 3" },
  ];

  return (
    <section id="activites" className="py-20 md:py-32 bg-muted">
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
              Nos <span className="text-primary">Activités</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
          </div>

          {/* Activities Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {activities.map((activity, index) => (
              <div
                key={activity.title}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-4 text-primary-foreground text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {activity.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {activity.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Conference OSER Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-2">
                Notre Participation à la Conférence <span className="text-secondary">OSER</span>
              </h3>
              <p className="text-muted-foreground">
                Action commerciale à la conférence OSER tenue le samedi 15 novembre 2025, au Port Autonome de Pointe-Noire
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {conferencePhotos.map((photo, index) => (
                <div
                  key={index}
                  className="group relative h-64 rounded-2xl overflow-hidden shadow-card"
                >
                  <img
                    src={photo.image}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-secondary/20 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Pilot Team Section */}
          <div>
            <div className="text-center mb-12">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-2">
                <span className="text-primary">L'Équipe</span> de Pilotage
              </h3>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5" />
                <span>Les membres fondateurs de BIOENERGIES CONGO</span>
              </div>
            </div>

            {/* Team Group Photo */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="relative rounded-2xl overflow-hidden shadow-card group">
                <img
                  src={pilotTeam}
                  alt="Équipe de pilotage BIOENERGIES CONGO"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-primary-foreground font-heading font-semibold text-lg">
                    Les photos de l'équipe de pilotage BIOENERGIES CONGO
                  </p>
                </div>
              </div>
            </div>

            {/* Individual Team Members */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
                { name: "TCHISSAMBOU BITELIKA née Rebecca NGOMA", title: "Manager Administratif et Financier" },
                { name: "Martin KIHOUNDA DITOMENE", title: "Manager Ressources Humaines" },
                { name: "Ampère Claude NTONSI KOUBEYA", title: "Manager Exploitation" },
                { name: "Nidel Steeve MOUANDZA MAKEMI", title: "Manager Opérations" },
                { name: "AMBARA née MOUASSA KITSOUKOU Kady Léna", title: "Manager Commercial & Marketing" },
                { name: "Jean-Bernard MADZOU", title: "Manager Qualité-Hygiène Sécurité-Environnement & Énergétique" },
                { name: "MVIRI HONDJUILA François Fabrice", title: "Manager Services Informatiques" },
                { name: "Vincent SAMBA", title: "Manager Juridique et Contentieux" },
                { name: "Aude Belvarine Farelle NDZOULOU MATONDO", title: "Manager Environnement & Assainissement" },
              ].map((member, index) => (
                <div
                  key={index}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card hover-lift"
                >
                  {/* Photo Placeholder */}
                  <div className="relative h-48 bg-muted overflow-hidden flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                      <Users className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                  </div>
                  {/* Name and Title */}
                  <div className="p-4 text-center">
                    <p className="font-heading font-bold text-sm text-foreground mb-1">
                      {member.name}
                    </p>
                    <h4 className="font-medium text-xs text-primary">
                      {member.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;
