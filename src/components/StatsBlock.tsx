import { Target, TrendingUp, Users, Award, Calendar, ShieldCheck } from "lucide-react";

const StatsBlock = () => {
  const stats = [
    {
      icon: Calendar,
      value: "10+",
      label: "лет на рынке",
    },
    {
      icon: TrendingUp,
      value: "500 млн+",
      label: "₽ рекламных бюджетов освоено",
    },
    {
      icon: ShieldCheck,
      value: "40%",
      label: "средний CPL ниже, чем у конкурентов",
    },
    {
      icon: Users,
      value: "70%",
      label: "клиентов остаются с нами более 3 лет",
    },
    {
      icon: Award,
      value: "100+",
      label: "успешных проектов",
    },
    {
      icon: Target,
      value: "2014",
      label: "год основания",
    },
  ];

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Мы знаем, <span className="text-gradient-primary">как работает ваш рынок</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Наша специализация – это не только настройка, но и глубокое погружение в вашу бизнес-нишу
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-base border border-border/50"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-primary">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsBlock;
