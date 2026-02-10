import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCrmStats, useClients, useCreateClient, useDeleteClient, useUpdateClient } from "@/hooks/useCrmData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Users, ListTodo, DollarSign, TrendingUp, Plus, Search, Phone, Mail, MessageCircle, Globe,
  ArrowLeft, Trash2, Edit, Eye, Monitor, Megaphone
} from "lucide-react";

const SERVICE_OPTIONS = [
  { key: "yandex_direct", label: "Яндекс Директ" },
  { key: "vk_ads", label: "ВК реклама" },
  { key: "telegram_ads", label: "Телеграм реклама" },
  { key: "website_creation", label: "Создание сайта" },
] as const;

type Services = {
  yandex_direct?: boolean;
  vk_ads?: boolean;
  telegram_ads?: boolean;
  website_creation?: boolean;
  website_count?: number;
};

const statusLabels: Record<string, string> = {
  active: "Активный",
  paused: "На паузе",
  completed: "Завершён",
};
const statusColors: Record<string, string> = {
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  paused: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  completed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

const CrmDashboard = () => {
  const navigate = useNavigate();
  const { data: stats } = useCrmStats();
  const { data: clients, isLoading } = useClients();
  const createClient = useCreateClient();
  const deleteClient = useDeleteClient();
  const updateClient = useUpdateClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showAdd, setShowAdd] = useState(false);
  const [editClient, setEditClient] = useState<any>(null);
  const [form, setForm] = useState({
    name: "", contact_person: "", phone: "", email: "", telegram: "", website: "", notes: "", status: "active",
    services: {} as Services,
  });

  const resetForm = () => setForm({ name: "", contact_person: "", phone: "", email: "", telegram: "", website: "", notes: "", status: "active", services: {} });

  const filtered = clients?.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.contact_person?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search) ||
      c.email?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSave = async () => {
    if (!form.name.trim()) { toast({ title: "Введите название клиента", variant: "destructive" }); return; }
    try {
      if (editClient) {
        await updateClient.mutateAsync({ id: editClient.id, ...form });
        toast({ title: "Клиент обновлён" });
      } else {
        await createClient.mutateAsync(form);
        toast({ title: "Клиент добавлен" });
      }
      setShowAdd(false);
      setEditClient(null);
      resetForm();
    } catch { toast({ title: "Ошибка", variant: "destructive" }); }
  };

  const openEdit = (c: any) => {
    setEditClient(c);
    setForm({
      name: c.name, contact_person: c.contact_person || "", phone: c.phone || "",
      email: c.email || "", telegram: c.telegram || "", website: c.website || "",
      notes: c.notes || "", status: c.status || "active",
      services: (c.services as Services) || {},
    });
    setShowAdd(true);
  };

  const toggleService = (key: string) => {
    setForm(prev => ({
      ...prev,
      services: { ...prev.services, [key]: !prev.services[key as keyof Services] },
    }));
  };

  const formatMoney = (n: number) => new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0d0d14]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")} className="text-white/60 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CRM — Управление клиентами
            </h1>
          </div>
          <Button onClick={() => { resetForm(); setEditClient(null); setShowAdd(true); }} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" /> Добавить клиента
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Клиенты", value: stats?.totalClients ?? 0, sub: `${stats?.activeClients ?? 0} активных`, color: "from-blue-500 to-cyan-500" },
            { icon: ListTodo, label: "Задачи", value: stats?.totalTasks ?? 0, sub: `${stats?.pendingTasks ?? 0} в работе`, color: "from-purple-500 to-pink-500" },
            { icon: DollarSign, label: "Выручка", value: formatMoney(stats?.totalRevenue ?? 0), sub: "всего", color: "from-green-500 to-emerald-500" },
            { icon: TrendingUp, label: "Средний чек", value: stats?.totalClients ? formatMoney((stats?.totalRevenue ?? 0) / stats.totalClients) : "—", sub: "на клиента", color: "from-orange-500 to-yellow-500" },
          ].map((s, i) => (
            <Card key={i} className="bg-white/5 border-white/10 hover:bg-white/[0.07] transition-colors">
              <CardContent className="p-5">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-sm text-white/40">{s.label}</p>
                <p className="text-xs text-white/30 mt-1">{s.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              placeholder="Поиск по имени, телефону, email..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a2e] border-white/10">
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="active">Активные</SelectItem>
              <SelectItem value="paused">На паузе</SelectItem>
              <SelectItem value="completed">Завершённые</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Client list */}
        {isLoading ? (
          <div className="text-center py-20 text-white/40">Загрузка...</div>
        ) : !filtered?.length ? (
          <div className="text-center py-20 text-white/40">Клиентов пока нет</div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((c) => (
              <Card key={c.id} className="bg-white/5 border-white/10 hover:bg-white/[0.07] transition-all group">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white truncate">{c.name}</h3>
                        <Badge variant="outline" className={statusColors[c.status] || ""}>
                          {statusLabels[c.status] || c.status}
                        </Badge>
                      </div>
                      {c.contact_person && <p className="text-sm text-white/50 mb-2">Контакт: {c.contact_person}</p>}
                      <div className="flex flex-wrap gap-4 text-sm text-white/40">
                        {c.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{c.phone}</span>}
                        {c.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{c.email}</span>}
                        {c.telegram && <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{c.telegram}</span>}
                        {c.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{c.website}</span>}
                      </div>
                      {/* Services badges */}
                      {(() => {
                        const svc = (c as any).services as Services | undefined;
                        if (!svc) return null;
                        const active = SERVICE_OPTIONS.filter(s => svc[s.key]);
                        if (!active.length) return null;
                        return (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {active.map(s => (
                              <Badge key={s.key} variant="outline" className="border-blue-500/30 text-blue-300 text-xs">
                                <Megaphone className="w-3 h-3 mr-1" />{s.label}
                                {s.key === "website_creation" && svc.website_count ? ` (${svc.website_count} шт.)` : ""}
                              </Badge>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" onClick={() => navigate(`/crm/${c.id}`)} className="text-blue-400 hover:text-blue-300">
                        <Eye className="w-4 h-4 mr-1" /> Открыть
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => openEdit(c)} className="text-white/60 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={async () => {
                        if (confirm("Удалить клиента?")) {
                          await deleteClient.mutateAsync(c.id);
                          toast({ title: "Клиент удалён" });
                        }
                      }} className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Add/Edit dialog */}
      <Dialog open={showAdd} onOpenChange={(o) => { if (!o) { setShowAdd(false); setEditClient(null); } }}>
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>{editClient ? "Редактировать клиента" : "Новый клиент"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div><Label>Название / Компания *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
            <div><Label>Контактное лицо</Label><Input value={form.contact_person} onChange={(e) => setForm({ ...form, contact_person: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Телефон</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
              <div><Label>Email</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Telegram</Label><Input value={form.telegram} onChange={(e) => setForm({ ...form, telegram: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
              <div><Label>Сайт</Label><Input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
            </div>
            <div>
              <Label>Статус</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white mt-1"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-[#1a1a2e] border-white/10">
                  <SelectItem value="active">Активный</SelectItem>
                  <SelectItem value="paused">На паузе</SelectItem>
                  <SelectItem value="completed">Завершён</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Services */}
            <div>
              <Label className="mb-3 block">Услуги</Label>
              <div className="grid grid-cols-2 gap-3">
                {SERVICE_OPTIONS.map(s => (
                  <label key={s.key} className="flex items-center gap-2 cursor-pointer bg-white/5 rounded-lg px-3 py-2.5 border border-white/10 hover:border-white/20 transition-colors">
                    <Checkbox
                      checked={!!form.services[s.key as keyof Services]}
                      onCheckedChange={() => toggleService(s.key)}
                      className="border-white/30 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <span className="text-sm text-white/80">{s.label}</span>
                  </label>
                ))}
              </div>
              {form.services.website_creation && (
                <div className="mt-3">
                  <Label>Количество сайтов</Label>
                  <Input
                    type="number" min={1}
                    value={form.services.website_count || ""}
                    onChange={(e) => setForm(prev => ({ ...prev, services: { ...prev.services, website_count: Number(e.target.value) || undefined } }))}
                    className="bg-white/5 border-white/10 text-white mt-1 w-32"
                    placeholder="1"
                  />
                </div>
              )}
            </div>
            <div><Label>Заметки</Label><Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" rows={3} /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => { setShowAdd(false); setEditClient(null); }} className="text-white/60">Отмена</Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700" disabled={createClient.isPending || updateClient.isPending}>
              {editClient ? "Сохранить" : "Создать"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CrmDashboard;
