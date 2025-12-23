import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAdminReviews, useReviewsMutations } from "@/hooks/useReviews";
import { Plus, Trash2, Pencil, X, ArrowUp, ArrowDown, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ReviewsEditor = () => {
  const { toast } = useToast();
  const { data: reviews, isLoading } = useAdminReviews();
  const { createMutation, updateMutation, deleteMutation, reorderMutation } = useReviewsMutations();
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    author: "",
    position: "",
    text: "",
    rating: 5,
    order_index: 0,
    is_active: true,
  });

  const resetForm = () => {
    setFormData({
      author: "",
      position: "",
      text: "",
      rating: 5,
      order_index: reviews?.length || 0,
      is_active: true,
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (review: any) => {
    setFormData({
      author: review.author,
      position: review.position,
      text: review.text,
      rating: review.rating,
      order_index: review.order_index,
      is_active: review.is_active,
    });
    setEditingId(review.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate(
        { id: editingId, data: formData },
        {
          onSuccess: () => {
            toast({ title: "Отзыв обновлён" });
            resetForm();
          },
          onError: () => toast({ title: "Ошибка", variant: "destructive" }),
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          toast({ title: "Отзыв добавлен" });
          resetForm();
        },
        onError: () => toast({ title: "Ошибка", variant: "destructive" }),
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Удалить этот отзыв?")) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast({ title: "Отзыв удалён" }),
        onError: () => toast({ title: "Ошибка", variant: "destructive" }),
      });
    }
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    if (!reviews) return;
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= reviews.length) return;

    const reordered = [...reviews];
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
          <h3 className="text-lg font-bold">Отзывы клиентов</h3>
          <p className="text-sm text-muted-foreground">Управление отзывами на главной</p>
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
              <h4 className="font-semibold">{editingId ? "Редактировать" : "Новый"} отзыв</h4>
              <Button type="button" variant="ghost" size="icon" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Имя автора</Label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Должность / Компания</Label>
                <Input
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Владелец стоматологии"
                  required
                />
              </div>
            </div>
            <div>
              <Label>Текст отзыва</Label>
              <Textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                rows={4}
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <div>
                <Label>Рейтинг</Label>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1"
                    >
                      <Star
                        className={`h-5 w-5 ${star <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label>Активен</Label>
              </div>
            </div>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {editingId ? "Сохранить" : "Добавить"}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        {reviews?.map((review, index) => (
          <motion.div
            key={review.id}
            layout
            className={`flex items-start gap-3 p-4 rounded-xl border ${review.is_active ? "bg-card" : "bg-muted/30 opacity-60"}`}
          >
            <div className="flex flex-col gap-1 pt-2">
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
                disabled={index === (reviews?.length || 0) - 1}
              >
                <ArrowDown className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{review.author}</span>
                <span className="text-sm text-muted-foreground">• {review.position}</span>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3 w-3 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{review.text}</p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(review)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(review.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </motion.div>
        ))}
        {(!reviews || reviews.length === 0) && (
          <div className="text-center py-8 text-muted-foreground">Нет отзывов</div>
        )}
      </div>
    </Card>
  );
};

export default ReviewsEditor;
