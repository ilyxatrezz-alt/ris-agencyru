import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSettingsByCategory, useUpdateMultipleSettings } from "@/hooks/useSiteSettings";
import { Save, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import ImageUpload from "./ImageUpload";

interface SettingsEditorProps {
  category: string;
  title: string;
  description?: string;
}

const SettingsEditor = ({ category, title, description }: SettingsEditorProps) => {
  const { settings, isLoading } = useSettingsByCategory(category);
  const updateSettings = useUpdateMultipleSettings();
  const { toast } = useToast();
  
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (settings.length > 0) {
      const values: Record<string, string> = {};
      settings.forEach((s) => {
        values[s.key] = s.value || "";
      });
      setFormValues(values);
      setHasChanges(false);
    }
  }, [settings]);

  const handleChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    const updates = Object.entries(formValues).map(([key, value]) => ({
      key,
      value,
    }));

    try {
      await updateSettings.mutateAsync(updates);
      toast({
        title: "Сохранено",
        description: "Настройки успешно обновлены",
      });
      setHasChanges(false);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить настройки",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div
      className="bg-card p-6 md:p-8 rounded-2xl shadow-card border border-border/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <Button
          onClick={handleSave}
          disabled={!hasChanges || updateSettings.isPending}
          className="gap-2"
          variant={hasChanges ? "cta" : "outline"}
        >
          {updateSettings.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Сохранить
        </Button>
      </div>

      <div className="grid gap-6">
        {settings.map((setting) => (
          <div key={setting.key} className="space-y-2">
            <Label htmlFor={setting.key} className="flex items-center gap-2">
              {setting.label}
              {setting.description && (
                <span className="text-xs text-muted-foreground font-normal">
                  — {setting.description}
                </span>
              )}
            </Label>
            {setting.type === "image" ? (
              <ImageUpload
                value={formValues[setting.key] || ""}
                onChange={(value) => handleChange(setting.key, value)}
              />
            ) : setting.type === "text" && (formValues[setting.key]?.length || 0) > 100 ? (
              <Textarea
                id={setting.key}
                value={formValues[setting.key] || ""}
                onChange={(e) => handleChange(setting.key, e.target.value)}
                rows={3}
                className="resize-none"
              />
            ) : (
              <Input
                id={setting.key}
                type={setting.type === "number" ? "number" : "text"}
                value={formValues[setting.key] || ""}
                onChange={(e) => handleChange(setting.key, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SettingsEditor;
