import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FounderMessage from "@/components/FounderMessage";
import Presentation from "@/components/Presentation";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Activities from "@/components/Activities";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>BIOENERGIES CONGO | Pionnier des Énergies Renouvelables en Afrique</title>
        <meta
          name="description"
          content="BIOENERGIES CONGO - Première entreprise de méthanisation, crédit carbone et énergies renouvelables au Congo-Brazzaville. All To Save Area / Tout Pour Sauver l'Environnement."
        />
        <meta
          name="keywords"
          content="bioenergies, congo, énergies renouvelables, biogaz, crédit carbone, méthanisation, environnement, Pointe-Noire, Afrique"
        />
        <link rel="canonical" href="https://bioenergies-congo.com" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <FounderMessage />
          <Presentation />
          <Services />
          <Products />
          <Activities />
          <Partners />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
