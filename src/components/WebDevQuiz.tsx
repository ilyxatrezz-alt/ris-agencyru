import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, Globe, ShoppingCart, ArrowRight, ArrowLeft, 
  MessageSquare, Zap, Clock, Users, Sparkles, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuizOption {
  id: string;
  label: string;
  icon: React.ElementType;
  emoji: string;
}

interface QuizStep {
  question: string;
  subtitle: string;
  options: QuizOption[];
}

const quizSteps: QuizStep[] = [
  {
    question: "Какой сайт вам нужен?",
    subtitle: "Выберите тип проекта",
    options: [
      { id: "landing", label: "Лендинг", icon: Rocket, emoji: "🚀" },
      { id: "corporate", label: "Корпоративный сайт", icon: Globe, emoji: "🏢" },
      { id: "shop", label: "Интернет-магазин", icon: ShoppingCart, emoji: "🛒" },
    ],
  },
  {
    question: "Когда нужен результат?",
    subtitle: "Мы подстроимся под ваши сроки",
    options: [
      { id: "urgent", label: "Срочно, на этой неделе", icon: Zap, emoji: "⚡" },
      { id: "normal", label: "В течение 2 недель", icon: Clock, emoji: "📅" },
      { id: "flexible", label: "Не горит, важно качество", icon: Sparkles, emoji: "✨" },
    ],
  },
  {
    question: "Что для вас важнее всего?",
    subtitle: "Расставим приоритеты правильно",
    options: [
      { id: "design", label: "Уникальный дизайн", icon: Sparkles, emoji: "🎨" },
      { id: "conversion", label: "Максимум заявок", icon: Users, emoji: "📈" },
      { id: "speed", label: "Скорость и SEO", icon: Zap, emoji: "🔍" },
    ],
  },
];

const resultLabels: Record<string, string> = {
  landing: "Лендинг",
  corporate: "Корпоративный сайт",
  shop: "Интернет-магазин",
  urgent: "Срочно",
  normal: "2 недели",
  flexible: "Без спешки",
  design: "Уникальный дизайн",
  conversion: "Максимум заявок",
  speed: "Скорость и SEO",
};

const WebDevQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (optionId: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = optionId;
    setAnswers(newAnswers);

    if (currentStep < quizSteps.length - 1) {
      setTimeout(() => setCurrentStep((s) => s + 1), 300);
    } else {
      setTimeout(() => setIsFinished(true), 300);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsFinished(false);
  };

  const getTelegramMessage = () => {
    const lines = answers.map((a, i) => `${quizSteps[i].question} ${resultLabels[a]}`);
    return encodeURIComponent(`Здравствуйте! Подобрал себе сайт:\n\n${lines.join("\n")}\n\nХочу обсудить детали!`);
  };

  const progress = isFinished ? 100 : ((currentStep + (answers[currentStep] ? 1 : 0)) / quizSteps.length) * 100;

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Подберите сайт за 30 секунд
            </span>
            <h2 className="text-2xl md:text-4xl font-black mt-3">
              Какой сайт{" "}
              <span className="text-gradient-primary">подходит вам?</span>
            </h2>
          </motion.div>

          {/* Progress bar */}
          <div className="relative h-1.5 bg-secondary rounded-full mb-8 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-primary rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          {/* Quiz Card */}
          <Card className="border-border/50 overflow-hidden">
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {!isFinished ? (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Step indicator */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        {currentStep + 1} / {quizSteps.length}
                      </span>
                      {currentStep > 0 && (
                        <button
                          onClick={goBack}
                          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                        >
                          <ArrowLeft className="w-3 h-3" />
                          Назад
                        </button>
                      )}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mb-1">
                      {quizSteps[currentStep].question}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      {quizSteps[currentStep].subtitle}
                    </p>

                    <div className="grid gap-3">
                      {quizSteps[currentStep].options.map((option) => {
                        const Icon = option.icon;
                        const isSelected = answers[currentStep] === option.id;
                        return (
                          <motion.button
                            key={option.id}
                            onClick={() => handleSelect(option.id)}
                            className={cn(
                              "relative w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200",
                              isSelected
                                ? "border-primary bg-primary/5 shadow-md"
                                : "border-border/50 hover:border-primary/40 hover:bg-secondary/50"
                            )}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className={cn(
                              "flex items-center justify-center w-12 h-12 rounded-xl text-2xl transition-colors",
                              isSelected ? "bg-primary/10" : "bg-secondary"
                            )}>
                              {option.emoji}
                            </div>
                            <span className="font-semibold text-base">{option.label}</span>
                            {isSelected && (
                              <motion.div
                                className="absolute right-4"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                              >
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                              </motion.div>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center space-y-6"
                  >
                    <motion.div
                      className="text-5xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      🎉
                    </motion.div>

                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">
                        Отлично! Вот ваш запрос:
                      </h3>
                      <div className="flex flex-wrap gap-2 justify-center mt-4">
                        {answers.map((a, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full"
                          >
                            {resultLabels[a]}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-muted-foreground">
                      Напишите нам — подготовим персональное предложение за 30 минут
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                      <Button
                        size="lg"
                        className="gradient-primary shadow-cta hover:shadow-glow text-base px-6 group"
                        asChild
                      >
                        <a
                          href={`https://t.me/manager_ris?text=${getTelegramMessage()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageSquare className="mr-2 w-5 h-5" />
                          Написать в Telegram
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                      <Button
                        size="lg"
                        variant="ghost"
                        className="text-muted-foreground"
                        onClick={reset}
                      >
                        Пройти заново
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WebDevQuiz;
