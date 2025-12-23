import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAdminCasesSliderItems, useCasesSliderMutations } from "@/hooks/useCasesSliderItems";
import { Plus, Trash2, Pencil, X, ArrowUp, ArrowDown, ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CasesSliderEditor = () => {
  const { toast } = useToast();
  const { data: items, isLoading } = useAdminCasesSliderItems();
  const { createMutation, updateMutation, deleteMutation, reorderMutation } = useCasesSliderMutations();
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image_url: "",
    link: "",
    stats_leads: "",
    stats_cpl: "",
    stats_roi: "",
    order_index: 0,
    is_active: true,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      image_url: "",
      link: "",
      stats_leads: "",
      stats_cpl: "",
      stats_roi: "",
      order_index: items?.length || 0,
      is_active: true,
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (item: any) => {
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description || "",
      image_url: item.image_url,
      link: item.link,
      stats_leads: item.stats_leads || "",
      stats_cpl: item.stats_cpl || "",
      stats_roi: item.stats_roi || "",
      order_index: item.order_index,
      is_active: item.is_active,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate(
        { id: editingId, data: formData },
        {
          onSuccess: () => {
            toast({ title: "Карточка обновлена" });
            resetForm();
          },
          onError: () => toast({ title: "Ошибка", variant: "destructive" }),
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          toast({ title: "Карточка добавлена" });
          resetForm();
        },
        onError: () => toast({ title: "Ошибка", variant: "destructive" }),
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Удалить эту карточку?")) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast({ title: "Карточка удалена" }),
        onError: () => toast({ title: "Ошибка", variant: "destructive" }),
      });
    }
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    if (!items) return;
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;

    const reordered = [...items];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    
    const updates = reordered.map((item, idx) => ({
      id: item.id,
      order_index: idx,
    }));
    
    reorderMutation.mutate(updates, {
      onSuccess: () => toast({ title: "Порядок обновлён" }),
    });
  };

  if (isLoading) return <div className="animate-pulse h-32 bg-muted rounded-xl" />;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold">Карточки слайдера кейсов</h3>
          <p className="text-sm text-muted-foreground">Кейсы на главной странице</p>
        </div>
        <Button variant="cta" size="sm" onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus className="h-4 w-4 mr-2" /> Добавить
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="mb-6 p-4 bg-muted/50 rounded-xl space-y-4"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">{editingId ? "Редактировать" : "Новая"} карточка</h4>
              <Button type="button" variant="ghost" size="icon" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Название</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Категория</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Медицина & Beauty"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>URL изображения</Label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="/images/case.jpg"
                  required
                />
              </div>
              <div>
                <Label>Ссылка на кейс</Label>
                <Input
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="/cases/medicine-beauty"
                  required
                />
              </div>
            </div>
            <div>
              <Label>Описание</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Рост записей на 150%"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Лидов</Label>
                <Input
                  value={formData.stats_leads}
                  onChange={(e) => setFormData({ ...formData, stats_leads: e.target.value })}
                  placeholder="72"
                />
              </div>
              <div>
                <Label>CPL</Label>
                <Input
                  value={formData.stats_cpl}
                  onChange={(e) => setFormData({ ...formData, stats_cpl: e.target.value })}
                  placeholder="2 500 ₽"
                />
              </div>
              <div>
                <Label>ROI</Label>
                <Input
                  value={formData.stats_roi}
                  onChange={(e) => setFormData({ ...formData, stats_roi: e.target.value })}
                  placeholder="+150%"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label>Активна</Label>
            </div>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {editingId ? "Сохранить" : "Добавить"}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        {items?.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            className={`flex items-center gap-3 p-4 rounded-xl border ${item.is_active ? "bg-card" : "bg-muted/30 opacity-60"}`}
          >
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => handleMove(index, "up")}
                disabled={index === 0}
              >
                <ArrowUp className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => handleMove(index, "down")}
                disabled={index === (items?.length || 0) - 1}
              >
                <ArrowDown className="h-3 w-3" />
              </Button>
            </div>
            <div className="w-16 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
              {item.image_url ? (
                <img src={item.image_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{item.title}</div>
              <div className="text-sm text-muted-foreground truncate">{item.category} • {item.link}</div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </motion.div>
        ))}
        {(!items || items.length === 0) && (
          <div className="text-center py-8 text-muted-foreground">Нет карточек</div>
        )}
      </div>
    </Card>
  );
};

export default CasesSliderEditor;
