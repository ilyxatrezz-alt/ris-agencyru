import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useClient, useClientTasks, useCreateTask, useUpdateTask, useDeleteTask,
  useClientFinances, useCreateFinance, useUpdateFinance, useDeleteFinance,
  useCreateContractor, useDeleteContractor,
  useClientExpenses, useCreateExpense, useDeleteExpense,
  useTeamMembers, useCreatePayment, useDeletePayment,
} from "@/hooks/useCrmData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  ArrowLeft, Plus, Trash2, CheckCircle2, Clock, AlertCircle, DollarSign,
  Users, CalendarDays, ChevronDown, ChevronUp, Calculator, Edit
} from "lucide-react";

const priorityColors: Record<string, string> = {
  low: "border-gray-300 text-gray-500",
  medium: "border-yellow-400 text-yellow-600",
  high: "border-red-400 text-red-600",
};
const taskStatusIcons: Record<string, any> = {
  pending: <Clock className="w-4 h-4 text-yellow-500" />,
  in_progress: <AlertCircle className="w-4 h-4 text-blue-500" />,
  done: <CheckCircle2 className="w-4 h-4 text-green-500" />,
};

const CrmClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: client, isLoading } = useClient(id!);
  const { data: tasks } = useClientTasks(id!);
  const { data: finances } = useClientFinances(id!);
  const { data: expenses } = useClientExpenses(id!);
  const { data: team } = useTeamMembers();

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const createFinance = useCreateFinance();
  const deleteFinance = useDeleteFinance();
  const updateFinance = useUpdateFinance();
  const createContractor = useCreateContractor();
  const deleteContractor = useDeleteContractor();
  const createExpense = useCreateExpense();
  const deleteExpense = useDeleteExpense();
  const createPayment = useCreatePayment();
  const deletePayment = useDeletePayment();

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskForm, setTaskForm] = useState({ title: "", description: "", assignee_id: "", priority: "medium", due_date: "", status: "pending" });
  const [showFinForm, setShowFinForm] = useState(false);
  const [finForm, setFinForm] = useState({ period: "", alexander_percent: "50", ilya_percent: "50", cash_out_percent: "", notes: "", first_amount: "", first_month: "", first_day: "" });
  const [editFinId, setEditFinId] = useState<string | null>(null);
  const [editFinForm, setEditFinForm] = useState({ period: "", alexander_percent: "", ilya_percent: "", cash_out_percent: "", notes: "" });
  const [showConForm, setShowConForm] = useState<string | null>(null);
  const [conForm, setConForm] = useState({ name: "", amount: "", description: "" });
  const [showExpForm, setShowExpForm] = useState(false);
  const [expForm, setExpForm] = useState({ title: "", amount: "", description: "" });
  const [expandedFin, setExpandedFin] = useState<string | null>(null);
  const [showAccounting, setShowAccounting] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState<string | null>(null);
  const [paymentForm, setPaymentForm] = useState({ amount: "", payment_day: "", payment_month: "" });

  const formatMoney = (n: number) => new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(n);

  if (isLoading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400">Загрузка...</div>;
  if (!client) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400">Клиент не найден</div>;

  const handleAddTask = async () => {
    if (!taskForm.title.trim()) return;
    await createTask.mutateAsync({ client_id: id!, ...taskForm, assignee_id: taskForm.assignee_id || undefined });
    setShowTaskForm(false);
    setTaskForm({ title: "", description: "", assignee_id: "", priority: "medium", due_date: "", status: "pending" });
    toast({ title: "Задача добавлена" });
  };

  const handleAddFinance = async () => {
    if (!finForm.period) return;
    const finData = await createFinance.mutateAsync({
      client_id: id!, period: finForm.period, amount: 0,
      alexander_percent: Number(finForm.alexander_percent), ilya_percent: Number(finForm.ilya_percent),
      cash_out_percent: finForm.cash_out_percent ? Number(finForm.cash_out_percent) : undefined,
      notes: finForm.notes || undefined,
    });
    // Create first payment if amount provided
    if (finForm.first_amount && finForm.first_month && finForm.first_day && finData?.id) {
      const year = new Date().getFullYear();
      const dateStr = `${year}-${finForm.first_month.padStart(2, "0")}-${finForm.first_day.padStart(2, "0")}`;
      await createPayment.mutateAsync({ finance_id: finData.id, amount: Number(finForm.first_amount), payment_date: dateStr });
    }
    setShowFinForm(false);
    setFinForm({ period: "", alexander_percent: "50", ilya_percent: "50", cash_out_percent: "", notes: "", first_amount: "", first_month: "", first_day: "" });
    toast({ title: "Финансовая запись добавлена" });
  };

  const handleAddPayment = async () => {
    if (!paymentForm.amount || !paymentForm.payment_day || !paymentForm.payment_month || !showPaymentForm) return;
    const year = new Date().getFullYear();
    const dateStr = `${year}-${paymentForm.payment_month.padStart(2, "0")}-${paymentForm.payment_day.padStart(2, "0")}`;
    await createPayment.mutateAsync({
      finance_id: showPaymentForm, amount: Number(paymentForm.amount), payment_date: dateStr,
    });
    setShowPaymentForm(null);
    setPaymentForm({ amount: "", payment_day: "", payment_month: "" });
    toast({ title: "Платёж добавлен" });
  };

  const openEditFinance = (f: any) => {
    setEditFinForm({
      period: f.period,
      alexander_percent: String(f.alexander_percent),
      ilya_percent: String(f.ilya_percent),
      cash_out_percent: f.cash_out_percent ? String(f.cash_out_percent) : "",
      notes: f.notes || "",
    });
    setEditFinId(f.id);
  };

  const handleEditFinance = async () => {
    if (!editFinId || !editFinForm.period) return;
    await updateFinance.mutateAsync({
      id: editFinId, client_id: id!,
      period: editFinForm.period,
      alexander_percent: Number(editFinForm.alexander_percent),
      ilya_percent: Number(editFinForm.ilya_percent),
      cash_out_percent: editFinForm.cash_out_percent ? Number(editFinForm.cash_out_percent) : null,
      notes: editFinForm.notes || null,
    });
    setEditFinId(null);
    toast({ title: "Запись обновлена" });
  };

  const handleAddContractor = async () => {
    if (!conForm.name || !conForm.amount || !showConForm) return;
    await createContractor.mutateAsync({
      finance_id: showConForm, name: conForm.name, amount: Number(conForm.amount), description: conForm.description || undefined,
    });
    setShowConForm(null);
    setConForm({ name: "", amount: "", description: "" });
    toast({ title: "Исполнитель добавлен" });
  };

  const handleAddExpense = async () => {
    if (!expForm.title || !expForm.amount) return;
    await createExpense.mutateAsync({ client_id: id!, title: expForm.title, amount: Number(expForm.amount), description: expForm.description || undefined });
    setShowExpForm(false);
    setExpForm({ title: "", amount: "", description: "" });
    toast({ title: "Расход добавлен" });
  };

  const getFinTotal = (f: any) => ((f as any).crm_payments || []).reduce((ps: number, p: any) => ps + Number(p.amount), 0);
  const totalRevenue = finances?.reduce((s, f) => s + getFinTotal(f), 0) ?? 0;
  const totalExpenses = expenses?.reduce((s, e) => s + Number(e.amount), 0) ?? 0;
  const cashOutTotal = finances?.reduce((s, f) => s + (f.cash_out_percent ? (getFinTotal(f) * Number(f.cash_out_percent)) / 100 : 0), 0) ?? 0;
  const contractorsTotal = finances?.reduce((s, f: any) => s + (f.crm_contractors?.reduce((cs: number, c: any) => cs + Number(c.amount), 0) ?? 0), 0) ?? 0;
  const netProfit = totalRevenue - totalExpenses - cashOutTotal - contractorsTotal;

  // Partner shares from net profit using weighted percentages
  const alexanderTotal = (() => {
    if (!finances?.length || netProfit <= 0 || totalRevenue <= 0) return 0;
    const alexWeighted = finances.reduce((s, f) => s + Number(f.alexander_percent) * (getFinTotal(f) / totalRevenue), 0);
    const ilyaWeighted = finances.reduce((s, f) => s + Number(f.ilya_percent) * (getFinTotal(f) / totalRevenue), 0);
    if (alexWeighted + ilyaWeighted === 0) return 0;
    return (netProfit * alexWeighted) / (alexWeighted + ilyaWeighted);
  })();
  const ilyaTotal = netProfit > 0 ? netProfit - alexanderTotal : 0;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Button variant="ghost" size="icon" onClick={() => navigate("/crm")} className="text-gray-500 hover:text-gray-900 shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#fa3714] flex items-center justify-center shrink-0">
                <span className="text-white font-black text-xs sm:text-sm">Р</span>
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-xl font-bold text-gray-900 truncate">{client.name}</h1>
                {client.contact_person && <p className="text-xs sm:text-sm text-gray-500 truncate">{client.contact_person}</p>}
                {(() => {
                  const svc = (client as any).services as Record<string, any> | undefined;
                  if (!svc) return null;
                  const labels: Record<string, string> = { yandex_direct: "Яндекс Директ", vk_ads: "VK ADS", telegram_ads: "Telegram ADS", website_creation: "Создание сайта" };
                  const active = Object.entries(labels).filter(([k]) => svc[k]);
                  if (!active.length) return null;
                  return (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {active.map(([k, label]) => (
                        <Badge key={k} variant="outline" className="border-[#fa3714]/30 text-[#fa3714] text-[10px] sm:text-xs">
                          {label}{k === "website_creation" && svc.website_count ? ` (${svc.website_count})` : ""}
                        </Badge>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
          <Button onClick={() => setShowAccounting(true)} className="bg-[#fa3714] hover:bg-[#e0300f] text-white gap-1 sm:gap-2 shrink-0 text-xs sm:text-sm px-2 sm:px-4">
            <Calculator className="w-4 h-4" /> <span className="hidden sm:inline">Бух. подсчёт</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 mb-6 sm:mb-8">
          <Card className="bg-white border-gray-200"><CardContent className="p-3 sm:p-4">
            <p className="text-xs text-gray-500 mb-1">Выручка</p>
            <p className="text-lg sm:text-xl font-bold text-green-600">{formatMoney(totalRevenue)}</p>
          </CardContent></Card>
          <Card className="bg-white border-gray-200"><CardContent className="p-3 sm:p-4">
            <p className="text-xs text-gray-500 mb-1">Расходы</p>
            <p className="text-lg sm:text-xl font-bold text-red-500">{formatMoney(totalExpenses)}</p>
          </CardContent></Card>
          <Card className="bg-white border-gray-200"><CardContent className="p-3 sm:p-4">
            <p className="text-xs text-gray-500 mb-1">Задач</p>
            <p className="text-lg sm:text-xl font-bold text-blue-600">{tasks?.length ?? 0}</p>
          </CardContent></Card>
          <Card className="bg-white border-gray-200"><CardContent className="p-3 sm:p-4">
            <p className="text-xs text-gray-500 mb-1">Прибыль</p>
            <p className="text-lg sm:text-xl font-bold text-purple-600">{formatMoney(totalRevenue - totalExpenses)}</p>
          </CardContent></Card>
        </div>

        <Tabs defaultValue="tasks" className="space-y-4 sm:space-y-6">
          <TabsList className="bg-gray-100 border border-gray-200 w-full sm:w-auto">
            <TabsTrigger value="tasks" className="flex-1 sm:flex-none text-xs sm:text-sm data-[state=active]:bg-[#fa3714] data-[state=active]:text-white">Задачи</TabsTrigger>
            <TabsTrigger value="finances" className="flex-1 sm:flex-none text-xs sm:text-sm data-[state=active]:bg-[#fa3714] data-[state=active]:text-white">Финансы</TabsTrigger>
            <TabsTrigger value="expenses" className="flex-1 sm:flex-none text-xs sm:text-sm data-[state=active]:bg-[#fa3714] data-[state=active]:text-white">Расходы</TabsTrigger>
          </TabsList>

          {/* ── TASKS ── */}
          <TabsContent value="tasks" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Задачи</h2>
              <Button size="sm" onClick={() => setShowTaskForm(true)} className="bg-[#fa3714] hover:bg-[#e0300f] text-white">
                <Plus className="w-4 h-4 mr-1" /> Добавить
              </Button>
            </div>
            {!tasks?.length ? (
              <p className="text-gray-400 text-center py-10">Задач пока нет</p>
            ) : (
              <div className="space-y-3">
                {tasks.map((t: any) => (
                  <Card key={t.id} className="bg-white border-gray-200">
                    <CardContent className="p-4 flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <button onClick={async () => {
                          const next = t.status === "done" ? "pending" : t.status === "pending" ? "in_progress" : "done";
                          await updateTask.mutateAsync({ id: t.id, client_id: id!, status: next });
                        }}>
                          {taskStatusIcons[t.status] || taskStatusIcons.pending}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${t.status === "done" ? "line-through text-gray-400" : "text-gray-900"}`}>{t.title}</p>
                          {t.description && <p className="text-sm text-gray-500 mt-1">{t.description}</p>}
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className={priorityColors[t.priority]}>
                              {t.priority === "high" ? "Высокий" : t.priority === "medium" ? "Средний" : "Низкий"}
                            </Badge>
                            {t.crm_team_members?.name && (
                              <Badge variant="outline" className="border-blue-300 text-blue-600">
                                <Users className="w-3 h-3 mr-1" />{t.crm_team_members.name}
                              </Badge>
                            )}
                            {t.due_date && (
                              <Badge variant="outline" className="border-gray-300 text-gray-500">
                                <CalendarDays className="w-3 h-3 mr-1" />{new Date(t.due_date).toLocaleDateString("ru")}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" className="text-red-400 hover:text-red-600" onClick={async () => {
                        await deleteTask.mutateAsync({ id: t.id, client_id: id! });
                        toast({ title: "Задача удалена" });
                      }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ── FINANCES ── */}
          <TabsContent value="finances" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Финансы</h2>
              <Button size="sm" onClick={() => setShowFinForm(true)} className="bg-[#fa3714] hover:bg-[#e0300f] text-white">
                <Plus className="w-4 h-4 mr-1" /> Добавить
              </Button>
            </div>
            {!finances?.length ? (
              <p className="text-gray-400 text-center py-10">Записей пока нет</p>
            ) : (
              <div className="space-y-4">
                {[...finances].sort((a: any, b: any) => {
                  const aPayments = a.crm_payments || [];
                  const bPayments = b.crm_payments || [];
                  const aLatest = aPayments.length ? Math.max(...aPayments.map((p: any) => new Date(p.payment_date).getTime())) : new Date(a.created_at).getTime();
                  const bLatest = bPayments.length ? Math.max(...bPayments.map((p: any) => new Date(p.payment_date).getTime())) : new Date(b.created_at).getTime();
                  return bLatest - aLatest;
                }).map((f: any) => {
                  const isExpanded = expandedFin === f.id;
                  const payments = (f.crm_payments || []).sort((a: any, b: any) => new Date(a.payment_date).getTime() - new Date(b.payment_date).getTime());
                  const totalAmount = payments.reduce((s: number, p: any) => s + Number(p.amount), 0);
                  const contractorsAmount = (f.crm_contractors || []).reduce((cs: number, c: any) => cs + Number(c.amount), 0);
                  const cashOutAmount = f.cash_out_percent ? (totalAmount * Number(f.cash_out_percent)) / 100 : 0;
                  const expensesAmount = (f.crm_expenses || []).reduce((es: number, e: any) => es + Number(e.amount), 0);
                  const netAmount = totalAmount - cashOutAmount - contractorsAmount - expensesAmount;
                  const alexAmount = netAmount > 0 ? (netAmount * Number(f.alexander_percent)) / (Number(f.alexander_percent) + Number(f.ilya_percent)) : 0;
                  const ilyaAmount = netAmount > 0 ? netAmount - alexAmount : 0;

                  return (
                    <Card key={f.id} className="bg-white border-gray-200 overflow-hidden">
                      <CardContent className="p-0">
                        <button className="w-full p-5 flex items-center justify-between text-left" onClick={() => setExpandedFin(isExpanded ? null : f.id)}>
                          <div>
                            <p className="font-semibold text-gray-900">{f.period}</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">{formatMoney(totalAmount)}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{payments.length} платеж(ей)</p>
                          </div>
                          {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                        </button>

                        {isExpanded && (
                          <div className="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
                            {/* Payments list */}
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <p className="text-sm font-medium text-gray-600">Платежи</p>
                                <Button size="sm" variant="ghost" onClick={() => setShowPaymentForm(f.id)} className="text-[#fa3714] h-7 text-xs">
                                  <Plus className="w-3 h-3 mr-1" /> Добавить платёж
                                </Button>
                              </div>
                              {payments.length ? (
                                <div className="space-y-2">
                                  {payments.map((p: any, idx: number) => (
                                    <div key={p.id} className="flex justify-between items-center bg-green-50 rounded-lg px-3 py-2">
                                      <div>
                                        <p className="text-sm text-gray-900">Платёж №{idx + 1}</p>
                                        <p className="text-xs text-gray-500">{new Date(p.payment_date).toLocaleDateString("ru")}</p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-green-600">{formatMoney(Number(p.amount))}</span>
                                        <Button size="icon" variant="ghost" className="h-6 w-6 text-red-400" onClick={() => deletePayment.mutateAsync(p.id)}>
                                          <Trash2 className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : <p className="text-xs text-gray-400">Нет платежей</p>}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {f.cash_out_percent > 0 && (
                                <div className="bg-orange-50 rounded-lg p-3">
                                  <p className="text-xs text-orange-600">Обнал ({f.cash_out_percent}%)</p>
                                  <p className="text-lg font-bold text-orange-700">−{formatMoney(cashOutAmount)}</p>
                                </div>
                              )}
                              {contractorsAmount > 0 && (
                                <div className="bg-cyan-50 rounded-lg p-3">
                                  <p className="text-xs text-cyan-600">Исполнители</p>
                                  <p className="text-lg font-bold text-cyan-700">−{formatMoney(contractorsAmount)}</p>
                                </div>
                              )}
                              {expensesAmount > 0 && (
                                <div className="bg-red-50 rounded-lg p-3">
                                  <p className="text-xs text-red-600">Расходы</p>
                                  <p className="text-lg font-bold text-red-700">−{formatMoney(expensesAmount)}</p>
                                </div>
                              )}
                              <div className="bg-green-50 rounded-lg p-3">
                                <p className="text-xs text-green-600">Чистая прибыль</p>
                                <p className="text-lg font-bold text-green-700">{formatMoney(netAmount)}</p>
                              </div>
                              <div className="bg-blue-50 rounded-lg p-3">
                                <p className="text-xs text-blue-600">Александр ({f.alexander_percent}%)</p>
                                <p className="text-lg font-bold text-blue-700">{formatMoney(alexAmount)}</p>
                              </div>
                              <div className="bg-purple-50 rounded-lg p-3">
                                <p className="text-xs text-purple-600">Илья ({f.ilya_percent}%)</p>
                                <p className="text-lg font-bold text-purple-700">{formatMoney(ilyaAmount)}</p>
                              </div>
                            </div>

                            {f.notes && <p className="text-sm text-gray-500">{f.notes}</p>}

                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <p className="text-sm font-medium text-gray-600">Исполнители</p>
                                <Button size="sm" variant="ghost" onClick={() => setShowConForm(f.id)} className="text-[#fa3714] h-7 text-xs">
                                  <Plus className="w-3 h-3 mr-1" /> Добавить
                                </Button>
                              </div>
                              {f.crm_contractors?.length ? (
                                <div className="space-y-2">
                                  {f.crm_contractors.map((c: any) => (
                                    <div key={c.id} className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2">
                                      <div>
                                        <p className="text-sm text-gray-900">{c.name}</p>
                                        {c.description && <p className="text-xs text-gray-400">{c.description}</p>}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-cyan-600">{formatMoney(Number(c.amount))}</span>
                                        <Button size="icon" variant="ghost" className="h-6 w-6 text-red-400" onClick={() => deleteContractor.mutateAsync(c.id)}>
                                          <Trash2 className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : <p className="text-xs text-gray-400">Нет исполнителей</p>}
                            </div>

                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="ghost" className="text-blue-500 text-xs" onClick={() => openEditFinance(f)}>
                                <Edit className="w-3 h-3 mr-1" /> Редактировать
                              </Button>
                              <Button size="sm" variant="ghost" className="text-red-500 text-xs" onClick={async () => {
                                if (confirm("Удалить запись?")) {
                                  await deleteFinance.mutateAsync({ id: f.id, client_id: id! });
                                  toast({ title: "Запись удалена" });
                                }
                              }}>
                                <Trash2 className="w-3 h-3 mr-1" /> Удалить
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* ── EXPENSES ── */}
          <TabsContent value="expenses" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Прочие расходы</h2>
              <Button size="sm" onClick={() => setShowExpForm(true)} className="bg-[#fa3714] hover:bg-[#e0300f] text-white">
                <Plus className="w-4 h-4 mr-1" /> Добавить
              </Button>
            </div>
            {!expenses?.length ? (
              <p className="text-gray-400 text-center py-10">Расходов пока нет</p>
            ) : (
              <div className="space-y-3">
                {expenses.map((e: any) => (
                  <Card key={e.id} className="bg-white border-gray-200">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{e.title}</p>
                        {e.description && <p className="text-sm text-gray-500">{e.description}</p>}
                        <p className="text-xs text-gray-400 mt-1">{new Date(e.created_at).toLocaleDateString("ru")}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-red-500">{formatMoney(Number(e.amount))}</span>
                        <Button size="icon" variant="ghost" className="text-red-400 hover:text-red-600" onClick={() => deleteExpense.mutateAsync({ id: e.id, client_id: id! })}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* ── TASK DIALOG ── */}
      <Dialog open={showTaskForm} onOpenChange={setShowTaskForm}>
        <DialogContent className="bg-white border-gray-200 text-gray-900">
          <DialogHeader><DialogTitle>Новая задача</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div><Label>Название *</Label><Input value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            <div><Label>Описание</Label><Textarea value={taskForm.description} onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" rows={2} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Ответственный</Label>
                <Select value={taskForm.assignee_id} onValueChange={(v) => setTaskForm({ ...taskForm, assignee_id: v })}>
                  <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900 mt-1"><SelectValue placeholder="Выберите" /></SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg z-50">
                    {team?.map((m) => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Приоритет</Label>
                <Select value={taskForm.priority} onValueChange={(v) => setTaskForm({ ...taskForm, priority: v })}>
                  <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900 mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg z-50">
                    <SelectItem value="low">Низкий</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="high">Высокий</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div><Label>Дедлайн</Label><Input type="date" value={taskForm.due_date} onChange={(e) => setTaskForm({ ...taskForm, due_date: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowTaskForm(false)} className="text-gray-500">Отмена</Button>
            <Button onClick={handleAddTask} className="bg-[#fa3714] hover:bg-[#e0300f] text-white">Создать</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── FINANCE DIALOG ── */}
      <Dialog open={showFinForm} onOpenChange={setShowFinForm}>
        <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-lg">
          <DialogHeader><DialogTitle>Новая финансовая запись</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div><Label>Период *</Label><Input placeholder="Январь 2026" value={finForm.period} onChange={(e) => setFinForm({ ...finForm, period: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>% Александра</Label><Input type="number" value={finForm.alexander_percent} onChange={(e) => setFinForm({ ...finForm, alexander_percent: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
              <div><Label>% Ильи</Label><Input type="number" value={finForm.ilya_percent} onChange={(e) => setFinForm({ ...finForm, ilya_percent: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            </div>
            <div><Label>% обнала (необязательно)</Label><Input type="number" value={finForm.cash_out_percent} onChange={(e) => setFinForm({ ...finForm, cash_out_percent: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            <div className="border-t border-gray-200 pt-3">
              <p className="text-sm font-medium text-gray-700 mb-3">Первый платёж (необязательно)</p>
              <div className="grid gap-3">
                <div><Label>Сумма (₽)</Label><Input type="number" value={finForm.first_amount} onChange={(e) => setFinForm({ ...finForm, first_amount: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Месяц</Label>
                    <Select value={finForm.first_month} onValueChange={(v) => setFinForm({ ...finForm, first_month: v })}>
                      <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900 mt-1"><SelectValue placeholder="Месяц" /></SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 shadow-lg z-50">
                        {["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"].map((m, i) => (
                          <SelectItem key={i + 1} value={String(i + 1)}>{m}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div><Label>Число</Label><Input type="number" min="1" max="31" value={finForm.first_day} onChange={(e) => setFinForm({ ...finForm, first_day: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" placeholder="1-31" /></div>
                </div>
                <p className="text-xs text-gray-400">Год определяется автоматически ({new Date().getFullYear()})</p>
              </div>
            </div>
            <div><Label>Заметки</Label><Textarea value={finForm.notes} onChange={(e) => setFinForm({ ...finForm, notes: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" rows={2} /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowFinForm(false)} className="text-gray-500">Отмена</Button>
            <Button onClick={handleAddFinance} className="bg-[#fa3714] hover:bg-[#e0300f] text-white">Создать</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── PAYMENT DIALOG ── */}
      <Dialog open={!!showPaymentForm} onOpenChange={(o) => { if (!o) setShowPaymentForm(null); }}>
        <DialogContent className="bg-white border-gray-200 text-gray-900">
          <DialogHeader><DialogTitle>Добавить платёж</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div><Label>Сумма (₽) *</Label><Input type="number" value={paymentForm.amount} onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Месяц *</Label>
                <Select value={paymentForm.payment_month} onValueChange={(v) => setPaymentForm({ ...paymentForm, payment_month: v })}>
                  <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900 mt-1"><SelectValue placeholder="Месяц" /></SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg z-50">
                    {["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"].map((m, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Число *</Label><Input type="number" min="1" max="31" value={paymentForm.payment_day} onChange={(e) => setPaymentForm({ ...paymentForm, payment_day: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" placeholder="1-31" /></div>
            </div>
            <p className="text-xs text-gray-400">Год определяется автоматически ({new Date().getFullYear()})</p>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowPaymentForm(null)} className="text-gray-500">Отмена</Button>
            <Button onClick={handleAddPayment} className="bg-[#fa3714] hover:bg-[#e0300f] text-white">Добавить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── EDIT FINANCE DIALOG ── */}
      <Dialog open={!!editFinId} onOpenChange={(o) => { if (!o) setEditFinId(null); }}>
        <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-lg">
          <DialogHeader><DialogTitle>Редактировать запись</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div><Label>Период *</Label><Input value={editFinForm.period} onChange={(e) => setEditFinForm({ ...editFinForm, period: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>% Александра</Label><Input type="number" value={editFinForm.alexander_percent} onChange={(e) => setEditFinForm({ ...editFinForm, alexander_percent: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
              <div><Label>% Ильи</Label><Input type="number" value={editFinForm.ilya_percent} onChange={(e) => setEditFinForm({ ...editFinForm, ilya_percent: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            </div>
            <div><Label>% обнала</Label><Input type="number" value={editFinForm.cash_out_percent} onChange={(e) => setEditFinForm({ ...editFinForm, cash_out_percent: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            <div><Label>Заметки</Label><Textarea value={editFinForm.notes} onChange={(e) => setEditFinForm({ ...editFinForm, notes: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" rows={2} /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditFinId(null)} className="text-gray-500">Отмена</Button>
            <Button onClick={handleEditFinance} className="bg-[#fa3714] hover:bg-[#e0300f] text-white">Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!showConForm} onOpenChange={(o) => { if (!o) setShowConForm(null); }}>
        <DialogContent className="bg-white border-gray-200 text-gray-900">
          <DialogHeader><DialogTitle>Добавить исполнителя</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div><Label>Имя / Компания *</Label><Input value={conForm.name} onChange={(e) => setConForm({ ...conForm, name: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            <div><Label>Сумма (₽) *</Label><Input type="number" value={conForm.amount} onChange={(e) => setConForm({ ...conForm, amount: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            <div><Label>Описание</Label><Input value={conForm.description} onChange={(e) => setConForm({ ...conForm, description: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowConForm(null)} className="text-gray-500">Отмена</Button>
            <Button onClick={handleAddContractor} className="bg-[#fa3714] hover:bg-[#e0300f] text-white">Добавить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── EXPENSE DIALOG ── */}
      <Dialog open={showExpForm} onOpenChange={setShowExpForm}>
        <DialogContent className="bg-white border-gray-200 text-gray-900">
          <DialogHeader><DialogTitle>Добавить расход</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div><Label>Название *</Label><Input value={expForm.title} onChange={(e) => setExpForm({ ...expForm, title: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            <div><Label>Сумма (₽) *</Label><Input type="number" value={expForm.amount} onChange={(e) => setExpForm({ ...expForm, amount: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
            <div><Label>Описание</Label><Input value={expForm.description} onChange={(e) => setExpForm({ ...expForm, description: e.target.value })} className="bg-gray-50 border-gray-300 text-gray-900 mt-1" /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowExpForm(false)} className="text-gray-500">Отмена</Button>
            <Button onClick={handleAddExpense} className="bg-[#fa3714] hover:bg-[#e0300f] text-white">Добавить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── ACCOUNTING SUMMARY DIALOG ── */}
      <Dialog open={showAccounting} onOpenChange={setShowAccounting}>
        <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">Бухгалтерский подсчёт — {client.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-sm text-green-700 mb-1">Общая выручка</p>
              <p className="text-3xl font-bold text-green-600">{formatMoney(totalRevenue)}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p className="text-sm text-blue-700 mb-1">Александр заработал</p>
                <p className="text-2xl font-bold text-blue-600">{formatMoney(alexanderTotal)}</p>
                {finances?.map((f: any) => (
                  <p key={f.id} className="text-xs text-blue-500 mt-1">
                    {f.period}: {formatMoney((getFinTotal(f) * Number(f.alexander_percent)) / 100)} ({f.alexander_percent}%)
                  </p>
                ))}
              </div>
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <p className="text-sm text-purple-700 mb-1">Илья заработал</p>
                <p className="text-2xl font-bold text-purple-600">{formatMoney(ilyaTotal)}</p>
                {finances?.map((f: any) => (
                  <p key={f.id} className="text-xs text-purple-500 mt-1">
                    {f.period}: {formatMoney((getFinTotal(f) * Number(f.ilya_percent)) / 100)} ({f.ilya_percent}%)
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {cashOutTotal > 0 && (
                <div className="flex justify-between items-center bg-orange-50 rounded-lg px-4 py-3 border border-orange-200">
                  <span className="text-sm text-orange-700">Обнал</span>
                  <span className="font-bold text-orange-600">{formatMoney(cashOutTotal)}</span>
                </div>
              )}
              {contractorsTotal > 0 && (
                <div className="flex justify-between items-center bg-cyan-50 rounded-lg px-4 py-3 border border-cyan-200">
                  <span className="text-sm text-cyan-700">Исполнители</span>
                  <span className="font-bold text-cyan-600">{formatMoney(contractorsTotal)}</span>
                </div>
              )}
              {totalExpenses > 0 && (
                <div className="flex justify-between items-center bg-red-50 rounded-lg px-4 py-3 border border-red-200">
                  <span className="text-sm text-red-700">Прочие расходы</span>
                  <span className="font-bold text-red-500">{formatMoney(totalExpenses)}</span>
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Чистая прибыль по клиенту</p>
              <p className={`text-3xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-500"}`}>
                {formatMoney(netProfit)}
              </p>
            </div>

            {alexanderTotal !== ilyaTotal && (
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <p className="text-sm text-yellow-700 mb-1">Разница между партнёрами</p>
                <p className="text-lg font-semibold text-yellow-600">
                  {alexanderTotal > ilyaTotal
                    ? `Александр получает на ${formatMoney(alexanderTotal - ilyaTotal)} больше`
                    : `Илья получает на ${formatMoney(ilyaTotal - alexanderTotal)} больше`}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowAccounting(false)} className="text-gray-500">Закрыть</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CrmClientDetail;
