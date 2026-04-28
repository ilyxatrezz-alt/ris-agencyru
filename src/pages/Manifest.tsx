import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Check, MessageSquare, Target, Users, Calendar, Sparkles, Trophy, Loader2, Scissors, Video, Megaphone } from "lucide-react";

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

const GOALS = [
  "Увеличить записи в барбершоп",
  "Загрузить мастеров",
  "Выстроить поток клиентов через Google + соцсети",
  "Усилить личный бренд Тима",
];

const FUNNEL = "Реклама → Видео Тима → Instagram / TikTok → Запись → Визит";

const ROLES: { name: string; note?: string; tasks: string[] }[] = [
  {
    name: "Илья",
    note: "основа процесса",
    tasks: [
      "Google Ads (поиск + локалка)",
      "Instagram / TikTok Ads",
      "Сбор аудиторий (вручную)",
      "Тестирование креативов",
      "Аналитика базовая",
    ],
  },
  {
    name: "Тим",
    note: "лицо бренда",
    tasks: [
      "Съёмка видео",
      "Лицо бренда",
      "Доверие",
      "Вовлечение",
    ],
  },
];

const VIDEOS: { num: number; title: string; angle: string; hint?: string }[] = [
  { num: 1, title: "«Почему 90% мужиков плохо стригутся»", angle: "провокация", hint: "Тим: «Тебя стригут не так, как тебе идёт…»" },
  { num: 2, title: "«3 ошибки в барбершопах»", angle: "экспертность", hint: "криво делают fade · не учитывают форму лица · делают «как у всех»" },
  { num: 3, title: "«Как понять, что тебя плохо постригли»", angle: "полезность" },
  { num: 4, title: "«До / после клиента»", angle: "визуальный результат" },
  { num: 5, title: "«Почему дешёвая стрижка = плохой результат»", angle: "боль + деньги" },
  { num: 6, title: "«Как выбрать барбера»", angle: "эксперт" },
  { num: 7, title: "«Твой стиль говорит о тебе»", angle: "психология + стиль" },
  { num: 8, title: "«История клиента»", angle: "доверие" },
  { num: 9, title: "«Что бесит барберов»", angle: "развлекательный" },
  { num: 10, title: "«Приходи — сделаем лучше»", angle: "прямой оффер" },
];

