import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, X, Globe, Settings, FileText, Phone, Building } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            <motion.div 
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl md:text-5xl font-black">
                Панель <span className="text-gradient-primary">управления</span>
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Управляйте контентом сайта в одном месте
              </p>
            </motion.div>

            <Tabs defaultValue="websites" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1 bg-muted/50">
                <TabsTrigger value="websites" className="flex items-center gap-2 py-3">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">Сайты</span>
                </TabsTrigger>
                <TabsTrigger value="contacts" className="flex items-center gap-2 py-3">
                  <Phone className="h-4 w-4" />
                  <span className="hidden sm:inline">Контакты</span>
                </TabsTrigger>
                <TabsTrigger value="company" className="flex items-center gap-2 py-3">
                  <Building className="h-4 w-4" />
                  <span className="hidden sm:inline">Компания</span>
                </TabsTrigger>
                <TabsTrigger value="content" className="flex items-center gap-2 py-3">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Контент</span>
                </TabsTrigger>
              </TabsList>

              {/* Websites Tab */}
              <TabsContent value="websites" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Управление сайтами</h2>
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
                  <motion.div 
                    className="bg-card p-6 rounded-2xl shadow-card border border-border/50"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold">
                        {isEditing ? "Редактировать" : "Добавить"} сайт
                      </h3>
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
                  </motion.div>
                )}

                <div className="space-y-4">
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
                        <motion.div
                          key={website.id}
                          className="bg-card p-6 rounded-xl shadow-card border border-border/50 space-y-3 hover:border-primary/30 transition-colors"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-bold text-lg">{website.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {website.description}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(website)}
                                className="hover:bg-primary/10 hover:text-primary"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteMutation.mutate(website.id)}
                                className="hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="px-2 py-1 bg-primary/10 text-primary rounded-md font-medium">
                              {website.project_type}
                            </span>
                            <span className="px-2 py-1 bg-muted text-muted-foreground rounded-md">
                              {website.category}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Contacts Tab */}
              <TabsContent value="contacts" className="space-y-6">
                <motion.div 
                  className="bg-card p-8 rounded-2xl shadow-card border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Контактные данные</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-muted-foreground text-sm">Телефон</Label>
                        <p className="text-lg font-semibold">{siteConfig.phone}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-sm">Email</Label>
                        <p className="text-lg font-semibold">{siteConfig.email}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-sm">Telegram</Label>
                        <p className="text-lg font-semibold">{siteConfig.telegram}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-muted-foreground text-sm">Режим работы</Label>
                        <p className="font-semibold">{siteConfig.workingHours.weekdays}</p>
                        <p className="text-muted-foreground">{siteConfig.workingHours.weekend}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-sm">Локация</Label>
                        <p className="font-semibold">{siteConfig.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <p className="text-sm text-muted-foreground">
                      <Settings className="h-4 w-4 inline mr-2" />
                      Для изменения контактных данных отредактируйте файл <code className="bg-muted px-2 py-0.5 rounded text-xs">src/config/siteConfig.ts</code>
                    </p>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Company Tab */}
              <TabsContent value="company" className="space-y-6">
                <motion.div 
                  className="bg-card p-8 rounded-2xl shadow-card border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Данные компании</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-4 bg-muted/50 rounded-xl">
                        <Label className="text-muted-foreground text-sm">Название компании</Label>
                        <p className="text-xl font-bold mt-1">{siteConfig.company.fullName}</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-xl">
                        <Label className="text-muted-foreground text-sm">Описание</Label>
                        <p className="mt-1">{siteConfig.company.description}</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-xl">
                        <Label className="text-muted-foreground text-sm">Год основания</Label>
                        <p className="text-lg font-semibold mt-1">{siteConfig.company.yearFounded}</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                          <Building className="h-5 w-5 text-primary" />
                          Юридические данные
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-muted-foreground text-xs">Наименование</Label>
                            <p className="font-semibold">{siteConfig.legal.name}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground text-xs">ИНН</Label>
                            <p className="font-mono">{siteConfig.legal.inn}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground text-xs">ОГРНИП</Label>
                            <p className="font-mono">{siteConfig.legal.ogrnip}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <p className="text-sm text-muted-foreground">
                      <Settings className="h-4 w-4 inline mr-2" />
                      Для изменения данных компании отредактируйте файл <code className="bg-muted px-2 py-0.5 rounded text-xs">src/config/siteConfig.ts</code>
                    </p>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-6">
                <motion.div 
                  className="bg-card p-8 rounded-2xl shadow-card border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Статистика на сайте</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-transparent rounded-xl border border-primary/20 text-center">
                      <p className="text-2xl font-black text-primary">{siteConfig.stats.adBudget}</p>
                      <p className="text-sm text-muted-foreground mt-1">Рекламных бюджетов</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-transparent rounded-xl border border-primary/20 text-center">
                      <p className="text-2xl font-black text-primary">{siteConfig.stats.projects}</p>
                      <p className="text-sm text-muted-foreground mt-1">Успешных проектов</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-transparent rounded-xl border border-primary/20 text-center">
                      <p className="text-2xl font-black text-primary">{siteConfig.stats.clientsLoyalty}</p>
                      <p className="text-sm text-muted-foreground mt-1">Клиентов 3+ года</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-transparent rounded-xl border border-primary/20 text-center">
                      <p className="text-2xl font-black text-primary">{siteConfig.stats.launchTime}</p>
                      <p className="text-sm text-muted-foreground mt-1">До запуска рекламы</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <p className="text-sm text-muted-foreground">
                      <Settings className="h-4 w-4 inline mr-2" />
                      Для изменения статистики отредактируйте файл <code className="bg-muted px-2 py-0.5 rounded text-xs">src/config/siteConfig.ts</code>
                    </p>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;