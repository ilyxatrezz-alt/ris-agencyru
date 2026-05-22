import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, TrendingUp, Activity } from "lucide-react";
import { Link } from "react-router-dom";

type Lead = {
  id: number;
  name: string;
  source: string;
  cost: number;
  status: "new" | "called" | "qualified" | "won";
  time: string;
};

const SOURCES = ["Яндекс.Директ", "VK Реклама", "Telegram Ads", "SEO"];
const NAMES = ["Алексей К.", "Мария В.", "Сергей П.", "Анна Д.", "Игорь Л.", "Ольга М.", "Дмитрий Р.", "Наталья С."];
const STATUS_META: Record<Lead["status"], { label: string; cls: string }> = {
  new: { label: "новый", cls: "bg-primary/10 text-primary" },
  called: { label: "в работе", cls: "bg-amber-500/10 text-amber-600" },
  qualified: { label: "квалифицирован", cls: "bg-blue-500/10 text-blue-600" },
  won: { label: "оплата", cls: "bg-emerald-500/10 text-emerald-600" },
};

const initialLeads: Lead[] = [
  { id: 1, name: "Мария В.", source: "Яндекс.Директ", cost: 412, status: "won", time: "11:42" },
  { id: 2, name: "Сергей П.", source: "VK Реклама", cost: 287, status: "qualified", time: "11:38" },
  { id: 3, name: "Алексей К.", source: "Telegram Ads", cost: 534, status: "called", time: "11:21" },
  { id: 4, name: "Ольга М.", source: "Яндекс.Директ", cost: 391, status: "new", time: "11:14" },
];

