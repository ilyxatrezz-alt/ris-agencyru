import { Check, X, Users, TrendingUp, BarChart } from "lucide-react";

const ComparisonBlock = () => {
  const comparisons = [
    {
      title: "Команда",
      agency: "Аналитик, таргетолог, контекстолог, дизайнер. Всегда на связи",
      freelancer: "Один человек: Болезнь, отпуск, пропал, нет запасных компетенций",
      icon: Users,
    },
    {
      title: "Результат",
      agency: "Прогнозируемый: Четкое ТЗ, сроки, договор",
      freelancer: "Непредсказуемый: 'Как получится', срыв сроков",
      icon: TrendingUp,
    },
    {
      title: "Аналитика",
      agency: "Системная: End-to-end (от клика до продажи)",
      freelancer: "Базовая: Только статистика из рекламного кабинета",
      icon: BarChart,
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Выберите <span className="text-gradient-accent">стабильность</span>, а не риск
          </h2>
          <p className="text-lg text-muted-foreground">
            Почему агентство G-TARGET надежнее фрилансера
          </p>
        </div>

        <div className="space-y-8">
          {comparisons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="grid md:grid-cols-2 gap-4 p-6 rounded-2xl bg-card shadow-card"
              >
                <div className="flex items-start space-x-4 p-6 rounded-xl bg-primary/5 border-2 border-primary/20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-primary flex-shrink-0">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <h3 className="font-bold text-primary">G-TARGET (Агентство)</h3>
                    </div>
                    <p className="text-sm text-foreground">{item.agency}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 rounded-xl bg-destructive/5 border-2 border-destructive/20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive flex-shrink-0">
                    <X className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon className="h-5 w-5 text-destructive" />
                      <h3 className="font-bold text-destructive">Фрилансер (Риски)</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.freelancer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ComparisonBlock;
