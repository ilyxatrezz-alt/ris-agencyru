import { useLocation, Navigate } from "react-router-dom";
import { getCityBySlug } from "@/config/cities";
import { CityProvider } from "@/contexts/CityContext";
import CityHeader from "@/components/CityHeader";
import CityHero from "@/components/CityHero";
import StatsBlock from "@/components/StatsBlock";
import ComparisonBlock from "@/components/ComparisonBlock";
import LiveDashboardDemo from "@/components/LiveDashboardDemo";
import ContactForm from "@/components/ContactForm";
import QuickContact from "@/components/QuickContact";
import PriceCalculator from "@/components/PriceCalculator";
import CasesSlider from "@/components/CasesSlider";
import CityReviews from "@/components/CityReviews";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const CityIndex = () => {
  const location = useLocation();
  const citySlug = location.pathname.replace("/", "");
  const city = citySlug ? getCityBySlug(citySlug) : null;

  // If city not found, redirect to 404
  if (citySlug && !city) {
    return <Navigate to="/404" replace />;
  }

  return (
    <CityProvider city={city}>
      {city && (
        <Helmet>
          <title>{city.heroTitle} | РИС — Реклама и Сайты</title>
          <meta name="description" content={city.metaDescription} />
          <meta name="keywords" content={city.localKeywords.join(", ")} />
          <link rel="canonical" href={`https://ris-agency.ru/${city.slug}`} />
          
          {/* Open Graph */}
          <meta property="og:title" content={`${city.heroTitle} | РИС`} />
          <meta property="og:description" content={city.metaDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="ru_RU" />
          
          {/* Geo Tags */}
          <meta name="geo.region" content="RU" />
          <meta name="geo.placename" content={city.name} />
        </Helmet>
      )}
      
      <div className="min-h-screen">
        <CityHeader />
        <main>
          <CityHero />
          <QuickContact />
          <StatsBlock />
          <QuickContact />
          <CasesSlider />
          <PriceCalculator />
          <ComparisonBlock />
          <QuickContact />
          <LiveDashboardDemo />
          <CityReviews />
          <QuickContact />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </CityProvider>
  );
};

export default CityIndex;