const rand = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const LiveDashboardDemo = () => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [counter, setCounter] = useState({ today: 23, cpl: 387, cr: 14.2, spent: 18420 });
  const [pulseId, setPulseId] = useState<number | null>(null);

  // Simulate live lead stream
  useEffect(() => {
    const interval = setInterval(() => {
      const newLead: Lead = {
        id: Date.now(),
        name: rand(NAMES),
        source: rand(SOURCES),
        cost: 250 + Math.floor(Math.random() * 350),
        status: "new",
        time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      };
      setLeads((prev) => [newLead, ...prev].slice(0, 5));
      setPulseId(newLead.id);
      setCounter((c) => ({
        today: c.today + 1,
        cpl: Math.round((c.cpl * c.today + newLead.cost) / (c.today + 1)),
        cr: +(c.cr + (Math.random() - 0.5) * 0.4).toFixed(1),
        spent: c.spent + newLead.cost,
      }));
      setTimeout(() => setPulseId(null), 1200);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const sparkData = [12, 18, 14, 22, 19, 28, 31, 26, 34, 38, 33, 42];
  const sparkMax = Math.max(...sparkData);

  return (
    <section className="relative bg-background overflow-hidden border-t border-foreground/10">
      {/* Editorial header */}
      <div className="container mx-auto px-4 pt-20 md:pt-28 pb-10 md:pb-16">
        <div className="grid grid-cols-12 gap-4 items-end">
          <div className="col-span-12 md:col-span-3">
            <span className="editorial-eyebrow text-foreground/50">§ 03 — Прозрачность</span>
            <div className="h-px bg-foreground/15 mt-4" />
          </div>
          <motion.div
            className="col-span-12 md:col-span-9"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.035em] leading-[0.95] uppercase">
              Видите каждый лид <span className="font-display-italic font-normal normal-case text-primary">в реальном</span> времени
            </h2>
            <p className="mt-6 text-base md:text-lg text-foreground/60 max-w-2xl">
              Личный кабинет, которого нет у фрилансеров и 90% агентств. Заявки, стоимость, источники и статус — без отчётов в Word раз в месяц.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Dashboard mock */}
      <div className="container mx-auto px-4 pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[24px] md:rounded-[32px] bg-foreground text-background p-4 sm:p-6 md:p-8 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.5)] border border-foreground/20 overflow-hidden"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between gap-4 mb-6 md:mb-8 pb-4 border-b border-background/10">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-background/20" />
                <span className="h-3 w-3 rounded-full bg-background/20" />
                <span className="h-3 w-3 rounded-full bg-background/20" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-background/40 hidden sm:inline">
                ris-agency.ru / кабинет клиента
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Live
            </div>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
            {[
              { label: "Заявок сегодня", value: counter.today, suffix: "", accent: true },
              { label: "Средний CPL", value: counter.cpl, suffix: " ₽" },
              { label: "Конверсия", value: counter.cr, suffix: "%" },
              { label: "Бюджет, ₽", value: counter.spent.toLocaleString("ru-RU"), suffix: "" },
            ].map((kpi, i) => (
              <div
                key={i}
                className={`rounded-2xl p-4 md:p-5 ${
                  kpi.accent ? "bg-primary text-background" : "bg-background/[0.04] border border-background/10"
                }`}
              >
                <div className={`text-[10px] uppercase tracking-[0.18em] mb-2 ${kpi.accent ? "text-background/70" : "text-background/40"}`}>
                  {kpi.label}
                </div>
                <div className="text-2xl md:text-4xl font-black tracking-tight tabular-nums leading-none">
                  {kpi.value}
                  <span className={`${kpi.accent ? "text-background/80" : "text-background/50"} text-base md:text-2xl font-bold`}>
                    {kpi.suffix}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Body: leads feed + sparkline */}
          <div className="grid grid-cols-12 gap-4">
            {/* Leads feed */}
            <div className="col-span-12 lg:col-span-8 rounded-2xl bg-background/[0.04] border border-background/10 p-4 md:p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <Activity className="h-4 w-4 text-primary" />
                  Поток заявок
                </div>
                <span className="text-[10px] uppercase tracking-widest text-background/40">обновляется онлайн</span>
              </div>

              <div className="space-y-1.5">
                <AnimatePresence initial={false}>
                  {leads.map((lead) => (
                    <motion.div
                      key={lead.id}
                      layout
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex items-center gap-2 sm:gap-3 rounded-xl px-2 sm:px-3 py-2 sm:py-2.5 min-w-0 ${
                        pulseId === lead.id ? "bg-primary/15 ring-1 ring-primary/40" : "hover:bg-background/[0.04]"
                      } transition-colors`}
                    >
                      <div className="text-[10px] tabular-nums text-background/40 w-9 sm:w-10 shrink-0">{lead.time}</div>
                      <div className="font-semibold text-xs sm:text-sm flex-1 min-w-0 truncate">{lead.name}</div>
                      <div className="text-xs text-background/50 hidden md:block flex-1 truncate">{lead.source}</div>
                      <div className="text-[11px] sm:text-xs tabular-nums text-background/70 w-12 sm:w-16 shrink-0 text-right">
                        {lead.cost} ₽
                      </div>
                      <span
                        className={`text-[9px] sm:text-[10px] uppercase tracking-wider font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shrink-0 ${STATUS_META[lead.status].cls}`}
                      >
                        {STATUS_META[lead.status].label}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Sparkline + sources */}
            <div className="col-span-12 lg:col-span-4 space-y-4">
              <div className="rounded-2xl bg-background/[0.04] border border-background/10 p-4 md:p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold">Заявки / неделя</span>
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                    <TrendingUp className="h-3 w-3" /> +38%
                  </span>
                </div>
                <div className="flex items-end gap-1 h-20">
                  {sparkData.map((v, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${(v / sparkMax) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.04 }}
                      className={`flex-1 rounded-t ${i === sparkData.length - 1 ? "bg-primary" : "bg-background/20"}`}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-background/[0.04] border border-background/10 p-4 md:p-5">
                <div className="text-xs font-bold mb-3">Источники</div>
                <div className="space-y-2.5">
                  {[
                    { label: "Яндекс.Директ", pct: 48 },
                    { label: "VK Реклама", pct: 27 },
                    { label: "Telegram Ads", pct: 18 },
                    { label: "SEO", pct: 7 },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-background/70">{s.label}</span>
                        <span className="tabular-nums font-bold">{s.pct}%</span>
                      </div>
                      <div className="h-1 bg-background/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-10 md:mt-14 pt-8 border-t border-foreground/10"
        >
          <span className="font-display-italic text-2xl md:text-4xl text-foreground/40 max-w-xl">
            Такой кабинет — каждому клиенту, бесплатно с первого дня.
          </span>
          <Link
            to="/contacts"
            className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] group text-foreground self-end sm:self-auto"
          >
            <span>Получить доступ</span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-background group-hover:scale-110 transition-transform">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveDashboardDemo;
