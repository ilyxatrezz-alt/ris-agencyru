import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Award, Users } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Digital marketing analytics"
          className="w-full h-full object-cover opacity-5"
        />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-12 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/20">
            <Award className="h-3 w-3 md:h-4 md:w-4 text-primary" />
            <span className="text-xs md:text-sm font-medium text-primary">10+ лет успешной работы</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight px-2">
            G-TARGET: Реклама и Сайты,{" "}
            <span className="text-gradient-primary">которые приносят прибыль</span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Запускаем контекстную (Яндекс) и таргетированную (ВК) рекламу, создаем конверсионные
            сайты с 2014 года. Гарантируем результат по всей России.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-4 px-4">
            <Button variant="cta" size="lg" className="w-full sm:w-auto text-sm md:text-base" asChild>
              <Link to="/contacts">Получить прогноз</Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm md:text-base" asChild>
              <Link to="/cases">Посмотреть кейсы</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 pt-8 md:pt-12 px-4">
            <div className="flex flex-col items-center space-y-2 p-4 md:p-6 rounded-xl bg-card shadow-card">
              <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-accent" />
              <div className="text-2xl md:text-3xl font-bold text-primary">500+ млн</div>
              <div className="text-xs md:text-sm text-muted-foreground text-center">рекламных бюджетов освоено</div>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 md:p-6 rounded-xl bg-card shadow-card">
              <Users className="h-6 w-6 md:h-8 md:w-8 text-accent" />
              <div className="text-2xl md:text-3xl font-bold text-primary">70%</div>
              <div className="text-xs md:text-sm text-muted-foreground text-center">клиентов с нами более 3 лет</div>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 md:p-6 rounded-xl bg-card shadow-card">
              <Award className="h-6 w-6 md:h-8 md:w-8 text-accent" />
              <div className="text-2xl md:text-3xl font-bold text-primary">-40%</div>
              <div className="text-xs md:text-sm text-muted-foreground text-center">средний CPL ниже конкурентов</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
