import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import caseDentistry from "@/assets/case-dentistry.jpg";
import caseConstruction from "@/assets/case-construction.jpg";
import caseRestaurant from "@/assets/case-restaurant.jpg";

const Cases = () => {
  const caseCategories = [
    {
      slug: "medicine-beauty",
      title: "Медицина & Beauty",
      description: "Кейсы для косметологов, стоматологов, урологов и пластических хирургов",
      image: caseDentistry,
      stats: { leads: "450+", cpl: "от 850₽", roi: "+180%" },
    },
    {
      slug: "construction",
      title: "Строительство & Коттеджи",
      description: "Успешные проекты по строительству домов и коттеджей",
      image: caseConstruction,
      stats: { leads: "280+", cpl: "от 1 200₽", roi: "+210%" },
    },
    {
      slug: "horeca",
      title: "Рестораны & Общепит",
      description: "Кейсы для ресторанов, кафе и служб доставки еды",
      image: caseRestaurant,
      stats: { leads: "1 500+", cpl: "от 95₽", roi: "+150%" },
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold">
                Наши <span className="text-gradient-primary">Кейсы</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Реальные результаты наших клиентов в разных нишах бизнеса
              </p>
            </div>
          </div>
        </section>

        {/* Cases Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseCategories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/cases/${category.slug}`}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-base border border-border/50">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-base"
                      />
                    </div>
                    <div className="p-6 space-y-4 bg-card">
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-base">
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>

                      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                        <div>
                          <div className="text-lg font-bold text-primary">{category.stats.leads}</div>
                          <div className="text-xs text-muted-foreground">Лиды</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-primary">{category.stats.cpl}</div>
                          <div className="text-xs text-muted-foreground">CPL</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-accent">{category.stats.roi}</div>
                          <div className="text-xs text-muted-foreground">ROI</div>
                        </div>
                      </div>

                      <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                        Смотреть кейсы <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="py-20 gradient-primary">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center text-white">
              <div className="space-y-2">
                <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                <div className="text-4xl font-bold">2 200+</div>
                <div className="text-sm opacity-90">Успешных кампаний</div>
              </div>
              <div className="space-y-2">
                <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                <div className="text-4xl font-bold">-40%</div>
                <div className="text-sm opacity-90">Средний CPL ниже рынка</div>
              </div>
              <div className="space-y-2">
                <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                <div className="text-4xl font-bold">+180%</div>
                <div className="text-sm opacity-90">Средний ROI клиентов</div>
              </div>
              <div className="space-y-2">
                <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                <div className="text-4xl font-bold">95%</div>
                <div className="text-sm opacity-90">Возвращаются к нам</div>
              </div>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Cases;
