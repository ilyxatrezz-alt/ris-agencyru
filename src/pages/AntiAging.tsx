import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Check, MessageSquare, Target, Users, Calendar, Sparkles, Trophy, Loader2 } from "lucide-react";

type TaskRow = { task_key: string; completed: boolean; comment: string };

type Block = {
  id: string;
  date?: string;
  title: string;
  subtitle?: string;
  icon?: any;
  accent?: "primary" | "neutral" | "ok" | "warn";
  groups: { person?: string; tasks: string[] }[];
};

const FUNNEL = "Реклама → Квиз → Прогрев → Переход в приложение → Покупка курса";

const ROLES: { name: string; note?: string; tasks: string[] }[] = [
  {
    name: "Илья",
    note: "основной объём",
    tasks: [
      "Квизы (создание, логика, интеграции)",
      "Вся реклама (технический запуск)",
      "Ретаргетинг",
      "UTM / события / передача данных",
    ],
  },
  {
    name: "Саша",
    note: "контроль и стратегия — НЕ перегружен, проверяет и корректирует",
    tasks: [
      "Проверка логики (после Ильи)",
      "Аналитика (Clarity)",
      "X (постинг)",
      "Инфлюенсеры",
    ],
  },
  {
    name: "Наташа",
    tasks: ["Приложение (основная точка)", "Лендинги", "Видео"],
  },
];

