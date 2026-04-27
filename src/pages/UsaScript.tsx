import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  HelpCircle,
  Target,
  ShieldQuestion,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Quote,
} from "lucide-react";

const Section = ({
  number,
  title,
  icon: Icon,
  accent = "primary",
  children,
}: {
  number: string;
  title: string;
  icon: any;
  accent?: "primary" | "neutral" | "warn" | "ok";
  children: React.ReactNode;
}) => {
  const accentMap: Record<string, string> = {
    primary: "from-primary/10 to-primary/0 border-primary/30 text-primary",
    neutral: "from-muted to-transparent border-border text-foreground",
    warn: "from-amber-100 to-transparent border-amber-300 text-amber-700",
    ok: "from-emerald-100 to-transparent border-emerald-300 text-emerald-700",
  };
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div
        className={`rounded-3xl border bg-gradient-to-br ${accentMap[accent]} p-6 md:p-10 bg-card shadow-sm`}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary text-primary-foreground font-bold text-lg md:text-xl shadow-lg">
            {number}
          </div>
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            <h2 className="text-xl md:text-3xl font-bold text-foreground tracking-tight">
              {title}
            </h2>
          </div>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </motion.section>
  );
};

const Dialog = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-3 md:gap-4 items-start bg-background/80 backdrop-blur-sm rounded-2xl p-4 md:p-5 border border-border">
    <div className="shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-md">
      К
    </div>
    <div className="flex-1">
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
        Ксения
      </div>
      <p className="text-foreground leading-relaxed text-[15px] md:text-base">
        {children}
      </p>
    </div>
  </div>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-3 items-start bg-background/60 rounded-xl p-3 md:p-4 border border-border/60">
    <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
    <p className="text-foreground leading-relaxed text-[15px] md:text-base">{children}</p>
  </div>
);

const ObjectionCard = ({
  trigger,
  reply,
  variant = "default",
}: {
  trigger: string;
  reply: React.ReactNode;
  variant?: "default" | "warn";
}) => (
  <div
    className={`rounded-2xl border-2 p-5 md:p-6 ${
      variant === "warn"
        ? "border-amber-300 bg-amber-50/50"
        : "border-border bg-background/80"
    }`}
  >
    <div className="flex items-center gap-2 mb-3">
      <AlertTriangle className="w-4 h-4 text-amber-600" />
      <div className="text-xs md:text-sm uppercase tracking-wider font-bold text-amber-700">
        Если говорит:
      </div>
    </div>
    <div className="text-foreground font-semibold text-base md:text-lg italic mb-4 pl-1">
      «{trigger}»
    </div>
    <div className="border-l-2 border-primary pl-4">
      <div className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">
        Ответ Ксении
      </div>
      <p className="text-foreground leading-relaxed text-[15px] md:text-base">{reply}</p>
    </div>
  </div>
);

const FishkaCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border-2 border-primary/20 p-5 md:p-6 hover:border-primary/40 transition-colors">
    <div className="flex items-center gap-2 mb-3">
      <Sparkles className="w-5 h-5 text-primary" />
      <h4 className="font-bold text-foreground text-base md:text-lg">{title}</h4>
    </div>
    <p className="text-muted-foreground leading-relaxed text-[15px]">{children}</p>
  </div>
);

