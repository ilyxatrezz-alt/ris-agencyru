import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink } from "lucide-react";

interface WebsitesShowcaseProps {
  category?: string;
}

const WebsitesShowcase = ({ category }: WebsitesShowcaseProps) => {
  const { data: websites, isLoading } = useQuery({
    queryKey: ["websites", category],
    queryFn: async () => {
      let query = supabase
        .from("websites")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true });

      if (category) {
        query = query.eq("category", category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-muted rounded-2xl h-80"
          />
        ))}
      </div>
    );
  }

  if (!websites || websites.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Пока нет примеров сайтов в этой категории
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">
          Примеры <span className="text-gradient-primary">Наших Сайтов</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Создаём сайты, которые конвертируют посетителей в клиентов
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {websites.map((website) => (
          <div
            key={website.id}
            className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-base border border-border/50"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={website.image_url}
                alt={website.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-base"
              />
            </div>
            <div className="p-6 space-y-3 bg-card">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xl font-bold group-hover:text-primary transition-base">
                  {website.title}
                </h3>
                <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-base flex-shrink-0" />
              </div>
              <p className="text-sm text-muted-foreground">
                {website.description}
              </p>
              <div className="pt-3 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Тип проекта:</span>
                  <span className="font-semibold">{website.project_type}</span>
                </div>
                {website.result_description && (
                  <div className="text-sm text-accent font-medium">
                    ✓ {website.result_description}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebsitesShowcase;