const BLOCKS: Block[] = [
  {
    id: "29-04",
    date: "29 АПРЕЛЯ",
    title: "Подготовка",
    icon: Calendar,
    groups: [
      { person: "Илья", tasks: [
        "Анализ конкурентов в Google (барбершопы рядом)",
        "Сбор ключевых слов (barber near me, haircut и т.д.)",
        "Подготовка структуры рекламы",
      ]},
      { person: "Тим", tasks: [
        "Подготовка к съёмке (образ, стиль, идеи)",
      ]},
    ],
  },
  {
    id: "30-04",
    date: "30 АПРЕЛЯ",
    title: "Сборка кампаний",
    icon: Calendar,
    groups: [
      { person: "Илья", tasks: [
        "Создание Google Ads аккаунта / кампаний",
        "Подготовка объявлений (10–15 вариантов)",
        "Подключение Google Maps",
      ]},
      { person: "Тим", tasks: ["Съёмка 2 видео"] },
    ],
  },
  {
    id: "01-05",
    date: "1 МАЯ",
    title: "GOOGLE — запуск",
    accent: "primary",
    icon: Target,
    groups: [
      { person: "Илья", tasks: [
        "Запуск Google Search Ads",
        "Запуск локальной рекламы (карты)",
        "Добавление расширений (номер, адрес)",
      ]},
      { person: "Тим", tasks: ["Публикация 1 видео"] },
    ],
  },
  {
    id: "02-05",
    date: "2 МАЯ",
    title: "Подготовка соцсетей",
    icon: Calendar,
    groups: [
      { person: "Илья", tasks: [
        "Сбор аудиторий Instagram вручную: подписчики конкурентов",
        "Сбор аудиторий: локальная аудитория",
        "Подготовка TikTok Ads",
      ]},
      { person: "Тим", tasks: ["Съёмка 2 видео"] },
    ],
  },
  {
    id: "03-05",
    date: "3 МАЯ",
    title: "SOCIAL — запуск",
    accent: "primary",
    icon: Megaphone,
    groups: [
      { person: "Илья", tasks: [
        "Запуск Instagram Ads",
        "Запуск TikTok Ads",
        "Загрузка первых видео",
      ]},
      { person: "Тим", tasks: ["Публикация 1 видео"] },
    ],
  },
  {
    id: "04-05",
    date: "4 МАЯ",
    title: "Первые правки",
    icon: Calendar,
    groups: [
      { person: "Илья", tasks: [
        "Анализ первых кликов",
        "Отключение слабых объявлений",
        "Добавление новых креативов",
      ]},
      { person: "Тим", tasks: ["Съёмка 1 видео"] },
    ],
  },
  {
    id: "05-05",
    date: "5 МАЯ",
    title: "Массовый тест",
    icon: Sparkles,
    groups: [
      { person: "Илья", tasks: [
        "Массовый запуск новых объявлений (дубли + тесты)",
        "Расширение аудиторий",
      ]},
      { person: "Тим", tasks: ["Публикация видео"] },
    ],
  },
  {
    id: "06-10-05",
    date: "6–10 МАЯ",
    title: "Усиление",
    accent: "neutral",
    icon: Sparkles,
    groups: [
      { person: "Илья", tasks: [
        "Масштабирование Google Ads",
        "Добавление новых ключей",
        "Запуск дополнительных групп объявлений",
        "Увеличение бюджета",
        "Тест 5 новых аудиторий Instagram",
        "Тест 3 новых креативов TikTok",
      ]},
      { person: "Тим", tasks: [
        "Съёмка 3 видео",
        "Публикация через день",
      ]},
    ],
  },
  {
    id: "10-15-05",
    date: "10–15 МАЯ",
    title: "Оптимизация",
    icon: Calendar,
    groups: [
      { person: "Илья", tasks: [
        "Оптимизация ставок",
        "Добавление минус-слов",
        "Создание look-alike аудиторий",
        "Ретаргетинг (посетители профиля)",
      ]},
      { person: "Тим", tasks: ["Съёмка 2 видео"] },
    ],
  },
  {
    id: "15-20-05",
    date: "15–20 МАЯ",
    title: "Масштабирование",
    accent: "primary",
    icon: Sparkles,
    groups: [
      { person: "Илья", tasks: [
        "Масштабирование успешных связок",
        "Увеличение бюджета",
        "Дублирование лучших объявлений",
      ]},
      { person: "Тим", tasks: [
        "Публикация видео",
        "Сторис с записью клиентов",
      ]},
    ],
  },
  {
    id: "20-27-05",
    date: "20–27 МАЯ",
    title: "Дожим",
    accent: "primary",
    icon: Trophy,
    groups: [
      { person: "Илья", tasks: [
        "Максимальный бюджет на лучшие кампании",
        "Отключение слабых",
        "Повторный запуск лучших видео",
        "Расширение гео",
      ]},
      { person: "Тим", tasks: [
        "Видео с призывом: «Записывайся сейчас»",
        "Видео с призывом: «Места заканчиваются»",
      ]},
    ],
  },
  {
    id: "tim-key",
    date: "Что важно для Тима",
    title: "Можно выделить",
    icon: Sparkles,
    accent: "neutral",
    groups: [
      { tasks: [
        "Реклама ведёт на его лицо",
        "Видео = доверие",
        "Частота = рост",
        "Google = горячие клиенты",
      ]},
    ],
  },
  {
    id: "visual",
    date: "Визуально для клиента",
    title: "Что увидит Тим",
    icon: Users,
    accent: "neutral",
    groups: [
      { person: "Илья", tasks: [
        "Постоянно что-то тестирует",
        "Запускает",
        "Масштабирует",
        "Собирает аудитории",
      ]},
      { person: "Тим", tasks: [
        "Становится лицом бренда",
        "Привлекает клиентов через видео",
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
        "Стабильный поток записей",
        "Узнаваемость барбершопа",
        "Рабочая рекламная система",
      ]},
    ],
  },
];

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-zа-я0-9]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 80);

const makeKey = (blockId: string, person: string | undefined, task: string) =>
  `${blockId}::${person || "_"}::${slug(task)}`;

const ALL_TASKS: { key: string }[] = [];
BLOCKS.forEach((b) =>
  b.groups.forEach((g) =>
    g.tasks.forEach((t) => ALL_TASKS.push({ key: makeKey(b.id, g.person, t) }))
  )
);
VIDEOS.forEach((v) => ALL_TASKS.push({ key: `video::${v.num}` }));

const accentClasses: Record<string, string> = {
  primary: "border-primary/30 bg-gradient-to-br from-primary/5 to-transparent",
  neutral: "border-border bg-card",
  ok: "border-emerald-300 bg-gradient-to-br from-emerald-50 to-transparent",
  warn: "border-amber-300 bg-gradient-to-br from-amber-50 to-transparent",
};

const personColors: Record<string, string> = {
  "Илья": "bg-primary/10 text-primary border-primary/30",
  "Тим": "bg-amber-100 text-amber-800 border-amber-300",
};