const UsaScript = () => {
  return (
    <>
      <Helmet>
        <title>Скрипт РИС для США — внутренний документ</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <div className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 md:px-8 py-12 md:py-20 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-semibold mb-6 uppercase tracking-wider">
                <Quote className="w-4 h-4" />
                Внутренний документ · Конфиденциально
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-[0.95] mb-4">
                Скрипт РИС
                <br />
                <span className="text-primary">для США 🇺🇸</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Сценарий звонка для Ксении · продажа рекламных услуг Ильи новым
                бизнесам в Маккини через рекомендацию Тима из Manifest Barbershop.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 max-w-5xl space-y-8 md:space-y-10">
          <Section number="1" title="Как начать" icon={Phone}>
            <p className="text-muted-foreground leading-relaxed text-[15px] md:text-base bg-background/60 rounded-xl p-4 border border-border/60">
              Тут важно сразу связать Тима, Илью и 14 лет опыта, но не хвастаясь, а
              как факт. <br />
              <span className="text-foreground font-medium">
                Тим — клиент Ильи, самый успешный Барбершоп в Маккини.
              </span>
            </p>
            <Dialog>
              «Hi [Имя клиента]! Это Ксения, я менеджер Ильи, звоню по вопросу
              твоей рекламы. Твой контакт нам дал Тим Барбер из Manifest
              Barbershop — сказал, ты открываешь новое место и нам точно стоит
              пообщаться».
            </Dialog>
            <Dialog>
              «Илья в теме продвижения уже лет 14, так что глаз наметан. Тим
              сказал, что тебе сейчас актуально настроить рекламу, это так?»
            </Dialog>
          </Section>

          <Section
            number="2"
            title="Расспросы — даём ему выговориться"
            icon={MessageCircle}
            accent="neutral"
          >
            <p className="text-muted-foreground leading-relaxed text-[15px] md:text-base bg-background/60 rounded-xl p-4 border border-border/60">
              Чтобы понять, что предлагать, задай вопросы про его «детище».
              Американцы обожают рассказывать про свой бизнес.
            </p>
            <div className="grid gap-3">
              <Bullet>
                «Кстати, а чем именно вы занимаетесь? Тим сказал, проект крутой,
                но хочется подробностей».
              </Bullet>
              <Bullet>
                «Вы уже запустились или ещё в процессе стройки/подготовки?»
              </Bullet>
              <Bullet>«На кого целитесь? Кто ваш идеальный гость?»</Bullet>
            </div>
          </Section>

          <Section number="3" title="Предложение — суть на пальцах" icon={Target}>
            <p className="text-muted-foreground leading-relaxed text-[15px] md:text-base bg-background/60 rounded-xl p-4 border border-border/60">
              Когда он рассказал про бизнес, мягко переходи к тому, что сделает
              Илья.
            </p>
            <Dialog>
              «Слушай, звучит круто. Обычно для таких новых точек мы с Ильей
              делаем комбо: <strong>Facebook/Instagram</strong>, чтобы просто все
              соседи о вас узнали (создаём шум), и <strong>Google Maps</strong>,
              чтобы когда люди ищут ваши услуги в навигаторе, они видели вас
              первыми».
            </Dialog>
            <Dialog>
              «За 14 лет мы поняли, что это самая рабочая схема для старта, чтобы
              не тратить бюджет впустую».
            </Dialog>
          </Section>

          <Section
            number="4"
            title="Отработка вопросов · FAQ"
            icon={HelpCircle}
            accent="neutral"
          >
            <ObjectionCard
              trigger="А сколько это стоит?"
              reply={
                <>
                  «Слушай, Илья всегда подбирает бюджет индивидуально. Кому-то
                  надо <strong>500$</strong>, кому-то <strong>5000$</strong>.
                  Стоимость самой услуги под ключ: <strong>Google — 300$/мес</strong>,{" "}
                  <strong>Facebook — 200$/мес</strong>. Давай мы прикинем варианты
                  конкретно под твои цели?»
                </>
              }
            />
            <ObjectionCard
              trigger="Почему именно вы?"
              reply={
                <>
                  «Ну, во-первых, мы работаем с Тимом, а он абы кого не
                  посоветует. А во-вторых, Илья в рекламе с тех пор, как Facebook
                  только появился (уже <strong>14 лет</strong>), так что мы видели
                  всё».
                </>
              }
            />
          </Section>

          <Section number="5" title="Переход к закрытию" icon={ArrowRight}>
            <p className="text-muted-foreground leading-relaxed text-[15px] md:text-base bg-background/60 rounded-xl p-4 border border-border/60">
              Когда цены озвучены, нельзя делать паузу. Нужно сразу объяснить,
              почему это выгодно и что делать дальше.
            </p>
            <Dialog>
              «Слушай, для нового бизнеса это вообще отличный вход. По сути, за
              500$ в месяц ты получаешь отдел маркетинга с 14-летним опытом. Наша
              цель — сделать тебя таким же топовым в Маккини, как Тим. Он сейчас в
              топе, и мы знаем, как повторить этот результат для тебя».
            </Dialog>
            <Dialog>
              <strong>Конкретное действие:</strong> «Чтобы не терять время, я могу
              прямо сейчас скинуть тебе Zelle и короткий опросник. Как только Илья
              получит инфо, он сегодня же начнёт накидывать стратегию. Тебе будет
              удобно оплачивать Zelle?»
            </Dialog>
          </Section>

          <Section
            number="6"
            title="Отработка возражений"
            icon={ShieldQuestion}
            accent="warn"
          >
            <ObjectionCard
              variant="warn"
              trigger="Рано, мы ещё не открылись"
              reply={
                <>
                  «Как раз наоборот! Самое время начинать. Мы создадим эффект{" "}
                  <strong>"скорого открытия" (Coming Soon hype)</strong>. Когда ты
                  распахнёшь двери, у тебя уже будет с кем работать. Если ждать
                  дня открытия, то первые две недели будешь сидеть в пустом зале».
                </>
              }
            />
            <ObjectionCard
              variant="warn"
              trigger="Дорого / Я подумаю"
              reply={
                <>
                  «Я тебя понимаю. Но подумай о том, сколько стоит один день
                  простоя твоего бизнеса без клиентов. Эти 500$ окупятся с первых
                  же нескольких записей (или продаж, хз чем он занимается). Тем
                  более, Тим за тебя попросил, Илья выделит время в графике, чтобы
                  лично всё настроить на старте».
                </>
              }
            />
          </Section>

          <Section
            number="7"
            title="Фиксация сделки"
            icon={CheckCircle2}
            accent="ok"
          >
            <p className="text-muted-foreground leading-relaxed text-[15px] md:text-base bg-background/60 rounded-xl p-4 border border-border/60">
              Если он согласен, Ксения чётко проговаривает шаги, чтобы у него не
              было страха неизвестности.
            </p>
            <Dialog>«Отлично! План такой:»</Dialog>
            <div className="grid gap-3">
              {[
                "Я посылаю информацию для оплаты и форму с вопросами.",
                "Илья изучает твои ответы, и я обсужу с тобой креативы (фото/видео).",
                "Мы запускаемся в течение 3–5 рабочих дней.",
              ].map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-background/80 rounded-2xl p-4 md:p-5 border-2 border-emerald-200"
                >
                  <div className="shrink-0 w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow">
                    {i + 1}
                  </div>
                  <p className="text-foreground leading-relaxed text-[15px] md:text-base pt-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>
            <Dialog>«Рада, что мы в деле! Будет круто».</Dialog>
          </Section>

          <Section
            number="★"
            title="Тонкие фишки для Ксении — чтобы дожать"
            icon={Sparkles}
          >
            <div className="grid md:grid-cols-2 gap-4 md:gap-5">
              <FishkaCard title="Акцент на эксклюзивность">
                «Илья берёт всего пару новых проектов в месяц, чтобы не терять в
                качестве. Тим очень за тебя просил, поэтому я сразу тебе набрала,
                пока есть "окошко"». — создаёт дефицит.
              </FishkaCard>
              <FishkaCard title="Эффект сопричастности">
                Используй фразу <strong>«We'll get you busy»</strong> (Мы сделаем
                тебя занятым клиентами). Это то, что хочет слышать любой владелец
                нового бизнеса.
              </FishkaCard>
              <FishkaCard title="Уверенность в ценах">
                Цены <strong>$300</strong> и <strong>$200</strong> — очень
                лояльные для рынка США (обычно берут от $1000 только за работу).
                Произноси их уверенно, как «супер-предложение для друзей Тима».
              </FishkaCard>
              <FishkaCard title="Тон разговора">
                Дружелюбно, по-партнёрски, без давления. Ты не продавец — ты
                «своя», от Тима. Это меняет всю динамику разговора.
              </FishkaCard>
            </div>
          </Section>

          <div className="text-center pt-8 pb-4">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              РИС · Внутренний скрипт · Не для распространения
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsaScript;
