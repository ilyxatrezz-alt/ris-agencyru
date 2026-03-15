import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBlock from "@/components/StatsBlock";
import ComparisonBlock from "@/components/ComparisonBlock";
import ProcessBlock from "@/components/ProcessBlock";
import ContactForm from "@/components/ContactForm";
import QuickContact from "@/components/QuickContact";
import PriceCalculator from "@/components/PriceCalculator";
import CasesSlider from "@/components/CasesSlider";
import ReviewsBlock from "@/components/ReviewsBlock";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

import ScrollProgress from "@/components/ScrollProgress";
import FloatingElements from "@/components/FloatingElements";
import MouseSpotlight from "@/components/MouseSpotlight";
import RippleEffect from "@/components/RippleEffect";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      
      <ScrollProgress />
      <FloatingElements />
      <MouseSpotlight />
      <RippleEffect />
      <Header />
      <main>
        <Hero />
        <StatsBlock />
        <QuickContact />
        <CasesSlider />
        <PriceCalculator />
        <ComparisonBlock />
        <ProcessBlock />
        <ReviewsBlock />
        <QuickContact />
        <ContactForm />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;
