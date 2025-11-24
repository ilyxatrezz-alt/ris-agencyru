import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, X } from "lucide-react";

const Admin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    category: "",
    project_type: "",
    result_description: "",
    order_index: 0,
  });

  const { data: websites, isLoading } = useQuery({
    queryKey: ["admin-websites"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("websites")
        .select("*")
        .order("order_index", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from("websites").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-websites"] });
      toast({ title: "Сайт добавлен успешно!" });
      resetForm();
    },
    onError: () => {
      toast({ title: "Ошибка при добавлении", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase.from("websites").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-websites"] });
      toast({ title: "Сайт обновлен успешно!" });
      setIsEditing(null);
    },
    onError: () => {
      toast({ title: "Ошибка при обновлении", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("websites").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-websites"] });
      toast({ title: "Сайт удален успешно!" });
    },
    onError: () => {
      toast({ title: "Ошибка при удалении", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image_url: "",
      category: "",
      project_type: "",
      result_description: "",
      order_index: 0,
    });
    setShowForm(false);
    setIsEditing(null);
  };

  const handleEdit = (website: any) => {
    setFormData({
      title: website.title,
      description: website.description,
      image_url: website.image_url,
      category: website.category,
      project_type: website.project_type,
      result_description: website.result_description || "",
      order_index: website.order_index,
    });
    setIsEditing(website.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateMutation.mutate({ id: isEditing, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl md:text-4xl font-bold">
                Управление <span className="text-gradient-primary">Сайтами</span>
              </h1>
              <Button
                variant="cta"
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Добавить сайт
              </Button>
            </div>

            {showForm && (
              <div className="bg-card p-6 rounded-2xl shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">
                    {isEditing ? "Редактировать" : "Добавить"} сайт
                  </h2>
                  <Button variant="ghost" size="icon" onClick={resetForm}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Название проекта</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="project_type">Тип проекта</Label>
                      <Input
                        id="project_type"
                        value={formData.project_type}
                        onChange={(e) =>
                          setFormData({ ...formData, project_type: e.target.value })
                        }
                        required
                        placeholder="Лендинг, Корпоративный сайт..."
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="image_url">URL изображения</Label>
                      <Input
                        id="image_url"
                        value={formData.image_url}
                        onChange={(e) =>
                          setFormData({ ...formData, image_url: e.target.value })
                        }
                        required
                        placeholder="/placeholder.svg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Категория</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData({ ...formData, category: value })
                        }
                        required
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medicine-beauty">
                            Медицина & Beauty
                          </SelectItem>
                          <SelectItem value="construction">
                            Строительство & Коттеджи
                          </SelectItem>
                          <SelectItem value="horeca">
                            Рестораны & Общепит
                          </SelectItem>
                          <SelectItem value="lawyers">
                            Юридические услуги
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="result_description">Результат</Label>
                      <Input
                        id="result_description"
                        value={formData.result_description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            result_description: e.target.value,
                          })
                        }
                        placeholder="Рост конверсии на 120%"
                      />
                    </div>
                    <div>
                      <Label htmlFor="order_index">Порядок отображения</Label>
                      <Input
                        id="order_index"
                        type="number"
                        value={formData.order_index}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            order_index: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" variant="hero" className="flex-1">
                      {isEditing ? "Сохранить" : "Добавить"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      className="flex-1"
                    >
                      Отмена
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Существующие сайты</h2>
              {isLoading ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="animate-pulse bg-muted rounded-xl h-48"
                    />
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {websites?.map((website) => (
                    <div
                      key={website.id}
                      className="bg-card p-6 rounded-xl shadow-card border border-border/50 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{website.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {website.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(website)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteMutation.mutate(website.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                          {website.project_type}
                        </span>
                        <span className="px-2 py-1 bg-accent/10 text-accent rounded">
                          {website.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
