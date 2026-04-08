import { Helmet } from "react-helmet-async";
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

const Index = () => {
  return (
    <div className="min-h-screen relative pb-16 md:pb-0">
      <Helmet>
        <title>РИС — Реклама и Сайты в Донецке | Создание сайтов, контекстная и таргетированная реклама</title>
        <meta name="description" content="Агентство РИС в Донецке — создание сайтов, контекстная реклама Яндекс.Директ, таргетированная реклама ВКонтакте, SMM. Директолог и таргетолог в Донецке. 200+ проектов, 10+ лет опыта." />
        <meta name="keywords" content="реклама Донецк, создание сайтов Донецк, таргетолог Донецк, директолог Донецк, реклама ДНР, создание рекламы Донецк, сайт под ключ Донецк, SMM Донецк" />
      </Helmet>
      <ScrollProgress />
      <Header />
      <main>
        {/* Hero is sticky — content scrolls over it */}
        <div className="relative">
          <div className="sticky top-0 z-0">
            <Hero />
          </div>
          {/* This div scrolls over the hero */}
          <div className="relative z-10 bg-background rounded-t-[2.5rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.15)] -mt-8">
            <StatsBlock />
            <QuickContact />
            <CasesSlider />
            <PriceCalculator />
            <ComparisonBlock />
            <ProcessBlock />
            <ReviewsBlock />
            <QuickContact />
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;
