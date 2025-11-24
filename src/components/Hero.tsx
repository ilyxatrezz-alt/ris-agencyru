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
      
      <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">10+ лет успешной работы</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            G-TARGET: Реклама и Сайты,{" "}
            <span className="text-gradient-primary">которые приносят прибыль</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Запускаем контекстную (Яндекс) и таргетированную (ВК) рекламу, создаем конверсионные
            сайты с 2014 года. Гарантируем результат по всей России.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="cta" size="xl" asChild>
              <Link to="/contacts">Рассчитать бюджет и получить прогноз</Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/cases">Посмотреть кейсы</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12">
            <div className="flex flex-col items-center space-y-2 p-6 rounded-xl bg-card shadow-card">
              <TrendingUp className="h-8 w-8 text-accent" />
              <div className="text-3xl font-bold text-primary">500+ млн</div>
              <div className="text-sm text-muted-foreground">рекламных бюджетов освоено</div>
            </div>
            <div className="flex flex-col items-center space-y-2 p-6 rounded-xl bg-card shadow-card">
              <Users className="h-8 w-8 text-accent" />
              <div className="text-3xl font-bold text-primary">70%</div>
              <div className="text-sm text-muted-foreground">клиентов с нами более 3 лет</div>
            </div>
            <div className="flex flex-col items-center space-y-2 p-6 rounded-xl bg-card shadow-card">
              <Award className="h-8 w-8 text-accent" />
              <div className="text-3xl font-bold text-primary">-40%</div>
              <div className="text-sm text-muted-foreground">средний CPL ниже конкурентов</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
