import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  useCaseCategories,
  useCaseItems,
  useUpdateCaseCategory,
  useCreateCaseItem,
  useUpdateCaseItem,
  useDeleteCaseItem,
  CaseCategory,
  CaseItem,
} from "@/hooks/useCases";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Pencil, Trash2, Plus, X, Save, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const CasesEditor = () => {
  const { toast } = useToast();
  const { data: categories, isLoading: categoriesLoading } = useCaseCategories();
  const { data: allItems, isLoading: itemsLoading } = useCaseItems();
  
  const updateCategory = useUpdateCaseCategory();
  const createItem = useCreateCaseItem();
  const updateItem = useUpdateCaseItem();
  const deleteItem = useDeleteCaseItem();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<CaseCategory | null>(null);
  const [editingItem, setEditingItem] = useState<CaseItem | null>(null);
  const [showItemForm, setShowItemForm] = useState(false);
  const [itemFormData, setItemFormData] = useState({
    category_id: "",
    title: "",
    platform: "",
    problem: "",
    solution: "",
    result_budget: "",
    result_period: "",
    result_leads: "",
    result_cpl: "",
    result_roi: "",
    order_index: 0,
  });

  const resetItemForm = () => {
    setItemFormData({
      category_id: selectedCategory || "",
      title: "",
      platform: "",
      problem: "",
      solution: "",
      result_budget: "",
      result_period: "",
      result_leads: "",
      result_cpl: "",
      result_roi: "",
      order_index: 0,
    });
    setShowItemForm(false);
    setEditingItem(null);
  };

  const handleSaveCategory = async () => {
    if (!editingCategory) return;
    try {
      await updateCategory.mutateAsync({
        id: editingCategory.id,
        data: {
          title: editingCategory.title,
          description: editingCategory.description,
          hero_title: editingCategory.hero_title,
          hero_description: editingCategory.hero_description,
          stats_leads: editingCategory.stats_leads,
          stats_cpl: editingCategory.stats_cpl,
          stats_roi: editingCategory.stats_roi,
        },
      });
      toast({ title: "Категория обновлена" });
      setEditingCategory(null);
    } catch {
      toast({ title: "Ошибка", variant: "destructive" });
    }
  };

  const handleEditItem = (item: CaseItem) => {
    setItemFormData({
      category_id: item.category_id,
      title: item.title,
      platform: item.platform,
      problem: item.problem,
      solution: item.solution,
      result_budget: item.result_budget,
      result_period: item.result_period,
      result_leads: item.result_leads,
      result_cpl: item.result_cpl,
      result_roi: item.result_roi,
      order_index: item.order_index || 0,
    });
    setEditingItem(item);
    setShowItemForm(true);
  };

  const handleSubmitItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateItem.mutateAsync({ id: editingItem.id, data: itemFormData });
        toast({ title: "Кейс обновлён" });
      } else {
        await createItem.mutateAsync(itemFormData as any);
        toast({ title: "Кейс добавлен" });
      }
      resetItemForm();
    } catch {
      toast({ title: "Ошибка", variant: "destructive" });
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Удалить этот кейс?")) return;
    try {
      await deleteItem.mutateAsync(id);
      toast({ title: "Кейс удалён" });
    } catch {
      toast({ title: "Ошибка", variant: "destructive" });
    }
  };

  if (categoriesLoading || itemsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const filteredItems = selectedCategory
    ? allItems?.filter((i) => i.category_id === selectedCategory)
    : allItems;

  return (
    <div className="space-y-6">
      {/* Category Selector */}
      <motion.div
        className="bg-card p-6 rounded-2xl shadow-card border border-border/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Категории кейсов</h2>
        </div>

        <Select
          value={selectedCategory || ""}
          onValueChange={(v) => {
            setSelectedCategory(v || null);
            setItemFormData((prev) => ({ ...prev, category_id: v }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите категорию для редактирования" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Category Editor */}
      {selectedCategory && (
        <motion.div
          className="bg-card p-6 rounded-2xl shadow-card border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Accordion type="single" collapsible>
            <AccordionItem value="category-settings" className="border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline">
                Настройки категории
              </AccordionTrigger>
              <AccordionContent>
                {(() => {
                  const cat = categories?.find((c) => c.id === selectedCategory);
                  if (!cat) return null;
                  const editing = editingCategory?.id === cat.id ? editingCategory : cat;

                  return (
                    <div className="space-y-4 pt-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Название</Label>
                          <Input
                            value={editing.title}
                            onChange={(e) =>
                              setEditingCategory({ ...editing, title: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label>Заголовок Hero</Label>
                          <Input
                            value={editing.hero_title || ""}
                            onChange={(e) =>
                              setEditingCategory({ ...editing, hero_title: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Описание категории</Label>
                        <Textarea
                          value={editing.description}
                          onChange={(e) =>
                            setEditingCategory({ ...editing, description: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label>Описание Hero</Label>
                        <Textarea
                          value={editing.hero_description || ""}
                          onChange={(e) =>
                            setEditingCategory({ ...editing, hero_description: e.target.value })
                          }
                        />
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label>Статистика: Лиды</Label>
                          <Input
                            value={editing.stats_leads || ""}
                            onChange={(e) =>
                              setEditingCategory({ ...editing, stats_leads: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label>Статистика: CPL</Label>
                          <Input
                            value={editing.stats_cpl || ""}
                            onChange={(e) =>
                              setEditingCategory({ ...editing, stats_cpl: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label>Статистика: ROI</Label>
                          <Input
                            value={editing.stats_roi || ""}
                            onChange={(e) =>
                              setEditingCategory({ ...editing, stats_roi: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <Button
                        onClick={handleSaveCategory}
                        disabled={updateCategory.isPending}
                        className="gap-2"
                      >
                        {updateCategory.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                        Сохранить
                      </Button>
                    </div>
                  );
                })()}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      )}

      {/* Case Items */}
      {selectedCategory && (
        <motion.div
          className="bg-card p-6 rounded-2xl shadow-card border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Кейсы в категории</h3>
            <Button
              variant="cta"
              size="sm"
              onClick={() => {
                resetItemForm();
                setItemFormData((prev) => ({ ...prev, category_id: selectedCategory }));
                setShowItemForm(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Добавить кейс
            </Button>
          </div>

          {showItemForm && (
            <motion.div
              className="mb-6 p-4 border border-border rounded-xl bg-secondary/30"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">
                  {editingItem ? "Редактировать кейс" : "Новый кейс"}
                </h4>
                <Button variant="ghost" size="icon" onClick={resetItemForm}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleSubmitItem} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Заголовок</Label>
                    <Input
                      value={itemFormData.title}
                      onChange={(e) =>
                        setItemFormData({ ...itemFormData, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Платформа</Label>
                    <Input
                      value={itemFormData.platform}
                      onChange={(e) =>
                        setItemFormData({ ...itemFormData, platform: e.target.value })
                      }
                      required
                      placeholder="Яндекс.Директ, ВКонтакте..."
                    />
                  </div>
                </div>

                <div>
                  <Label>Проблема</Label>
                  <Textarea
                    value={itemFormData.problem}
                    onChange={(e) =>
                      setItemFormData({ ...itemFormData, problem: e.target.value })
                    }
                    required
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Решение</Label>
                  <Textarea
                    value={itemFormData.solution}
                    onChange={(e) =>
                      setItemFormData({ ...itemFormData, solution: e.target.value })
                    }
                    required
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <Label>Бюджет</Label>
                    <Input
                      value={itemFormData.result_budget}
                      onChange={(e) =>
                        setItemFormData({ ...itemFormData, result_budget: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Период</Label>
                    <Input
                      value={itemFormData.result_period}
                      onChange={(e) =>
                        setItemFormData({ ...itemFormData, result_period: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Лиды</Label>
                    <Input
                      value={itemFormData.result_leads}
                      onChange={(e) =>
                        setItemFormData({ ...itemFormData, result_leads: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>CPL</Label>
                    <Input
                      value={itemFormData.result_cpl}
                      onChange={(e) =>
                        setItemFormData({ ...itemFormData, result_cpl: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>ROI</Label>
                    <Input
                      value={itemFormData.result_roi}
                      onChange={(e) =>
                        setItemFormData({ ...itemFormData, result_roi: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" variant="hero" className="flex-1">
                    {editingItem ? "Сохранить" : "Добавить"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetItemForm}>
                    Отмена
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          <div className="space-y-3">
            {filteredItems?.map((item) => (
              <motion.div
                key={item.id}
                className="p-4 border border-border/50 rounded-xl hover:border-primary/30 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.platform} • CPL: {item.result_cpl} • ROI: {item.result_roi}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditItem(item)}
                      className="hover:bg-primary/10 hover:text-primary"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteItem(item.id)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredItems?.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                Нет кейсов в этой категории
              </p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CasesEditor;
