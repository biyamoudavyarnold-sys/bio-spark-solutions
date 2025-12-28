import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
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
import managerLaboratoire from "@/assets/manager-laboratoire-white.jpg";
import conferenceOser1 from "@/assets/conference-oser-1.jpg";
import conferenceOser2 from "@/assets/conference-oser-2.jpg";
import conferenceOser3 from "@/assets/conference-oser-3.jpg";
import conferenceOser4 from "@/assets/conference-oser-4.jpg";
import conferenceOser5 from "@/assets/conference-oser-5.jpg";
import conferenceOser6 from "@/assets/conference-oser-6.jpg";
import conferenceOser7 from "@/assets/conference-oser-7.jpg";
import conferenceOser8 from "@/assets/conference-oser-8.jpg";
import conferenceOser9 from "@/assets/conference-oser-9.jpg";
import conferenceOser10 from "@/assets/conference-oser-10.jpg";

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

  // Conference OSER Carousel Component
  const ConferenceCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    const conferencePhotos = [
      { image: conferenceOser1, caption: "Équipe BIOENERGIES CONGO au stand OSER", rotate: false },
      { image: conferenceOser2, caption: "Présentation de nos solutions", rotate: false },
      { image: conferenceOser3, caption: "Networking avec les participants", rotate: false },
      { image: conferenceOser4, caption: "Entrée au Port Autonome", rotate: false },
      { image: conferenceOser5, caption: "L'équipe au tapis rouge", rotate: false },
      { image: conferenceOser6, caption: "Stand d'exposition BIOENERGIES CONGO", rotate: false },
      { image: conferenceOser7, caption: "Présentation du kakemono", rotate: false },
      { image: conferenceOser8, caption: "Notre équipe accueillante", rotate: false },
      { image: conferenceOser9, caption: "Membre de l'équipe au stand", rotate: false },
      { image: conferenceOser10, caption: "Toute l'équipe réunie", rotate: true },
    ];

    useEffect(() => {
      if (!isAutoPlaying) return;
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % conferencePhotos.length);
          setIsTransitioning(false);
        }, 300);
      }, 3500);
      return () => clearInterval(interval);
    }, [isAutoPlaying, conferencePhotos.length]);

    const goToPrev = () => {
      setIsAutoPlaying(false);
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + conferencePhotos.length) % conferencePhotos.length);
        setIsTransitioning(false);
      }, 300);
    };

    const goToNext = () => {
      setIsAutoPlaying(false);
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % conferencePhotos.length);
        setIsTransitioning(false);
      }, 300);
    };

    const goToSlide = (index: number) => {
      setIsAutoPlaying(false);
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 300);
    };

    return (
      <div className="max-w-5xl mx-auto relative">
        <div 
          className="relative rounded-3xl overflow-hidden shadow-2xl bg-card group/carousel"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Image Container with Ken Burns effect */}
          <div className="relative h-[350px] md:h-[500px] lg:h-[600px] overflow-hidden">
            {conferencePhotos.map((photo, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-out ${
                  index === currentIndex 
                    ? `opacity-100 ${isTransitioning ? 'scale-100 blur-sm' : 'scale-105 blur-0'}` 
                    : "opacity-0 scale-110 blur-md"
                }`}
                style={{
                  zIndex: index === currentIndex ? 10 : 0,
                  animation: index === currentIndex && !isTransitioning ? 'kenBurns 10s ease-out forwards' : 'none'
                }}
              >
                <img
                  src={photo.image}
                  alt={photo.caption}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    photo.rotate ? 'rotate-90 scale-150' : ''
                  }`}
                />
              </div>
            ))}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent z-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-transparent to-foreground/40 z-20" />
            
            {/* Caption with animation */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-30">
              <div className={`transform transition-all duration-500 ${isTransitioning ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/90 text-secondary-foreground text-sm font-medium mb-4 shadow-lg">
                  Photo {currentIndex + 1} / {conferencePhotos.length}
                </span>
                <h4 className="font-heading font-bold text-xl md:text-2xl lg:text-3xl text-primary-foreground mb-2">
                  {conferencePhotos[currentIndex]?.caption}
                </h4>
                <p className="text-primary-foreground/80 text-sm md:text-base">
                  Conférence OSER 2025 - Port Autonome de Pointe-Noire
                </p>
              </div>
            </div>

            {/* Navigation Arrows with glow effect */}
            <button
              onClick={goToPrev}
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-background/30 backdrop-blur-md border border-primary-foreground/30 flex items-center justify-center text-primary-foreground hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all duration-300 group shadow-xl"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 group-hover:scale-125 transition-transform" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-background/30 backdrop-blur-md border border-primary-foreground/30 flex items-center justify-center text-primary-foreground hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all duration-300 group shadow-xl"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 group-hover:scale-125 transition-transform" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-background/30 backdrop-blur-md border border-primary-foreground/30 flex items-center justify-center text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
              aria-label={isAutoPlaying ? "Pause" : "Play"}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary-foreground/20 z-30">
              <div 
                className="h-full bg-secondary transition-all duration-300"
                style={{ 
                  width: `${((currentIndex + 1) / conferencePhotos.length) * 100}%`,
                  transition: 'width 0.5s ease-out'
                }}
              />
            </div>
          </div>

          {/* Thumbnail Strip with scroll */}
          <div className="bg-gradient-to-r from-card via-muted to-card p-4 md:p-6 border-t border-border">
            <div className="flex items-center justify-start gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
              {conferencePhotos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative flex-shrink-0 w-14 h-10 md:w-20 md:h-14 rounded-lg overflow-hidden border-2 transition-all duration-500 ${
                    index === currentIndex 
                      ? "border-secondary ring-2 ring-secondary/50 scale-110 shadow-lg shadow-secondary/30" 
                      : "border-transparent opacity-50 hover:opacity-100 hover:border-muted-foreground/40 hover:scale-105"
                  }`}
                >
                  <img
                    src={photo.image}
                    alt={photo.caption}
                    className={`w-full h-full object-cover ${photo.rotate ? 'rotate-90 scale-150' : ''}`}
                  />
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent" />
                  )}
                </button>
              ))}
            </div>
            {/* Dot indicators for mobile */}
            <div className="flex items-center justify-center gap-1.5 mt-3 md:hidden">
              {conferencePhotos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? "w-6 bg-secondary" 
                      : "w-1.5 bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    );
  };

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
            <ConferenceCarousel />
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
