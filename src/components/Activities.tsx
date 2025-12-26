import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import siteVisit from "@/assets/site-visit.jpg";
import teamMeeting from "@/assets/team-meeting.jpg";
import mayDay from "@/assets/may-day.jpg";
import conferenceOser from "@/assets/conference-oser.jpg";
import activityBiogas from "@/assets/activity-biogas.jpg";
import pilotTeam from "@/assets/pilot-team.jpg";
import managerAdministratif from "@/assets/manager-administratif.jpg";
import managerRH from "@/assets/manager-rh.jpg";
import managerExploitation from "@/assets/manager-exploitation.jpg";
import managerOperations from "@/assets/manager-operations.jpg";
import managerCommercial from "@/assets/manager-commercial.jpg";
import managerQualite from "@/assets/manager-qualite.jpg";
import managerInformatiques from "@/assets/manager-informatiques.jpg";
import managerJuridique from "@/assets/manager-juridique.jpg";
import managerEnvironnement from "@/assets/manager-environnement.jpg";

const teamMembers = [
  { name: "TCHISSAMBOU BITELIKA née Rebecca NGOMA", title: "Manager Administratif et Financier", photo: managerAdministratif },
  { name: "Martin KIHOUNDA DITOMENE", title: "Manager Ressources Humaines", photo: managerRH },
  { name: "Ampère Claude NTONSI KOUBEYA", title: "Manager Exploitation", photo: managerExploitation },
  { name: "Nidel Steeve MOUANDZA MAKEMI", title: "Manager Opérations", photo: managerOperations },
  { name: "AMBARA née MOUASSA KITSOUKOU Kady Léna", title: "Manager Commercial & Marketing", photo: managerCommercial },
  { name: "Jean-Bernard MADZOU", title: "Manager Qualité-Hygiène Sécurité-Environnement & Énergétique", photo: managerQualite },
  { name: "MVIRI HONDJUILA François Fabrice", title: "Manager Services Informatiques", photo: managerInformatiques },
  { name: "Vincent SAMBA", title: "Manager Juridique et Contentieux", photo: managerJuridique },
  { name: "Aude Belvarine Farelle NDZOULOU MATONDO", title: "Manager Environnement & Assainissement", photo: managerEnvironnement },
  { name: "", title: "Responsable du Laboratoire", photo: null },
];
// Team Carousel Component
const TeamCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const membersWithPhotos = teamMembers.filter(m => m.photo !== null);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % membersWithPhotos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, membersWithPhotos.length]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + membersWithPhotos.length) % membersWithPhotos.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % membersWithPhotos.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div 
        className="relative rounded-2xl overflow-hidden shadow-card bg-card"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Main Image Container */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          {membersWithPhotos.map((member, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentIndex 
                  ? "opacity-100 scale-100 z-10" 
                  : index === (currentIndex - 1 + membersWithPhotos.length) % membersWithPhotos.length
                    ? "opacity-0 scale-95 -translate-x-full z-0"
                    : "opacity-0 scale-95 translate-x-full z-0"
              }`}
            >
              <img
                src={member.photo!}
                alt={member.name}
                className="w-full h-full object-contain bg-gradient-to-b from-muted to-background"
              />
            </div>
          ))}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent z-20" />
          
          {/* Member Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-30">
            <div className="transform transition-all duration-500">
              <h4 className="font-heading font-bold text-xl md:text-2xl text-primary-foreground mb-2">
                {membersWithPhotos[currentIndex]?.name}
              </h4>
              <p className="text-primary font-medium text-sm md:text-base">
                {membersWithPhotos[currentIndex]?.title}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div className="bg-card p-4 border-t border-border">
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
            {membersWithPhotos.map((member, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === currentIndex 
                    ? "border-primary ring-2 ring-primary/30 scale-110" 
                    : "border-transparent opacity-60 hover:opacity-100 hover:border-muted-foreground/30"
                }`}
              >
                <img
                  src={member.photo!}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Progress Dots */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {membersWithPhotos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "w-8 bg-primary" 
                  : "w-1.5 bg-primary-foreground/40 hover:bg-primary-foreground/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Caption */}
      <p className="text-center text-muted-foreground mt-4 text-sm">
        Les photos de l'équipe de pilotage BIOENERGIES CONGO
      </p>
    </div>
  );
};

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

            {/* Team Carousel */}
            <TeamCarousel />

            {/* Individual Team Members */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
                { name: "TCHISSAMBOU BITELIKA née Rebecca NGOMA", title: "Manager Administratif et Financier", photo: managerAdministratif },
                { name: "Martin KIHOUNDA DITOMENE", title: "Manager Ressources Humaines", photo: managerRH },
                { name: "Ampère Claude NTONSI KOUBEYA", title: "Manager Exploitation", photo: managerExploitation },
                { name: "Nidel Steeve MOUANDZA MAKEMI", title: "Manager Opérations", photo: managerOperations },
                { name: "AMBARA née MOUASSA KITSOUKOU Kady Léna", title: "Manager Commercial & Marketing", photo: managerCommercial },
                { name: "Jean-Bernard MADZOU", title: "Manager Qualité-Hygiène Sécurité-Environnement & Énergétique", photo: managerQualite },
                { name: "MVIRI HONDJUILA François Fabrice", title: "Manager Services Informatiques", photo: managerInformatiques },
                { name: "Vincent SAMBA", title: "Manager Juridique et Contentieux", photo: managerJuridique },
                { name: "Aude Belvarine Farelle NDZOULOU MATONDO", title: "Manager Environnement & Assainissement", photo: managerEnvironnement },
                { name: "", title: "Responsable du Laboratoire", photo: null },
              ].map((member, index) => (
                <div
                  key={index}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card hover-lift"
                >
                  {/* Photo */}
                  <div className="relative h-48 bg-muted overflow-hidden">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-contain object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <Users className="w-16 h-16 text-muted-foreground/40" />
                      </div>
                    )}
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
