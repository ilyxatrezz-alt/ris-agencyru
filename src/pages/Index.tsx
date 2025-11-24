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

const Index = () => {
  return (
    <div className="min-h-screen">
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
