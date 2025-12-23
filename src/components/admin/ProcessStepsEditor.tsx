import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAdminProcessSteps, useProcessStepsMutations } from "@/hooks/useProcessSteps";
import { Plus, Trash2, Pencil, X, GripVertical, ArrowUp, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProcessStepsEditor = () => {
  const { toast } = useToast();
  const { data: steps, isLoading } = useAdminProcessSteps();
  const { createMutation, updateMutation, deleteMutation, reorderMutation } = useProcessStepsMutations();
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    step_number: "",
    title: "",
    description: "",
    order_index: 0,
    is_active: true,
  });

  const resetForm = () => {
    setFormData({
      step_number: "",
      title: "",
      description: "",
      order_index: steps?.length || 0,
      is_active: true,
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (step: any) => {
    setFormData({
      step_number: step.step_number,
      title: step.title,
      description: step.description,
      order_index: step.order_index,
      is_active: step.is_active,
    });
    setEditingId(step.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate(
        { id: editingId, data: formData },
        {
          onSuccess: () => {
            toast({ title: "Этап обновлён" });
            resetForm();
          },
          onError: () => toast({ title: "Ошибка", variant: "destructive" }),
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          toast({ title: "Этап добавлен" });
          resetForm();
        },
        onError: () => toast({ title: "Ошибка", variant: "destructive" }),
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Удалить этот этап?")) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast({ title: "Этап удалён" }),
        onError: () => toast({ title: "Ошибка", variant: "destructive" }),
      });
    }
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    if (!steps) return;
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= steps.length) return;

    const reordered = [...steps];
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
          <h3 className="text-lg font-bold">Этапы процесса</h3>
          <p className="text-sm text-muted-foreground">Добавляйте, редактируйте и сортируйте этапы</p>
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
              <h4 className="font-semibold">{editingId ? "Редактировать" : "Новый"} этап</h4>
              <Button type="button" variant="ghost" size="icon" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Номер (01, 02...)</Label>
                <Input
                  value={formData.step_number}
                  onChange={(e) => setFormData({ ...formData, step_number: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Заголовок</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <Label>Описание</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label>Активен</Label>
            </div>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {editingId ? "Сохранить" : "Добавить"}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        {steps?.map((step, index) => (
          <motion.div
            key={step.id}
            layout
            className={`flex items-center gap-3 p-4 rounded-xl border ${step.is_active ? "bg-card" : "bg-muted/30 opacity-60"}`}
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
                disabled={index === (steps?.length || 0) - 1}
              >
                <ArrowDown className="h-3 w-3" />
              </Button>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary">
              {step.step_number}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{step.title}</div>
              <div className="text-sm text-muted-foreground truncate">{step.description}</div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(step)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(step.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </motion.div>
        ))}
        {(!steps || steps.length === 0) && (
          <div className="text-center py-8 text-muted-foreground">Нет этапов</div>
        )}
      </div>
    </Card>
  );
};

export default ProcessStepsEditor;
