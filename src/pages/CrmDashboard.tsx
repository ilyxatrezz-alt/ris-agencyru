import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCrmStats, useClients, useCreateClient, useDeleteClient, useUpdateClient, useAgencyExpenses, useCreateAgencyExpense, useDeleteAgencyExpense, useAllTasks, useUpdateTask, useTeamMembers, useAllFinances } from "@/hooks/useCrmData";
import { useIsSuperAdmin, useMyClientAccess, useSubAdmins, useCreateSubAdmin, useRemoveSubAdmin, useToggleClientAccess } from "@/hooks/useUserRole";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Users, ListTodo, DollarSign, TrendingUp, Plus, Search, Phone, Mail, MessageCircle, Globe,
  ArrowLeft, Trash2, Edit, Eye, Megaphone, Receipt, Calculator, CheckCircle2, Clock, AlertCircle,
  CalendarDays, UserPlus, ArrowRight, Star, ExternalLink, Shield, ShieldCheck
} from "lucide-react";

const SERVICE_OPTIONS = [
  { key: "yandex_direct", label: "Яндекс Директ" },
  { key: "vk_ads", label: "VK ADS" },
  { key: "telegram_ads", label: "Telegram ADS" },
  { key: "website_creation", label: "Создание сайта" },
  { key: "analytics", label: "Аналитика" },
  { key: "smm", label: "SMM" },
] as const;

type Services = {
  yandex_direct?: boolean;
  vk_ads?: boolean;
  telegram_ads?: boolean;
  website_creation?: boolean;
  website_count?: number;
  analytics?: boolean;
  smm?: boolean;
};

const statusLabels: Record<string, string> = {
  active: "Активный",
  paused: "На паузе",
  completed: "Завершён",
  potential: "Потенциальный",
};
const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700 border-green-300",
  paused: "bg-yellow-100 text-yellow-700 border-yellow-300",
  completed: "bg-gray-100 text-gray-600 border-gray-300",
  potential: "bg-amber-100 text-amber-700 border-amber-300",
};

const taskStatusIcons: Record<string, any> = {
  pending: <Clock className="w-4 h-4 text-yellow-500" />,
  in_progress: <AlertCircle className="w-4 h-4 text-blue-500" />,
  done: <CheckCircle2 className="w-4 h-4 text-green-500" />,
};
const priorityLabels: Record<string, string> = { low: "Низкий", medium: "Средний", high: "Высокий" };
const priorityColors: Record<string, string> = { low: "border-gray-300 text-gray-500", medium: "border-yellow-400 text-yellow-600", high: "border-red-400 text-red-600" };

