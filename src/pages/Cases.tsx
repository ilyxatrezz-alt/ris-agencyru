import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Zap, Target, Award, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useCaseCategories } from "@/hooks/useCases";
const fallbackImages: Record<string, string> = {
    "medicine-beauty": "/images/case-category-medicine.jpg",
    construction: "/images/case-category-construction.jpg",
    horeca: "/images/case-category-horeca.jpg",
    lawyers: "/images/case-category-lawyers.jpg",
  };

const Cases = () => {
  const { data: categories = [], isLoading } = useCaseCategories();

  const caseCategories = categories
    .filter((c) => c.is_active !== false)
    .map((c) => ({
      slug: c.slug,
      title: c.title,
      description: c.description,
      image: c.image_url || fallbackImages[c.slug] || "/images/case-category-medicine.jpg",
      stats: {
        leads: c.stats_leads || "—",
        cpl: c.stats_cpl || "—",
        roi: c.stats_roi || "—",
      },
    }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const seoTitle = "Кейсы — РИС";
  const seoDescription = "Кейсы агентства РИС: результаты рекламных кампаний и сайтов в цифрах. CPL, лиды и ROI по нишам.";
  const canonical = `${window.location.origin}/cases`;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-16 md:py-32 overflow-hidden bg-secondary/50">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-hero" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Более 200 успешных проектов</span>
              </motion.div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Наши <span className="text-gradient-primary">кейсы</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Цифры, которые невозможно игнорировать. Результаты, которые меняют бизнес.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cases Grid */}
        <section className="py-12 md:py-28">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {caseCategories.map((category) => (
                  <motion.div key={category.slug} variants={itemVariants}>
                    <Link to={`/cases/${category.slug}`} className="group block">
                      <div className="relative overflow-hidden rounded-2xl shadow-card hover:shadow-red-glow transition-all duration-500 border border-border/50 hover:border-primary/50 bg-card">
                        <div className="aspect-[4/3] overflow-hidden relative">
                          <img
                            src={category.image}
                            alt={`Кейс: ${category.title}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                        </div>
                        <div className="p-5 md:p-6 space-y-4">
                          <h2 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                            {category.title}
                          </h2>
                          <p className="text-sm text-muted-foreground line-clamp-2">{category.description}</p>

                          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/50">
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

                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                          >
                            Смотреть кейсы{" "}
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Stats Banner */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary" />
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="grid md:grid-cols-4 gap-8 text-center text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {[
                { icon: TrendingUp, value: "200+", label: "Успешных кампаний" },
                { icon: Zap, value: "-45%", label: "CPL ниже рынка" },
                { icon: Target, value: "+210%", label: "Средний ROI" },
                { icon: Award, value: "97%", label: "Клиентов возвращаются" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <stat.icon className="h-12 w-12 mx-auto" />
                  </motion.div>
                  <div className="text-4xl md:text-5xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Cases;
