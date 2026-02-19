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
import { useAuth } from "@/hooks/useAuth";
import SettingsEditor from "@/components/admin/SettingsEditor";
import { 
  Pencil, 
  Trash2, 
  Plus, 
  X, 
  Globe, 
  Phone, 
  Building, 
  FileText, 
  LogOut,
  LayoutDashboard,
  BarChart3,
  Briefcase,
  MessageSquare,
  Home,
  FolderOpen
} from "lucide-react";
import CasesEditor from "@/components/admin/CasesEditor";
import ProcessStepsEditor from "@/components/admin/ProcessStepsEditor";
import CasesSliderEditor from "@/components/admin/CasesSliderEditor";
import ReviewsEditor from "@/components/admin/ReviewsEditor";
import { motion } from "framer-motion";

const Admin = () => {
  const { toast } = useToast();
  const { user, signOut } = useAuth();
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
      <main className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-card rounded-2xl shadow-card border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl gradient-primary flex items-center justify-center shadow-cta">
                  <LayoutDashboard className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-black">
                    Панель управления
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => signOut()}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Выйти
              </Button>
            </motion.div>

            {/* Main Tabs */}
            <Tabs defaultValue="hero" className="space-y-6">
              <TabsList className="w-full grid grid-cols-4 sm:grid-cols-7 h-auto gap-1 p-1 bg-muted/50">
                <TabsTrigger value="hero" className="gap-1.5 py-2.5 px-2 text-xs sm:text-sm">
                  <Home className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Главная</span>
                </TabsTrigger>
                <TabsTrigger value="contacts" className="gap-1.5 py-2.5 px-2 text-xs sm:text-sm">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Контакты</span>
                </TabsTrigger>
                <TabsTrigger value="company" className="gap-1.5 py-2.5 px-2 text-xs sm:text-sm">
                  <Building className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Компания</span>
                </TabsTrigger>
                <TabsTrigger value="stats" className="gap-1.5 py-2.5 px-2 text-xs sm:text-sm">
                  <BarChart3 className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Статистика</span>
                </TabsTrigger>
                <TabsTrigger value="pages" className="gap-1.5 py-2.5 px-2 text-xs sm:text-sm">
                  <FileText className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Страницы</span>
                </TabsTrigger>
                <TabsTrigger value="cases" className="gap-1.5 py-2.5 px-2 text-xs sm:text-sm">
                  <FolderOpen className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Кейсы</span>
                </TabsTrigger>
                <TabsTrigger value="websites" className="gap-1.5 py-2.5 px-2 text-xs sm:text-sm">
                  <Globe className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Сайты</span>
                </TabsTrigger>
              </TabsList>

              {/* Главная */}
              <TabsContent value="hero" className="space-y-6">
                <SettingsEditor
                  category="effects"
                  title="Визуальные эффекты"
                  description="Новогодние эффекты и украшения сайта"
                />
                <SettingsEditor
                  category="hero"
                  title="Главная страница (Hero)"
                  description="Редактируйте заголовки и тексты на главной странице"
                />
                <SettingsEditor
                  category="home_quick_contact"
                  title="Главная — Быстрая связь"
                  description="Заголовки и тексты блока «Быстрая связь»"
                />
                <SettingsEditor
                  category="home_stats_block"
                  title="Главная — Статистика"
                  description="Тексты и значения блока со статистикой"
                />
                <SettingsEditor
                  category="home_cases_slider"
                  title="Главная — Слайдер кейсов"
                  description="Заголовки и CTA слайдера кейсов (карточки — следующим шагом)"
                />
                <SettingsEditor
                  category="home_price_calculator"
                  title="Главная — Калькулятор"
                  description="Заголовки и тексты калькулятора (настройки услуг — следующим шагом)"
                />
                <SettingsEditor
                  category="home_comparison"
                  title="Главная — Сравнение"
                  description="Заголовки и CTA блока сравнения"
                />
                <SettingsEditor
                  category="home_process"
                  title="Главная — Процесс"
                  description="Заголовки и подзаголовок блока процесса"
                />
                <ProcessStepsEditor />
                <SettingsEditor
                  category="home_reviews"
                  title="Главная — Отзывы"
                  description="Заголовки и сводные цифры"
                />
                <ReviewsEditor />
                <CasesSliderEditor />
                <SettingsEditor
                  category="home_contact_form"
                  title="Главная — Форма заявки"
                  description="Заголовки, тексты и подписи формы"
                />
              </TabsContent>

              {/* Contacts Editor */}
              <TabsContent value="contacts">
                <SettingsEditor
                  category="contacts"
                  title="Контактные данные"
                  description="Телефон, email, Telegram и режим работы"
                />
              </TabsContent>

              {/* Company Editor */}
              <TabsContent value="company" className="space-y-6">
                <SettingsEditor
                  category="company"
                  title="Данные компании"
                  description="Название, описание и слоган"
                />
                <SettingsEditor
                  category="legal"
                  title="Юридические данные"
                  description="ИП, ИНН, ОГРНИП"
                />
              </TabsContent>

              {/* Stats Editor */}
              <TabsContent value="stats">
                <SettingsEditor
                  category="stats"
                  title="Статистика"
                  description="Цифры, отображаемые на сайте"
                />
              </TabsContent>

              {/* Pages Editor */}
              <TabsContent value="pages" className="space-y-6">
                <SettingsEditor
                  category="about"
                  title="Страница «О нас»"
                  description="Заголовки и тексты страницы О нас"
                />
                <SettingsEditor
                  category="services"
                  title="Страница «Услуги»"
                  description="Заголовки и тексты страницы Услуги"
                />
                <SettingsEditor
                  category="contacts_page"
                  title="Страница «Контакты»"
                  description="Заголовки и тексты страницы Контакты"
                />
              </TabsContent>

              {/* Cases Tab */}
              <TabsContent value="cases">
                <CasesEditor />
              </TabsContent>

              {/* Websites Tab */}
              <TabsContent value="websites" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold">Управление сайтами</h2>
                    <p className="text-sm text-muted-foreground">Портфолио и кейсы</p>
                  </div>
                  <Button
                    variant="cta"
                    onClick={() => {
                      resetForm();
                      setShowForm(true);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Добавить
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
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
