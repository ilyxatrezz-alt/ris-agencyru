import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBlock from "@/components/StatsBlock";
import ComparisonBlock from "@/components/ComparisonBlock";
import LiveDashboardDemo from "@/components/LiveDashboardDemo";
import ContactForm from "@/components/ContactForm";
import QuickContact from "@/components/QuickContact";
import PriceCalculator from "@/components/PriceCalculator";
import CasesSlider from "@/components/CasesSlider";
import ReviewsBlock from "@/components/ReviewsBlock";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import ScrollProgress from "@/components/ScrollProgress";
import MoneyCtaButton from "@/components/MoneyCtaButton";

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
        <Hero />
        <StatsBlock />
        <MoneyCtaButton />
        <CasesSlider />
        <QuickContact />
        <PriceCalculator />
        <ComparisonBlock />
        <LiveDashboardDemo />
        <ReviewsBlock />
        <MoneyCtaButton />
        <ContactForm />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;
