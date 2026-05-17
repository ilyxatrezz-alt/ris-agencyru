import { FileText, Search, Lightbulb, Rocket, Settings, FileCheck, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";
import { useProcessSteps } from "@/hooks/useProcessSteps";

const defaultIcons = [FileText, Search, Lightbulb, Rocket, Settings, FileCheck];

const ProcessBlock = () => {
  const { settings } = useSiteSettingsMap();
  const { data: stepsData } = useProcessSteps();
  const sectionRef = useRef<HTMLDivElement>(null);

  const badge = getSetting(settings, "home_process_badge", "Как мы работаем");
  const titlePrefix = getSetting(settings, "home_process_title_prefix", "От заявки до");
  const titleHighlight = getSetting(settings, "home_process_title_highlight", "стабильного потока клиентов");
  const subtitle = getSetting(
    settings,
    "home_process_subtitle",
    "Прозрачный процесс в 6 этапов. Вы всегда знаете, что происходит с вашим проектом."
  );

  const steps = stepsData?.map((step, index) => ({
    icon: defaultIcons[index % defaultIcons.length],
    title: step.title,
    description: step.description,
    number: step.step_number,
  })) || [];

  return (
    <section ref={sectionRef} className="py-24 bg-foreground text-background relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Editorial header */}
        <div className="grid grid-cols-12 gap-4 mb-16">
          <div className="col-span-12 md:col-span-3">
            <span className="editorial-eyebrow text-background/60">§ 03 — Процесс</span>
            <div className="editorial-rule mt-4 bg-background" />
            <p className="text-sm text-background/50 mt-6 leading-relaxed max-w-[16rem]">
              {subtitle}
            </p>
          </div>
          <motion.div
            className="col-span-12 md:col-span-9"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.035em] leading-[0.95] uppercase">
              {titlePrefix} <span className="font-display-italic font-normal normal-case text-primary">{titleHighlight}</span>
            </h2>
          </motion.div>
        </div>

        {/* Sticky number + scrolling steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-4 md:gap-8 mb-12 last:mb-0"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                {/* Step number - sticky */}
                <div className="sticky top-28 self-start">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                    <span className="text-xl md:text-2xl font-black text-white">{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent mx-auto mt-3" />
                  )}
                </div>

                {/* Step content */}
                <div className="pb-8 border-b border-white/10 last:border-0">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="text-xl md:text-2xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-background/60 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessBlock;