const TaskItem = ({
  label,
  state,
  onToggle,
  onComment,
}: {
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
              ? "bg-emerald-500 border-emerald-500"
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
          <p className={`text-[15px] leading-snug ${state.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
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

const Manifest = () => {
  const [tasksMap, setTasksMap] = useState<Record<string, TaskRow>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("project_manifest_tasks" as any)
        .select("task_key, completed, comment");
      const map: Record<string, TaskRow> = {};
      (data as any[] || []).forEach((r: any) => (map[r.task_key] = r));
      setTasksMap(map);
      setLoading(false);
    };
    load();

    const ch = supabase
      .channel("manifest-tasks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "project_manifest_tasks" },
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
    await (supabase.from("project_manifest_tasks" as any) as any)
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
        <title>The Manifest Barbershop — Roadmap</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 backdrop-blur-md bg-background/90 border-b border-border">
          <div className="container mx-auto px-4 md:px-8 py-4 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary font-bold">
                    The Manifest Barbershop
                  </div>
                  <h1 className="text-xl md:text-3xl font-black tracking-tight text-foreground">
                    Roadmap до 27 мая
                  </h1>
                </div>
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
          {/* Goals */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-lg md:text-2xl font-bold text-foreground">Цель</h2>
            </div>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {GOALS.map((g, i) => (
                <li key={i} className="flex items-start gap-2 text-base md:text-lg font-semibold text-foreground">
                  <span className="text-primary mt-1">▸</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Funnel */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-3xl border-2 border-border bg-card p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center">
                <Megaphone className="w-5 h-5" />
              </div>
              <h2 className="text-lg md:text-2xl font-bold text-foreground">Воронка</h2>
            </div>
            <p className="text-base md:text-xl font-semibold text-foreground leading-relaxed">
              {FUNNEL}
            </p>
          </motion.section>

          {/* Roles */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-lg md:text-2xl font-bold text-foreground">Роли</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {ROLES.map((r) => (
                <div key={r.name} className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2.5 py-0.5 rounded-md text-sm font-bold border ${personColors[r.name] || ""}`}>
                      {r.name}
                    </span>
                  </div>
                  {r.note && <p className="text-xs text-muted-foreground italic mb-3">{r.note}</p>}
                  <ul className="space-y-1.5 mt-2">
                    {r.tasks.map((t, i) => (
                      <li key={i} className="text-sm text-foreground flex gap-2 items-start">
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
              <h2 className="text-lg md:text-2xl font-bold text-foreground">Дневной план</h2>
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
                          <p className="text-sm text-muted-foreground mt-1 italic">👉 {b.subtitle}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {b.groups.map((g, gi) => (
                        <div key={gi} className="space-y-2">
                          {g.person && (
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${personColors[g.person] || "bg-muted"}`}>
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
                                  label={t}
                                  state={getState(key)}
                                  onToggle={() => upsert(key, { completed: !getState(key).completed })}
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

          {/* Videos */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <Video className="w-5 h-5 text-primary" />
              <h2 className="text-lg md:text-2xl font-bold text-foreground">
                Видео Тима — 10 сценариев
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {VIDEOS.map((v) => {
                const key = `video::${v.num}`;
                const st = getState(key);
                return (
                  <motion.div
                    key={v.num}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`rounded-2xl border-2 p-4 md:p-5 transition-all ${
                      st.completed ? "border-emerald-300 bg-emerald-50/50" : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => upsert(key, { completed: !st.completed })}
                        className={`shrink-0 w-9 h-9 rounded-lg border-2 flex items-center justify-center font-black text-sm transition-all ${
                          st.completed
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "bg-background border-foreground text-foreground hover:border-primary hover:text-primary"
                        }`}
                      >
                        {st.completed ? <Check className="w-4 h-4" strokeWidth={3} /> : v.num}
                      </button>
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-base font-bold leading-snug ${st.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                          {v.title}
                        </h4>
                        <div className="mt-1 inline-block px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/30">
                          👉 {v.angle}
                        </div>
                        {v.hint && (
                          <p className="text-sm text-muted-foreground mt-2 italic">{v.hint}</p>
                        )}
                        <div className="mt-3">
                          <TaskItemComment
                            value={st.comment}
                            onChange={(c) => upsert(key, { comment: c })}
                          />
                        </div>
                      </div>
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

const TaskItemComment = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const [show, setShow] = useState(!!value);
  const [draft, setDraft] = useState(value);
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDraft(value);
    if (value) setShow(true);
  }, [value]);

  const handle = (v: string) => {
    setDraft(v);
    if (ref.current) clearTimeout(ref.current);
    ref.current = setTimeout(() => onChange(v), 600);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        {value ? `Комментарий (${value.length} симв.)` : "Добавить комментарий"}
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <textarea
              value={draft}
              onChange={(e) => handle(e.target.value)}
              placeholder="Заметка по сценарию..."
              className="mt-2 w-full min-h-[60px] text-sm rounded-lg border border-border bg-background px-3 py-2 focus:outline-none focus:border-primary resize-y"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Manifest;