const BLOCKS: Block[] = [
  {
    id: "29-04",
    date: "29 АПРЕЛЯ",
    title: "Старт подготовки",
    icon: Calendar,
    groups: [
      { person: "Илья", tasks: [
        "Проверка всех событий (квиз → приложение)",
        "Настройка передачи данных",
        "Подготовка структуры квизов",
      ]},
      { person: "Саша", tasks: [
        "Финальная логика квиза (коротко)",
        "Проверка корректности пути пользователя",
      ]},
      { person: "Наташа", tasks: [
        "Подготовка приложения к трафику",
      ]},
    ],
  },
  {
    id: "30-04",
    date: "30 АПРЕЛЯ",
    title: "Сборка квиза",
    icon: Calendar,
    groups: [
      { person: "Илья", tasks: ["Сборка 1 квиза (основной)", "Подключение к приложению"] },
      { person: "Саша", tasks: ["Проверка квиза (логика + UX)"] },
      { person: "Наташа", tasks: ["Проверка перехода в приложение"] },
    ],
  },
  {
    id: "01-05",
    date: "1 МАЯ",
    title: "GOOGLE — запуск",
    accent: "primary",
    icon: Target,
    groups: [
      { person: "Илья", tasks: ["Запуск Google Search", "Performance Max", "YouTube Ads"] },
      { person: "Саша", tasks: ["X постинг (2–3 поста)", "Быстрая проверка запуска"] },
    ],
  },
  {
    id: "02-05",
    date: "2 МАЯ",
    title: "Подготовка Meta",
    icon: Calendar,
    groups: [
      { person: "Илья", tasks: ["Подготовка Meta Ads", "Доработка квиза"] },
      { person: "Саша", tasks: ["Проверка квиза после правок", "X постинг"] },
    ],
  },
  {
    id: "03-05",
    date: "3 МАЯ",
    title: "META — запуск",
    accent: "primary",
    icon: Target,
    groups: [
      { person: "Илья", tasks: ["Запуск Instagram Ads", "Запуск Facebook Ads"] },
      { person: "Саша", tasks: ["Проверка корректности лидов", "X постинг"] },
    ],
  },
  {
    id: "04-05",
    date: "4 МАЯ",
    title: "Подготовка Spotify",
    icon: Calendar,
    groups: [
      { person: "Илья", tasks: ["Подготовка Spotify Ads"] },
      { person: "Саша", tasks: ["X постинг", "Мини-анализ первых данных"] },
    ],
  },
  {
    id: "05-05",
    date: "5 МАЯ",
    title: "SPOTIFY — запуск",
    accent: "primary",
    icon: Target,
    groups: [
      { person: "Илья", tasks: ["Запуск Spotify Ads"] },
      { person: "Саша", tasks: ["Проверка поведения пользователей", "X постинг"] },
    ],
  },
  {
    id: "06-07-05",
    date: "6–7 МАЯ",
    title: "Квизы — основа воронки",
    subtitle: "Итого: 2–3 квиза (достаточно)",
    icon: Sparkles,
    accent: "neutral",
    groups: [
      { person: "Илья", tasks: ["Создание 2-го квиза", "A/B логика"] },
      { person: "Саша", tasks: ["Проверка логики"] },
    ],
  },
  {
    id: "08-05",
    date: "8 МАЯ",
    title: "Третий квиз",
    icon: Sparkles,
    groups: [
      { person: "Илья", tasks: ["Создание 3-го квиза"] },
      { person: "Саша", tasks: ["Проверка"] },
    ],
  },
  {
    id: "clarity",
    date: "6, 8, 10, 12, 14, 16, 18, 20, 22, 24 МАЯ",
    title: "Clarity (умеренно, без перегруза)",
    icon: Calendar,
    accent: "neutral",
    groups: [
      { person: "Саша", tasks: ["Просмотр записей (15–20 минут)", "1–2 вывода (не больше)"] },
      { person: "Илья", tasks: ["Внесение правок"] },
    ],
  },
  {
    id: "natasha-content",
    date: "6 → 26 МАЯ",
    title: "Наташа — контент по графику",
    icon: Users,
    accent: "neutral",
    groups: [
      { tasks: [
        "📅 6 МАЯ — Видео: «Что происходит после 45»",
        "📅 9 МАЯ — Видео: «3 ошибки»",
        "📅 12 МАЯ — Видео: «Почему стареете»",
        "📅 15 МАЯ — Видео: «Как выглядеть моложе»",
        "📅 18 МАЯ — Видео: «История»",
        "📅 21 МАЯ — Видео: «Личный опыт»",
        "📅 24 МАЯ — Видео: «Если ничего не делать»",
        "📅 26 МАЯ — Видео: «Приглашение»",
      ]},
    ],
  },
  {
    id: "stab",
    date: "6–15 МАЯ",
    title: "Стабилизация",
    icon: Calendar,
    groups: [
      { person: "Илья", tasks: ["Оптимизация рекламы", "Настройка ретаргетинга", "Доработка квизов"] },
      { person: "Саша", tasks: ["X ежедневно", "Проверка ключевых моментов (без перегруза)"] },
    ],
  },
  {
    id: "infl",
    date: "8–20 МАЯ",
    title: "Инфлюенсеры",
    icon: Users,
    groups: [
      { person: "Саша", tasks: ["Подбор", "Договорённости", "Контроль"] },
      { person: "Илья", tasks: ["Ссылки / UTM"] },
    ],
  },
  {
    id: "boost",
    date: "10–20 МАЯ",
    title: "Усиление",
    icon: Sparkles,
    groups: [
      { person: "Илья", tasks: ["Запуск ретаргетинга"] },
      { person: "Саша", tasks: ["Простая email цепочка"] },
    ],
  },
  {
    id: "x-daily",
    date: "5–27 МАЯ — каждый день",
    title: "X постинг (без усложнений)",
    icon: Calendar,
    accent: "neutral",
    groups: [
      { person: "Саша", tasks: ["2–3 поста в X"] },
    ],
  },
  {
    id: "final",
    date: "20–27 МАЯ",
    title: "Дожим",
    icon: Trophy,
    accent: "primary",
    groups: [
      { person: "Илья", tasks: ["Масштаб рекламы", "Увеличение бюджета"] },
      { person: "Саша", tasks: ["Добавление дефицита", "Контроль финальной воронки"] },
    ],
  },
  {
    id: "natasha-key",
    date: "Что важно для Наташи",
    title: "Можно выделить",
    icon: Sparkles,
    accent: "neutral",
    groups: [
      { tasks: [
        "Трафик ведётся сразу в приложение",
        "Квиз — фильтр и прогрев",
        "Видео = доверие",
        "Реклама = масштаб",
        "Аналитика = улучшение",
      ]},
    ],
  },
  {
    id: "result",
    date: "🚀 Результат к 27 МАЯ",
    title: "Финальные показатели",
    icon: Trophy,
    accent: "ok",
    groups: [
      { tasks: [
        "Стабильный поток пользователей в приложение",
        "Работающие квизы",
        "Понятная аналитика",
        "Масштабируемая реклама",
      ]},
    ],
  },
];