const CrmDashboard = () => {
  const navigate = useNavigate();
  const { data: stats } = useCrmStats();
  const { data: clients, isLoading } = useClients();
  const { data: allTasks } = useAllTasks();
  const { data: team } = useTeamMembers();
  const updateTask = useUpdateTask();
  const createClient = useCreateClient();
  const deleteClient = useDeleteClient();
  const updateClient = useUpdateClient();
  const { data: agencyExpenses } = useAgencyExpenses();
  const { data: allFinances } = useAllFinances();
  const createAgencyExpense = useCreateAgencyExpense();
  const deleteAgencyExpense = useDeleteAgencyExpense();

  // Role-based access
  const { isSuperAdmin, isSubAdmin } = useIsSuperAdmin();
  const { data: myClientAccess } = useMyClientAccess();
  const { data: subAdmins } = useSubAdmins();
  const createSubAdmin = useCreateSubAdmin();
  const removeSubAdmin = useRemoveSubAdmin();
  const toggleClientAccess = useToggleClientAccess();

  const [search, setSearch] = useState("");
  const [potentialSearch, setPotentialSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("date");
  const [taskFilter, setTaskFilter] = useState<string>("active");
  const [taskAssigneeFilter, setTaskAssigneeFilter] = useState<string>("all");
  const [showAdd, setShowAdd] = useState(false);
  const [revenueMonth, setRevenueMonth] = useState<string>("all");
  const [showAddPotential, setShowAddPotential] = useState(false);
  const [editClient, setEditClient] = useState<any>(null);
  const [showAgencyExpForm, setShowAgencyExpForm] = useState(false);
  const [agencyExpForm, setAgencyExpForm] = useState({ title: "", amount: "", description: "", period: "" });
  const [showSubAdminForm, setShowSubAdminForm] = useState(false);
  const [subAdminForm, setSubAdminForm] = useState({ email: "", password: "" });
  const [managingSubAdmin, setManagingSubAdmin] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", contact_person: "", phone: "", email: "", telegram: "", website: "", notes: "", status: "active",
    services: {} as Services,
  });
  const [potentialForm, setPotentialForm] = useState({ name: "", contact_person: "", phone: "", email: "", telegram: "", notes: "" });

  const resetForm = () => setForm({ name: "", contact_person: "", phone: "", email: "", telegram: "", website: "", notes: "", status: "active", services: {} });
  const resetPotentialForm = () => setPotentialForm({ name: "", contact_person: "", phone: "", email: "", telegram: "", notes: "" });

  // Split clients — sub-admins only see assigned clients
  const allOperational = clients?.filter(c => c.status !== "potential") ?? [];
  const operationalClients = isSubAdmin && myClientAccess
    ? allOperational.filter(c => myClientAccess.includes(c.id))
    : allOperational;
  const potentialClients = isSuperAdmin ? (clients?.filter(c => c.status === "potential") ?? []) : [];

  const filtered = operationalClients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.contact_person?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search) ||
      c.email?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortOrder === "alpha") return a.name.localeCompare(b.name, "ru");
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const filteredPotential = potentialClients.filter((c) =>
    c.name.toLowerCase().includes(potentialSearch.toLowerCase()) ||
    c.contact_person?.toLowerCase().includes(potentialSearch.toLowerCase()) ||
    c.phone?.includes(potentialSearch)
  );

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

  const handleSavePotential = async () => {
    if (!potentialForm.name.trim()) { toast({ title: "Введите название", variant: "destructive" }); return; }
    try {
      if (editClient) {
        await updateClient.mutateAsync({ id: editClient.id, ...potentialForm });
        toast({ title: "Клиент обновлён" });
      } else {
        await createClient.mutateAsync({ ...potentialForm, status: "potential" });
        toast({ title: "Потенциальный клиент добавлен" });
      }
      setShowAddPotential(false);
      setEditClient(null);
      resetPotentialForm();
    } catch { toast({ title: "Ошибка", variant: "destructive" }); }
  };

  const handleTransferToActive = async (clientId: string) => {
    await updateClient.mutateAsync({ id: clientId, status: "active" });
    toast({ title: "Клиент переведён в активные! 🎉" });
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

  const openEditPotential = (c: any) => {
    setEditClient(c);
    setPotentialForm({
      name: c.name, contact_person: c.contact_person || "", phone: c.phone || "",
      email: c.email || "", telegram: c.telegram || "", notes: c.notes || "",
    });
    setShowAddPotential(true);
  };

  const toggleService = (key: string) => {
    setForm(prev => ({
      ...prev,
      services: { ...prev.services, [key]: !prev.services[key as keyof Services] },
    }));
  };

  const formatMoney = (n: number) => new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="text-gray-500 hover:text-gray-900 shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#fa3714] flex items-center justify-center shrink-0">
                <span className="text-white font-black text-xs sm:text-sm">Р</span>
              </div>
              <h1 className="text-base sm:text-xl font-bold text-gray-900 truncate">CRM</h1>
            </div>
          </div>
          {isSuperAdmin && (
            <Button onClick={() => navigate("/crm/accounting")} className="bg-[#fa3714] hover:bg-[#e0300f] text-white gap-1 sm:gap-2 shrink-0 text-xs sm:text-sm px-2 sm:px-4">
              <Calculator className="w-4 h-4" /> <span className="hidden sm:inline">Бухгалтерия</span>
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <Tabs defaultValue="operational" className="space-y-6">
          <TabsList className="bg-gray-100 border border-gray-200 w-full sm:w-auto grid grid-cols-2 sm:inline-flex" style={{ gridTemplateColumns: isSuperAdmin ? "1fr 1fr 1fr" : "1fr" }}>
            <TabsTrigger value="operational" className="text-xs sm:text-sm data-[state=active]:bg-[#fa3714] data-[state=active]:text-white gap-1.5">
              <Users className="w-4 h-4" /> <span>Клиенты</span>
              <Badge className="bg-green-100 text-green-700 text-[10px] ml-1">{operationalClients.length}</Badge>
            </TabsTrigger>
            {isSuperAdmin && (
              <TabsTrigger value="potential" className="text-xs sm:text-sm data-[state=active]:bg-amber-500 data-[state=active]:text-white gap-1.5">
                <Star className="w-4 h-4" /> <span>Потенциальные</span>
                <Badge className="bg-amber-100 text-amber-700 text-[10px] ml-1">{potentialClients.length}</Badge>
              </TabsTrigger>
            )}
            {isSuperAdmin && (
              <TabsTrigger value="team" className="text-xs sm:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white gap-1.5">
                <Shield className="w-4 h-4" /> <span>Команда</span>
              </TabsTrigger>
            )}
          </TabsList>

          {/* ═══════════════ OPERATIONAL CLIENTS TAB ═══════════════ */}
          <TabsContent value="operational" className="space-y-6 sm:space-y-8">
            {/* Stats — super admin only */}
            {isSuperAdmin && <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {[
                { icon: Users, label: "Клиенты", value: stats?.totalClients ?? 0, sub: `${stats?.activeClients ?? 0} активных`, color: "bg-blue-500" },
                { icon: ListTodo, label: "Задачи", value: stats?.totalTasks ?? 0, sub: `${stats?.pendingTasks ?? 0} в работе`, color: "bg-purple-500" },
                { icon: DollarSign, label: "Выручка", value: formatMoney(stats?.totalRevenue ?? 0), sub: "всего", color: "bg-green-500" },
                { icon: TrendingUp, label: "Средний чек", value: stats?.totalClients ? formatMoney((stats?.totalRevenue ?? 0) / stats.totalClients) : "—", sub: "на клиента", color: "bg-orange-500" },
              ].map((s, i) => (
                <Card key={i} className="bg-white border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-3 sm:p-5">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${s.color} flex items-center justify-center mb-2 sm:mb-3`}>
                      <s.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{s.value}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{s.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5 sm:mt-1">{s.sub}</p>
                  </CardContent>
                </Card>
              ))}
            </div>}

            {isSuperAdmin && <>
            {/* Earnings per partner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Calculator className="w-5 h-5 text-blue-600" />
                    <p className="text-sm text-blue-700 font-medium">Александр заработал (всего)</p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">{formatMoney(stats?.alexanderTotal ?? 0)}</p>
                </CardContent>
              </Card>
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Calculator className="w-5 h-5 text-purple-600" />
                    <p className="text-sm text-purple-700 font-medium">Илья заработал (всего)</p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-600">{formatMoney(stats?.ilyaTotal ?? 0)}</p>
                </CardContent>
              </Card>
            </div>

            {/* Monthly revenue breakdown */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                    <DollarSign className="w-5 h-5 text-green-500" /> Выручка по месяцам
                  </CardTitle>
                  <Select value={revenueMonth} onValueChange={setRevenueMonth}>
                    <SelectTrigger className="w-full sm:w-[200px] bg-gray-50 border-gray-300 text-gray-900 h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 shadow-lg z-50">
                      <SelectItem value="all">Все месяцы</SelectItem>
                      {(() => {
                        // Collect all unique months from payments
                        const months = new Set<string>();
                        allFinances?.forEach((f: any) => {
                          (f.crm_payments || []).forEach((p: any) => {
                            if (p.payment_date) {
                              const d = new Date(p.payment_date);
                              months.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
                            }
                          });
                          if (f.period) months.add(f.period);
                        });
                        return Array.from(months).sort().reverse().map(m => (
                          <SelectItem key={m} value={m}>{m}</SelectItem>
                        ));
                      })()}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {(() => {
                  // Flatten all payments with their finance/client info
                  const allPayments: { id: string; amount: number; payment_date: string; clientName: string; period: string }[] = [];
                  allFinances?.forEach((f: any) => {
                    (f.crm_payments || []).forEach((p: any) => {
                      allPayments.push({
                        id: p.id,
                        amount: Number(p.amount),
                        payment_date: p.payment_date,
                        clientName: f.crm_clients?.name || "Клиент",
                        period: f.period,
                      });
                    });
                  });
                  // Sort by date descending
                  allPayments.sort((a, b) => new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime());

                  const filtered = allPayments.filter(p => {
                    if (revenueMonth === "all") return true;
                    const d = new Date(p.payment_date);
                    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
                    return key === revenueMonth;
                  });

                  if (!filtered.length) return <p className="text-gray-400 text-center py-6">Записей нет</p>;
                  const total = filtered.reduce((s, p) => s + p.amount, 0);
                  return (
                    <>
                      {filtered.map((p) => (
                        <div key={p.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 sm:px-4 py-3">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {p.clientName}
                              <span className="text-gray-400 font-normal ml-2">· {p.period}</span>
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              <CalendarDays className="w-3 h-3 inline mr-1" />
                              {new Date(p.payment_date).toLocaleDateString("ru")}
                            </p>
                          </div>
                          <span className="text-base sm:text-lg font-bold text-green-600 shrink-0">{formatMoney(p.amount)}</span>
                        </div>
                      ))}
                      <div className="flex justify-end pt-2 border-t border-gray-200">
                        <p className="text-sm text-gray-500">Итого: <span className="font-bold text-green-600">{formatMoney(total)}</span></p>
                      </div>
                    </>
                  );
                })()}
              </CardContent>
            </Card>

            {/* Agency expenses */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                    <Receipt className="w-5 h-5 text-orange-500" /> Прочие счета агентства
                  </CardTitle>
                  <Button size="sm" onClick={() => setShowAgencyExpForm(true)} className="bg-[#fa3714] hover:bg-[#e0300f] text-white">
                    <Plus className="w-4 h-4 mr-1" /> Добавить
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {!agencyExpenses?.length ? (
                  <p className="text-gray-400 text-center py-6">Расходов агентства пока нет</p>
                ) : (
                  <>
                    {agencyExpenses.map((e) => (
                      <div key={e.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 sm:px-4 py-3">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{e.title}</p>
                          <div className="flex gap-3 text-xs text-gray-400 mt-0.5">
                            {e.period && <span>{e.period}</span>}
                            {e.description && <span className="truncate">{e.description}</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-base sm:text-lg font-bold text-orange-600">{formatMoney(Number(e.amount))}</span>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-red-400 hover:text-red-600" onClick={async () => {
                            await deleteAgencyExpense.mutateAsync(e.id);
                            toast({ title: "Расход удалён" });
                          }}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-end pt-2 border-t border-gray-200">
                      <p className="text-sm text-gray-500">Итого: <span className="font-bold text-orange-600">{formatMoney(agencyExpenses.reduce((s, e) => s + Number(e.amount), 0))}</span></p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            </>}

            {/* Global tasks pool */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                    <ListTodo className="w-5 h-5 text-purple-500" /> Все задачи
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[
                        { key: "active", label: "В работе" },
                        { key: "all", label: "Все" },
                        { key: "done", label: "Готовые" },
                      ].map(f => (
                        <Button key={f.key} size="sm" variant={taskFilter === f.key ? "default" : "ghost"}
                          className={taskFilter === f.key ? "bg-[#fa3714] hover:bg-[#e0300f] text-white h-7 text-xs" : "text-gray-500 h-7 text-xs"}
                          onClick={() => setTaskFilter(f.key)}>
                          {f.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Assignee filter row */}
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="text-xs text-gray-400">Ответственный:</span>
                  <div className="flex gap-1 flex-wrap">
                    <Button size="sm" variant={taskAssigneeFilter === "all" ? "default" : "ghost"}
                      className={taskAssigneeFilter === "all" ? "bg-gray-800 hover:bg-gray-700 text-white h-6 text-[11px] px-2" : "text-gray-500 h-6 text-[11px] px-2"}
                      onClick={() => setTaskAssigneeFilter("all")}>
                      Все
                    </Button>
                    {team?.map(m => (
                      <Button key={m.id} size="sm" variant={taskAssigneeFilter === m.id ? "default" : "ghost"}
                        className={taskAssigneeFilter === m.id ? "bg-blue-600 hover:bg-blue-700 text-white h-6 text-[11px] px-2" : "text-gray-500 h-6 text-[11px] px-2"}
                        onClick={() => setTaskAssigneeFilter(m.id)}>
                        {m.name}
                      </Button>
                    ))}
                  </div>
                  <Button size="sm" variant="ghost"
                    className="text-[#fa3714] hover:text-[#e0300f] h-6 text-[11px] px-2 ml-auto gap-1"
                    onClick={() => navigate(`/crm/tasks?assignee=${taskAssigneeFilter}&status=${taskFilter}`)}>
                    <ExternalLink className="w-3 h-3" /> Открыть полностью
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {(() => {
                  const tasksFiltered = allTasks?.filter(t => {
                    if (taskFilter === "active") return t.status === "pending" || t.status === "in_progress";
                    if (taskFilter === "done") return t.status === "done";
                    return true;
                  })?.filter(t => {
                    if (taskAssigneeFilter === "all") return true;
                    return t.assignee_id === taskAssigneeFilter;
                  });
                  if (!tasksFiltered?.length) return <p className="text-gray-400 text-center py-6">Задач нет</p>;
                  return tasksFiltered.slice(0, 10).map((t: any) => (
                    <div key={t.id} className="flex items-start gap-3 bg-gray-50 rounded-lg px-3 py-3 sm:px-4">
                      <button className="mt-0.5 shrink-0" onClick={async () => {
                        const next = t.status === "done" ? "pending" : t.status === "pending" ? "in_progress" : "done";
                        await updateTask.mutateAsync({ id: t.id, client_id: t.client_id, status: next });
                      }}>
                        {taskStatusIcons[t.status] || taskStatusIcons.pending}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${t.status === "done" ? "line-through text-gray-400" : "text-gray-900"}`}>{t.title}</p>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          <Badge variant="outline" className="border-[#fa3714]/30 text-[#fa3714] text-xs cursor-pointer"
                            onClick={() => navigate(`/crm/${t.client_id}`)}>
                            {t.crm_clients?.name || "Клиент"}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${priorityColors[t.priority]}`}>
                            {priorityLabels[t.priority] || t.priority}
                          </Badge>
                          {t.crm_team_members?.name && (
                            <Badge variant="outline" className="border-blue-300 text-blue-600 text-xs">
                              <Users className="w-3 h-3 mr-1" />{t.crm_team_members.name}
                            </Badge>
                          )}
                          {t.due_date && (
                            <Badge variant="outline" className="border-gray-300 text-gray-500 text-xs">
                              <CalendarDays className="w-3 h-3 mr-1" />{new Date(t.due_date).toLocaleDateString("ru")}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ));
                })()}
                {(() => {
                  const total = allTasks?.filter(t => {
                    if (taskFilter === "active") return t.status === "pending" || t.status === "in_progress";
                    if (taskFilter === "done") return t.status === "done";
                    return true;
                  })?.filter(t => taskAssigneeFilter === "all" || t.assignee_id === taskAssigneeFilter)?.length ?? 0;
                  if (total > 10) return (
                    <Button variant="ghost" className="w-full text-[#fa3714] hover:text-[#e0300f] text-sm"
                      onClick={() => navigate(`/crm/tasks?assignee=${taskAssigneeFilter}&status=${taskFilter}`)}>
                      Показать все {total} задач →
                    </Button>
                  );
                  return null;
                })()}
              </CardContent>
            </Card>

            {/* Filters + add */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Поиск по имени, телефону, email..." value={search} onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[140px] bg-white border-gray-300 text-gray-900">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 shadow-lg z-50">
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="active">Активные</SelectItem>
                  <SelectItem value="paused">На паузе</SelectItem>
                  <SelectItem value="completed">Завершённые</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-full sm:w-[160px] bg-white border-gray-300 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 shadow-lg z-50">
                  <SelectItem value="date">По дате</SelectItem>
                  <SelectItem value="alpha">По алфавиту</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => { resetForm(); setEditClient(null); setShowAdd(true); }} className="bg-[#fa3714] hover:bg-[#e0300f] text-white shrink-0">
                <Plus className="w-4 h-4 mr-2" /> Добавить клиента
              </Button>
            </div>

            {/* Client list */}
            {isLoading ? (
              <div className="text-center py-20 text-gray-400">Загрузка...</div>
            ) : !filtered?.length ? (
              <div className="text-center py-20 text-gray-400">Клиентов пока нет</div>
            ) : (
              <div className="grid gap-4">
                {filtered.map((c) => (
                  <Card key={c.id} className="bg-white border-gray-200 hover:shadow-md transition-all group">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">{c.name}</h3>
                            <Badge variant="outline" className={statusColors[c.status] || ""}>
                              {statusLabels[c.status] || c.status}
                            </Badge>
                          </div>
                          {c.contact_person && (
                            <div className="text-sm text-gray-500 mb-2">
                              {c.contact_person.split("\n").filter(Boolean).map((p, i) => (
                                <span key={i}>{i > 0 && " · "}{p}</span>
                              ))}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-3 sm:gap-4 text-sm text-gray-500">
                            {c.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{c.phone}</span>}
                            {c.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{c.email}</span>}
                            {c.telegram && <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{c.telegram}</span>}
                            {c.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{c.website}</span>}
                          </div>
                          {(() => {
                            const svc = (c as any).services as Services | undefined;
                            if (!svc) return null;
                            const active = SERVICE_OPTIONS.filter(s => svc[s.key]);
                            if (!active.length) return null;
                            return (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {active.map(s => (
                                  <Badge key={s.key} variant="outline" className="border-[#fa3714]/30 text-[#fa3714] text-xs">
                                    <Megaphone className="w-3 h-3 mr-1" />{s.label}
                                    {s.key === "website_creation" && svc.website_count ? ` (${svc.website_count} шт.)` : ""}
                                  </Badge>
                                ))}
                              </div>
                            );
                          })()}
                        </div>
                        <div className="flex items-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="ghost" onClick={() => navigate(`/crm/${c.id}`)} className="text-[#fa3714] hover:text-[#e0300f]">
                            <Eye className="w-4 h-4 mr-1" /> Открыть
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => openEdit(c)} className="text-gray-500 hover:text-gray-900">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={async () => {
                            if (confirm("Удалить клиента?")) {
                              await deleteClient.mutateAsync(c.id);
                              toast({ title: "Клиент удалён" });
                            }
                          }} className="text-red-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ═══════════════ POTENTIAL CLIENTS TAB ═══════════════ */}
          <TabsContent value="potential" className="space-y-6">
            {/* Info banner */}
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-800">Потенциальные клиенты — воронка продаж</p>
                  <p className="text-xs text-amber-600 mt-0.5">Добавляйте думающих клиентов сюда. Когда они будут готовы — переведите в основную CRM одной кнопкой.</p>
                </div>
                <Button onClick={() => { resetPotentialForm(); setEditClient(null); setShowAddPotential(true); }} className="bg-amber-500 hover:bg-amber-600 text-white shrink-0">
                  <UserPlus className="w-4 h-4 mr-2" /> Добавить
                </Button>
              </CardContent>
            </Card>

            {/* Search */}
            {potentialClients.length > 0 && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Поиск потенциального клиента..." value={potentialSearch} onChange={(e) => setPotentialSearch(e.target.value)}
                  className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400" />
              </div>
            )}

            {/* Potential client list */}
            {!filteredPotential.length ? (
              <div className="text-center py-16">
                <Star className="w-12 h-12 text-amber-200 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">Потенциальных клиентов пока нет</p>
                <Button onClick={() => { resetPotentialForm(); setEditClient(null); setShowAddPotential(true); }} className="bg-amber-500 hover:bg-amber-600 text-white">
                  <UserPlus className="w-4 h-4 mr-2" /> Добавить первого
                </Button>
              </div>
            ) : (
              <div className="grid gap-3">
                {filteredPotential.map((c) => (
                  <Card key={c.id} className="bg-white border-gray-200 hover:shadow-md transition-all border-l-4 border-l-amber-400">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Star className="w-4 h-4 text-amber-500 shrink-0" />
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{c.name}</h3>
                          </div>
                          {c.contact_person && <p className="text-sm text-gray-500 mb-1">Контакт: {c.contact_person}</p>}
                          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                            {c.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{c.phone}</span>}
                            {c.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{c.email}</span>}
                            {c.telegram && <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{c.telegram}</span>}
                          </div>
                          {c.notes && <p className="text-xs text-gray-400 mt-2 line-clamp-2">{c.notes}</p>}
                          <p className="text-xs text-gray-300 mt-1.5">Добавлен: {new Date(c.created_at).toLocaleDateString("ru")}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Button size="sm" onClick={() => handleTransferToActive(c.id)}
                            className="bg-green-500 hover:bg-green-600 text-white gap-1.5">
                            <ArrowRight className="w-4 h-4" /> <span className="hidden sm:inline">В клиенты</span>
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => openEditPotential(c)} className="text-gray-500 hover:text-gray-900">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={async () => {
                            if (confirm("Удалить?")) {
                              await deleteClient.mutateAsync(c.id);
                              toast({ title: "Удалён" });
                            }
                          }} className="text-red-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ═══════════════ TEAM MANAGEMENT TAB (super_admin only) ═══════════════ */}
          {isSuperAdmin && (
            <TabsContent value="team" className="space-y-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-800">Управление суб-админами</p>
                    <p className="text-xs text-blue-600 mt-0.5">Суб-админы видят только задачи по назначенным проектам. Финансы и бюджеты им недоступны.</p>
                  </div>
                  <Button onClick={() => { setSubAdminForm({ email: "", password: "" }); setShowSubAdminForm(true); }} className="bg-blue-600 hover:bg-blue-700 text-white shrink-0">
                    <UserPlus className="w-4 h-4 mr-2" /> Добавить суб-админа
                  </Button>
                </CardContent>
              </Card>

              {!subAdmins?.length ? (
                <div className="text-center py-16">
                  <Shield className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">Суб-админов пока нет</p>
                  <Button onClick={() => { setSubAdminForm({ email: "", password: "" }); setShowSubAdminForm(true); }} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <UserPlus className="w-4 h-4 mr-2" /> Добавить первого
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {subAdmins.map((sa) => (
                    <Card key={sa.user_id} className="bg-white border-gray-200">
                      <CardContent className="p-4 sm:p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                              <Shield className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{sa.email}</p>
                              <p className="text-xs text-gray-400">Доступ к {sa.client_ids.length} клиентам</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setManagingSubAdmin(managingSubAdmin === sa.user_id ? null : sa.user_id)}
                              className="text-blue-600 border-blue-300 hover:bg-blue-50">
                              <Edit className="w-3.5 h-3.5 mr-1" /> Настроить доступ
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-600"
                              onClick={async () => {
                                if (confirm(`Удалить суб-админа ${sa.email}?`)) {
                                  try {
                                    await removeSubAdmin.mutateAsync(sa.user_id);
                                    toast({ title: "Суб-админ удалён" });
                                  } catch (e: any) {
                                    toast({ title: "Ошибка", description: e.message, variant: "destructive" });
                                  }
                                }
                              }}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Client access management */}
                        {managingSubAdmin === sa.user_id && (
                          <div className="border-t border-gray-100 pt-3 mt-2">
                            <p className="text-sm font-medium text-gray-700 mb-3">Доступ к клиентам:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {allOperational.map((c) => (
                                <label key={c.id} className="flex items-center gap-2.5 cursor-pointer bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200 hover:border-blue-300 transition-colors">
                                  <Checkbox
                                    checked={sa.client_ids.includes(c.id)}
                                    onCheckedChange={async (checked) => {
                                      try {
                                        await toggleClientAccess.mutateAsync({ userId: sa.user_id, clientId: c.id, grant: !!checked });
                                      } catch (e: any) {
                                        toast({ title: "Ошибка", description: e.message, variant: "destructive" });
                                      }
                                    }}
                                    className="border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                  />
                                  <span className="text-sm text-gray-700 truncate">{c.name}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          )}
        </Tabs>
      </main>

      {/* ═══ Add/Edit operational client dialog ═══ */}
      <Dialog open={showAdd} onOpenChange={(o) => { if (!o) { setShowAdd(false); setEditClient(null); } }}>
        <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editClient ? "Редактировать клиента" : "Новый клиент"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div><Label>Название / Компания *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            <div>
              <Label>Контактные лица</Label>
              {(() => {
                const contacts = (form.contact_person || "").split("\n");
                // Show fields only if there's content or user explicitly added
                const visibleContacts = contacts.length === 1 && contacts[0] === "" ? [] : contacts;
                return visibleContacts.map((person, idx) => (
                  <div key={idx} className="flex items-center gap-2 mt-1">
                    <Input value={person} onChange={(e) => {
                      const lines = [...visibleContacts];
                      lines[idx] = e.target.value;
                      setForm({ ...form, contact_person: lines.join("\n") });
                    }} className="bg-gray-50 border-gray-300 text-gray-900" placeholder="Имя, должность..." />
                    <Button type="button" size="icon" variant="ghost" className="h-8 w-8 text-red-400 shrink-0" onClick={() => {
                      const lines = [...visibleContacts];
                      lines.splice(idx, 1);
                      setForm({ ...form, contact_person: lines.join("\n") });
                    }}><Trash2 className="w-3 h-3" /></Button>
                  </div>
                ));
              })()}
              <Button type="button" size="sm" variant="ghost" className="text-[#fa3714] mt-1 h-7 text-xs" onClick={() => {
                const existing = (form.contact_person || "").split("\n").filter(Boolean);
                setForm({ ...form, contact_person: [...existing, ""].join("\n") });
              }}><Plus className="w-3 h-3 mr-1" /> Добавить контакт</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><Label>Телефон</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
              <div><Label>Email</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><Label>Telegram</Label><Input value={form.telegram} onChange={(e) => setForm({ ...form, telegram: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
              <div><Label>Сайт</Label><Input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            </div>
            <div>
              <Label>Статус</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900 mt-1"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-white border-gray-200 shadow-lg z-50">
                  <SelectItem value="active">Активный</SelectItem>
                  <SelectItem value="paused">На паузе</SelectItem>
                  <SelectItem value="completed">Завершён</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-3 block">Услуги</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICE_OPTIONS.map(s => (
                  <label key={s.key} className="flex items-center gap-2 cursor-pointer bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200 hover:border-[#fa3714]/40 transition-colors">
                    <Checkbox
                      checked={!!form.services[s.key as keyof Services]}
                      onCheckedChange={() => toggleService(s.key)}
                      className="border-gray-400 data-[state=checked]:bg-[#fa3714] data-[state=checked]:border-[#fa3714]"
                    />
                    <span className="text-sm text-gray-700">{s.label}</span>
                  </label>
                ))}
              </div>
              {form.services.website_creation && (
                <div className="mt-3">
                  <Label>Количество сайтов</Label>
                  <Input type="number" min={1} value={form.services.website_count || ""}
                    onChange={(e) => setForm(prev => ({ ...prev, services: { ...prev.services, website_count: Number(e.target.value) || undefined } }))}
                    className="bg-gray-50 border-gray-300 text-gray-900 mt-1 w-32" placeholder="1" />
                </div>
              )}
            </div>
            <div><Label>Заметки</Label><Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" rows={3} /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => { setShowAdd(false); setEditClient(null); }} className="text-gray-500">Отмена</Button>
            <Button onClick={handleSave} className="bg-[#fa3714] hover:bg-[#e0300f] text-white" disabled={createClient.isPending || updateClient.isPending}>
              {editClient ? "Сохранить" : "Создать"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══ Add/Edit potential client dialog ═══ */}
      <Dialog open={showAddPotential} onOpenChange={(o) => { if (!o) { setShowAddPotential(false); setEditClient(null); } }}>
        <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              {editClient ? "Редактировать" : "Новый потенциальный клиент"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div><Label>Название / Компания *</Label><Input value={potentialForm.name} onChange={(e) => setPotentialForm({ ...potentialForm, name: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            <div><Label>Контактное лицо</Label><Input value={potentialForm.contact_person} onChange={(e) => setPotentialForm({ ...potentialForm, contact_person: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><Label>Телефон</Label><Input value={potentialForm.phone} onChange={(e) => setPotentialForm({ ...potentialForm, phone: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
              <div><Label>Email</Label><Input value={potentialForm.email} onChange={(e) => setPotentialForm({ ...potentialForm, email: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            </div>
            <div><Label>Telegram</Label><Input value={potentialForm.telegram} onChange={(e) => setPotentialForm({ ...potentialForm, telegram: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            <div><Label>Заметки / Комментарий</Label><Textarea value={potentialForm.notes} onChange={(e) => setPotentialForm({ ...potentialForm, notes: e.target.value })}
              className="bg-gray-50 border-gray-300 text-gray-900 mt-1" rows={3} placeholder="Что обсуждали, что интересует, когда перезвонить..." /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => { setShowAddPotential(false); setEditClient(null); }} className="text-gray-500">Отмена</Button>
            <Button onClick={handleSavePotential} className="bg-amber-500 hover:bg-amber-600 text-white" disabled={createClient.isPending || updateClient.isPending}>
              {editClient ? "Сохранить" : "Добавить"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Agency expense dialog */}
      <Dialog open={showAgencyExpForm} onOpenChange={setShowAgencyExpForm}>
        <DialogContent className="bg-white border-gray-200 text-gray-900">
          <DialogHeader><DialogTitle>Новый расход агентства</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div><Label>Название *</Label><Input value={agencyExpForm.title} onChange={(e) => setAgencyExpForm({ ...agencyExpForm, title: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Сумма (₽) *</Label><Input type="number" value={agencyExpForm.amount} onChange={(e) => setAgencyExpForm({ ...agencyExpForm, amount: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
              <div><Label>Период</Label><Input placeholder="Февраль 2026" value={agencyExpForm.period} onChange={(e) => setAgencyExpForm({ ...agencyExpForm, period: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            </div>
            <div><Label>Описание</Label><Input value={agencyExpForm.description} onChange={(e) => setAgencyExpForm({ ...agencyExpForm, description: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowAgencyExpForm(false)} className="text-gray-500">Отмена</Button>
            <Button onClick={async () => {
              if (!agencyExpForm.title || !agencyExpForm.amount) return;
              await createAgencyExpense.mutateAsync({ title: agencyExpForm.title, amount: Number(agencyExpForm.amount), description: agencyExpForm.description || undefined, period: agencyExpForm.period || undefined });
              setShowAgencyExpForm(false);
              setAgencyExpForm({ title: "", amount: "", description: "", period: "" });
              toast({ title: "Расход добавлен" });
            }} className="bg-[#fa3714] hover:bg-[#e0300f] text-white">Добавить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══ Add sub-admin dialog ═══ */}
      <Dialog open={showSubAdminForm} onOpenChange={setShowSubAdminForm}>
        <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Новый суб-админ
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div>
              <Label>Email *</Label>
              <Input type="email" value={subAdminForm.email} onChange={(e) => setSubAdminForm({ ...subAdminForm, email: e.target.value })}
                className="bg-gray-50 border-gray-300 text-gray-900 mt-1" placeholder="admin@example.com" />
            </div>
            <div>
              <Label>Пароль *</Label>
              <Input type="password" value={subAdminForm.password} onChange={(e) => setSubAdminForm({ ...subAdminForm, password: e.target.value })}
                className="bg-gray-50 border-gray-300 text-gray-900 mt-1" placeholder="Минимум 6 символов" />
            </div>
            <p className="text-xs text-gray-400">Суб-админ сможет входить по этим данным и видеть только задачи назначенных клиентов. Финансы ему недоступны.</p>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowSubAdminForm(false)} className="text-gray-500">Отмена</Button>
            <Button onClick={async () => {
              if (!subAdminForm.email || !subAdminForm.password) {
                toast({ title: "Заполните все поля", variant: "destructive" });
                return;
              }
              try {
                await createSubAdmin.mutateAsync({ email: subAdminForm.email, password: subAdminForm.password });
                setShowSubAdminForm(false);
                setSubAdminForm({ email: "", password: "" });
                toast({ title: "Суб-админ создан! 🎉" });
              } catch (e: any) {
                toast({ title: "Ошибка", description: e.message, variant: "destructive" });
              }
            }} className="bg-blue-600 hover:bg-blue-700 text-white" disabled={createSubAdmin.isPending}>
              {createSubAdmin.isPending ? "Создаю..." : "Создать"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CrmDashboard;
