import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight, TrendingUp } from "lucide-react";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";
import { useCasesSliderItems } from "@/hooks/useCasesSliderItems";

const CasesSlider = () => {
  const { settings } = useSiteSettingsMap();
  const { data: casesData } = useCasesSliderItems();

  const title = getSetting(settings, "home_cases_slider_title", "Кейсы Успеха");
  const subtitle = getSetting(
    settings,
    "home_cases_slider_subtitle",
    "Реальные результаты наших клиентов в разных нишах"
  );
  const allCasesCta = getSetting(settings, "home_cases_slider_all_button", "Все кейсы");
  const bottomText = getSetting(
    settings,
    "home_cases_slider_bottom_text",
    "Более 100+ успешных проектов в различных нишах"
  );
  const bottomCta = getSetting(settings, "home_cases_slider_bottom_cta", "Получить такой же результат");

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const cases =
    casesData?.map((item) => ({
      category: item.category,
      title: item.title,
      description: item.description || "",
      image: item.image_url,
      imageVersion: item.updated_at,
      stats: {
        leads: item.stats_leads || "—",
        cpl: item.stats_cpl || "—",
        roi: item.stats_roi || "—",
      },
      link: item.link,
    })) || [];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-bold">
                {title.split(" ")[0]}{" "}
                <span className="text-gradient-primary">{title.split(" ").slice(1).join(" ")}</span>
              </h2>
              <p className="text-lg text-muted-foreground">{subtitle}</p>
            </div>
            <Button variant="outline" size="lg" asChild className="self-start md:self-auto">
              <Link to="/cases">
                {allCasesCta} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {cases.map((caseItem, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                  >
                    <Link to={caseItem.link}>
                      <Card className="overflow-hidden hover:shadow-card-hover transition-base group h-full">
                        {/* Image */}
                        <div className="aspect-[16/10] overflow-hidden relative">
                          <img
                            src={`${caseItem.image}${caseItem.imageVersion ? `?v=${encodeURIComponent(caseItem.imageVersion)}` : ""}`}
                            alt={`Кейс: ${caseItem.title}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-base"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-background/90 text-foreground backdrop-blur-sm">
                              {caseItem.category}
                            </Badge>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                          <div className="space-y-2">
                            <h3 className="text-xl font-bold group-hover:text-primary transition-base">
                              {caseItem.title}
                            </h3>
                            {caseItem.description && (
                              <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                            )}
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-3 pt-4 border-t">
                            <div>
                              <div className="text-base font-bold text-primary">{caseItem.stats.leads}</div>
                              <div className="text-xs text-muted-foreground">Лидов</div>
                            </div>
                            <div>
                              <div className="text-base font-bold text-primary">{caseItem.stats.cpl}</div>
                              <div className="text-xs text-muted-foreground">CPL</div>
                            </div>
                            <div>
                              <div className="text-base font-bold text-accent flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                {caseItem.stats.roi}
                              </div>
                              <div className="text-xs text-muted-foreground">ROI</div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                className="h-10 w-10 rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                className="h-10 w-10 rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground mb-4">{bottomText}</p>
            <Button variant="cta" size="lg" asChild>
              <Link to="/contacts">{bottomCta}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasesSlider;