// Build flat list of unique task keys
const slug = (s: string) =>
  s.toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

function makeKey(blockId: string, person: string | undefined, task: string) {
  return `${blockId}::${person || "_"}::${slug(task)}`;
}

const ALL_TASKS: { key: string; block: string; person?: string; task: string }[] = [];
BLOCKS.forEach((b) =>
  b.groups.forEach((g) =>
    g.tasks.forEach((t) =>
      ALL_TASKS.push({ key: makeKey(b.id, g.person, t), block: b.id, person: g.person, task: t })
    )
  )
);

const accentClasses: Record<string, string> = {
  primary: "border-primary/30 bg-gradient-to-br from-primary/5 to-transparent",
  neutral: "border-border bg-card",
  ok: "border-emerald-300 bg-gradient-to-br from-emerald-50 to-transparent",
  warn: "border-amber-300 bg-gradient-to-br from-amber-50 to-transparent",
};

const personColors: Record<string, string> = {
  "Илья": "bg-primary/10 text-primary border-primary/30",
  "Саша": "bg-blue-100 text-blue-700 border-blue-300",
  "Наташа": "bg-purple-100 text-purple-700 border-purple-300",
};

const TaskItem = ({
  taskKey,
  label,
  state,
  onToggle,
  onComment,
}: {
  taskKey: string;
  label: string;
  state: TaskRow;
  onToggle: () => void;
  onComment: (v: string) => void;
}) => {
  const [showComment, setShowComment] = useState(!!state.comment);
  const [draft, setDraft] = useState(state.comment);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDraft(state.comment);
    if (state.comment) setShowComment(true);
  }, [state.comment]);

  const handleDraftChange = (v: string) => {
    setDraft(v);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onComment(v), 600);
  };

  return (
    <div className={`group rounded-xl border transition-all ${state.completed ? "bg-emerald-50/50 border-emerald-200" : "bg-background border-border hover:border-primary/40"}`}>
      <div className="flex items-start gap-3 p-3 md:p-4">
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={state.completed}
          className={`shrink-0 mt-0.5 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
            state.completed
              ? "bg-emerald-500 border-emerald-500 scale-100"
              : "bg-background border-muted-foreground/40 hover:border-primary hover:scale-110"
          }`}
        >
          <AnimatePresence>
            {state.completed && (
              <motion.span
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <div className="flex-1 min-w-0">
          <p
            className={`text-[15px] leading-snug ${
              state.completed ? "line-through text-muted-foreground" : "text-foreground"
            }`}
          >
            {label}
          </p>
          <button
            type="button"
            onClick={() => setShowComment((v) => !v)}
            className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            {state.comment ? `Комментарий (${state.comment.length} симв.)` : "Добавить комментарий"}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {showComment && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 md:px-4 pb-3 md:pb-4">
              <textarea
                value={draft}
                onChange={(e) => handleDraftChange(e.target.value)}
                placeholder="Заметка по задаче..."
                className="w-full min-h-[60px] text-sm rounded-lg border border-border bg-background px-3 py-2 focus:outline-none focus:border-primary resize-y"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AntiAging = () => {
  const [tasksMap, setTasksMap] = useState<Record<string, TaskRow>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("project_anti_aging_tasks")
        .select("task_key, completed, comment");
      const map: Record<string, TaskRow> = {};
      (data || []).forEach((r: any) => (map[r.task_key] = r));
      setTasksMap(map);
      setLoading(false);
    };
    load();

    const ch = supabase
      .channel("anti-aging-tasks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "project_anti_aging_tasks" },
        (payload: any) => {
          const row = payload.new as TaskRow;
          if (!row?.task_key) return;
          setTasksMap((prev) => ({ ...prev, [row.task_key]: row }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(ch);
    };
  }, []);

  const getState = (key: string): TaskRow =>
    tasksMap[key] || { task_key: key, completed: false, comment: "" };

  const upsert = async (key: string, patch: Partial<TaskRow>) => {
    const current = getState(key);
    const next: TaskRow = {
      task_key: key,
      completed: patch.completed ?? current.completed,
      comment: patch.comment ?? current.comment,
    };
    setTasksMap((prev) => ({ ...prev, [key]: next }));
    await supabase
      .from("project_anti_aging_tasks")
      .upsert(next, { onConflict: "task_key" });
  };

  const stats = useMemo(() => {
    const total = ALL_TASKS.length;
    const done = ALL_TASKS.filter((t) => tasksMap[t.key]?.completed).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    return { total, done, pct };
  }, [tasksMap]);

  return (
    <>
      <Helmet>
        <title>Project Anti-Aging — план кампании</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <div className="sticky top-0 z-30 backdrop-blur-md bg-background/90 border-b border-border">
          <div className="container mx-auto px-4 md:px-8 py-4 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary font-bold">
                  Project · Anti-Aging
                </div>
                <h1 className="text-xl md:text-3xl font-black tracking-tight text-foreground">
                  План кампании
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Прогресс</div>
                  <div className="text-sm md:text-base font-bold text-foreground">
                    {stats.done} / {stats.total}{" "}
                    <span className="text-primary">({stats.pct}%)</span>
                  </div>
                </div>
                <div className="w-24 md:w-40 h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-emerald-500"
                    initial={false}
                    animate={{ width: `${stats.pct}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                {loading && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 max-w-6xl space-y-8 md:space-y-10">
          {/* Funnel */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-lg md:text-2xl font-bold text-foreground">
                Воронка (ключевое)
              </h2>
            </div>
            <p className="text-base md:text-xl font-semibold text-foreground leading-relaxed">
              {FUNNEL}
            </p>
          </motion.section>

          {/* Roles */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-lg md:text-2xl font-bold text-foreground">Роли</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {ROLES.map((r) => (
                <div
                  key={r.name}
                  className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-sm font-bold border ${
                        personColors[r.name] || ""
                      }`}
                    >
                      {r.name}
                    </span>
                  </div>
                  {r.note && (
                    <p className="text-xs text-muted-foreground italic mb-3">{r.note}</p>
                  )}
                  <ul className="space-y-1.5 mt-2">
                    {r.tasks.map((t, i) => (
                      <li
                        key={i}
                        className="text-sm text-foreground flex gap-2 items-start"
                      >
                        <span className="text-primary mt-1">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Daily plan */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="text-lg md:text-2xl font-bold text-foreground">
                Дневной план
              </h2>
            </div>
            <div className="space-y-5 md:space-y-6">
              {BLOCKS.map((b, idx) => {
                const Icon = b.icon || Calendar;
                const cls = accentClasses[b.accent || "neutral"];
                return (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.35, delay: Math.min(idx, 5) * 0.03 }}
                    className={`rounded-2xl border-2 p-5 md:p-6 ${cls}`}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        {b.date && (
                          <div className="text-xs uppercase tracking-wider text-primary font-bold">
                            {b.date}
                          </div>
                        )}
                        <h3 className="text-base md:text-xl font-bold text-foreground mt-0.5">
                          {b.title}
                        </h3>
                        {b.subtitle && (
                          <p className="text-sm text-muted-foreground mt-1 italic">
                            👉 {b.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {b.groups.map((g, gi) => (
                        <div key={gi} className="space-y-2">
                          {g.person && (
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded-md text-xs font-bold border ${
                                  personColors[g.person] || "bg-muted"
                                }`}
                              >
                                {g.person}
                              </span>
                            </div>
                          )}
                          <div className="space-y-2">
                            {g.tasks.map((t) => {
                              const key = makeKey(b.id, g.person, t);
                              return (
                                <TaskItem
                                  key={key}
                                  taskKey={key}
                                  label={t}
                                  state={getState(key)}
                                  onToggle={() =>
                                    upsert(key, { completed: !getState(key).completed })
                                  }
                                  onComment={(v) => upsert(key, { comment: v })}
                                />
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <div className="text-center pt-6 pb-2">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              РИС · Внутренний план · Изменения сохраняются автоматически
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AntiAging;
