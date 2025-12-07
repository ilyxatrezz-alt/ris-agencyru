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
import CursorFollower from "@/components/CursorFollower";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingElements from "@/components/FloatingElements";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <CursorFollower />
      <ScrollProgress />
      <FloatingElements />
      <Header />
      <main>
        <Hero />
        <QuickContact />
        <StatsBlock />
        <QuickContact />
        <CasesSlider />
        <PriceCalculator />
        <ComparisonBlock />
        <QuickContact />
        <ProcessBlock />
        <ReviewsBlock />
        <QuickContact />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
