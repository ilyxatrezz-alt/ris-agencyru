import { FileText, Search, Lightbulb, Rocket, Settings, FileCheck } from "lucide-react";

const ProcessBlock = () => {
  const steps = [
    {
      icon: FileText,
      title: "Брифинг",
      description: "Заявка и глубокое интервью по вашему бизнесу",
      number: "01",
    },
    {
      icon: Search,
      title: "Аудит",
      description: "Анализ конкурентов, рынка, текущих рекламных кампаний/сайта",
      number: "02",
    },
    {
      icon: Lightbulb,
      title: "Стратегия",
      description: "Разработка медиаплана и технического задания",
      number: "03",
    },
    {
      icon: Rocket,
      title: "Запуск",
      description: "Создание сайта и/или настройка рекламных кампаний",
      number: "04",
    },
    {
      icon: Settings,
      title: "Оптимизация",
      description: "Ежедневный контроль, A/B-тестирование, снижение стоимости лида",
      number: "05",
    },
    {
      icon: FileCheck,
      title: "Отчетность",
      description: "Прозрачные отчеты и еженедельная связь",
      number: "06",
    },
  ];

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Наш путь к <span className="text-gradient-primary">вашей прибыли</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            От заявки до стабильного потока клиентов — прозрачный процесс в 6 этапов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-base border border-border/50"
              >
                <div className="absolute -top-4 -right-4 text-8xl font-bold text-primary/5">
                  {step.number}
                </div>
                <div className="relative space-y-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-primary group-hover:scale-110 transition-base">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessBlock;
