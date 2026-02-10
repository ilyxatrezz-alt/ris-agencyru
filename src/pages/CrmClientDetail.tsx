import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useClient, useClientTasks, useCreateTask, useUpdateTask, useDeleteTask,
  useClientFinances, useCreateFinance, useDeleteFinance,
  useCreateContractor, useDeleteContractor,
  useClientExpenses, useCreateExpense, useDeleteExpense,
  useTeamMembers,
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
  Users, CalendarDays, ChevronDown, ChevronUp
} from "lucide-react";

const priorityColors: Record<string, string> = {
  low: "border-gray-500/30 text-gray-400",
  medium: "border-yellow-500/30 text-yellow-400",
  high: "border-red-500/30 text-red-400",
};
const taskStatusIcons: Record<string, any> = {
  pending: <Clock className="w-4 h-4 text-yellow-400" />,
  in_progress: <AlertCircle className="w-4 h-4 text-blue-400" />,
  done: <CheckCircle2 className="w-4 h-4 text-green-400" />,
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
  const createContractor = useCreateContractor();
  const deleteContractor = useDeleteContractor();
  const createExpense = useCreateExpense();
  const deleteExpense = useDeleteExpense();

  // Task form
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskForm, setTaskForm] = useState({ title: "", description: "", assignee_id: "", priority: "medium", due_date: "", status: "pending" });

  // Finance form
  const [showFinForm, setShowFinForm] = useState(false);
  const [finForm, setFinForm] = useState({ period: "", amount: "", alexander_percent: "50", ilya_percent: "50", cash_out_percent: "", notes: "" });

  // Contractor form
  const [showConForm, setShowConForm] = useState<string | null>(null);
  const [conForm, setConForm] = useState({ name: "", amount: "", description: "" });

  // Expense form
  const [showExpForm, setShowExpForm] = useState(false);
  const [expForm, setExpForm] = useState({ title: "", amount: "", description: "" });

  // Expanded finance cards
  const [expandedFin, setExpandedFin] = useState<string | null>(null);

  const formatMoney = (n: number) => new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(n);

  if (isLoading) return <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white/40">Загрузка...</div>;
  if (!client) return <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white/40">Клиент не найден</div>;

  const handleAddTask = async () => {
    if (!taskForm.title.trim()) return;
    await createTask.mutateAsync({ client_id: id!, ...taskForm, assignee_id: taskForm.assignee_id || undefined });
    setShowTaskForm(false);
    setTaskForm({ title: "", description: "", assignee_id: "", priority: "medium", due_date: "", status: "pending" });
    toast({ title: "Задача добавлена" });
  };

  const handleAddFinance = async () => {
    if (!finForm.period || !finForm.amount) return;
    await createFinance.mutateAsync({
      client_id: id!, period: finForm.period, amount: Number(finForm.amount),
      alexander_percent: Number(finForm.alexander_percent), ilya_percent: Number(finForm.ilya_percent),
      cash_out_percent: finForm.cash_out_percent ? Number(finForm.cash_out_percent) : undefined,
      notes: finForm.notes || undefined,
    });
    setShowFinForm(false);
    setFinForm({ period: "", amount: "", alexander_percent: "50", ilya_percent: "50", cash_out_percent: "", notes: "" });
    toast({ title: "Финансовая запись добавлена" });
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

  const totalRevenue = finances?.reduce((s, f) => s + Number(f.amount), 0) ?? 0;
  const totalExpenses = expenses?.reduce((s, e) => s + Number(e.amount), 0) ?? 0;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0d0d14]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/crm")} className="text-white/60 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-white">{client.name}</h1>
            {client.contact_person && <p className="text-sm text-white/40">{client.contact_person}</p>}
            {(() => {
              const svc = (client as any).services as Record<string, any> | undefined;
              if (!svc) return null;
              const labels: Record<string, string> = { yandex_direct: "Яндекс Директ", vk_ads: "ВК реклама", telegram_ads: "Телеграм реклама", website_creation: "Создание сайта" };
              const active = Object.entries(labels).filter(([k]) => svc[k]);
              if (!active.length) return null;
              return (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {active.map(([k, label]) => (
                    <Badge key={k} variant="outline" className="border-blue-500/30 text-blue-300 text-xs">
                      {label}{k === "website_creation" && svc.website_count ? ` (${svc.website_count})` : ""}
                    </Badge>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/5 border-white/10"><CardContent className="p-4">
            <p className="text-xs text-white/40 mb-1">Выручка</p>
            <p className="text-xl font-bold text-green-400">{formatMoney(totalRevenue)}</p>
          </CardContent></Card>
          <Card className="bg-white/5 border-white/10"><CardContent className="p-4">
            <p className="text-xs text-white/40 mb-1">Расходы</p>
            <p className="text-xl font-bold text-red-400">{formatMoney(totalExpenses)}</p>
          </CardContent></Card>
          <Card className="bg-white/5 border-white/10"><CardContent className="p-4">
            <p className="text-xs text-white/40 mb-1">Задач</p>
            <p className="text-xl font-bold text-blue-400">{tasks?.length ?? 0}</p>
          </CardContent></Card>
          <Card className="bg-white/5 border-white/10"><CardContent className="p-4">
            <p className="text-xs text-white/40 mb-1">Прибыль</p>
            <p className="text-xl font-bold text-purple-400">{formatMoney(totalRevenue - totalExpenses)}</p>
          </CardContent></Card>
        </div>

        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="tasks" className="data-[state=active]:bg-blue-600">Задачи</TabsTrigger>
            <TabsTrigger value="finances" className="data-[state=active]:bg-blue-600">Финансы</TabsTrigger>
            <TabsTrigger value="expenses" className="data-[state=active]:bg-blue-600">Расходы</TabsTrigger>
          </TabsList>

          {/* ── TASKS ── */}
          <TabsContent value="tasks" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Задачи</h2>
              <Button size="sm" onClick={() => setShowTaskForm(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-1" /> Добавить
              </Button>
            </div>
            {!tasks?.length ? (
              <p className="text-white/30 text-center py-10">Задач пока нет</p>
            ) : (
              <div className="space-y-3">
                {tasks.map((t: any) => (
                  <Card key={t.id} className="bg-white/5 border-white/10">
                    <CardContent className="p-4 flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <button onClick={async () => {
                          const next = t.status === "done" ? "pending" : t.status === "pending" ? "in_progress" : "done";
                          await updateTask.mutateAsync({ id: t.id, client_id: id!, status: next });
                        }}>
                          {taskStatusIcons[t.status] || taskStatusIcons.pending}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${t.status === "done" ? "line-through text-white/40" : "text-white"}`}>{t.title}</p>
                          {t.description && <p className="text-sm text-white/40 mt-1">{t.description}</p>}
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className={priorityColors[t.priority]}>
                              {t.priority === "high" ? "Высокий" : t.priority === "medium" ? "Средний" : "Низкий"}
                            </Badge>
                            {t.crm_team_members?.name && (
                              <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                                <Users className="w-3 h-3 mr-1" />{t.crm_team_members.name}
                              </Badge>
                            )}
                            {t.due_date && (
                              <Badge variant="outline" className="border-white/20 text-white/50">
                                <CalendarDays className="w-3 h-3 mr-1" />{new Date(t.due_date).toLocaleDateString("ru")}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" className="text-red-400/60 hover:text-red-400" onClick={async () => {
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
              <h2 className="text-lg font-semibold">Финансы</h2>
              <Button size="sm" onClick={() => setShowFinForm(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-1" /> Добавить
              </Button>
            </div>
            {!finances?.length ? (
              <p className="text-white/30 text-center py-10">Записей пока нет</p>
            ) : (
              <div className="space-y-4">
                {finances.map((f: any) => {
                  const isExpanded = expandedFin === f.id;
                  const alexAmount = (Number(f.amount) * Number(f.alexander_percent)) / 100;
                  const ilyaAmount = (Number(f.amount) * Number(f.ilya_percent)) / 100;
                  const cashOutAmount = f.cash_out_percent ? (Number(f.amount) * Number(f.cash_out_percent)) / 100 : 0;
                  const contractorsTotal = f.crm_contractors?.reduce((s: number, c: any) => s + Number(c.amount), 0) ?? 0;
                  const expensesTotal = f.crm_expenses?.reduce((s: number, e: any) => s + Number(e.amount), 0) ?? 0;

                  return (
                    <Card key={f.id} className="bg-white/5 border-white/10 overflow-hidden">
                      <CardContent className="p-0">
                        <button className="w-full p-5 flex items-center justify-between text-left" onClick={() => setExpandedFin(isExpanded ? null : f.id)}>
                          <div>
                            <p className="font-semibold text-white">{f.period}</p>
                            <p className="text-2xl font-bold text-green-400 mt-1">{formatMoney(Number(f.amount))}</p>
                          </div>
                          {isExpanded ? <ChevronUp className="w-5 h-5 text-white/40" /> : <ChevronDown className="w-5 h-5 text-white/40" />}
                        </button>

                        {isExpanded && (
                          <div className="px-5 pb-5 space-y-4 border-t border-white/5 pt-4">
                            {/* Splits */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <div className="bg-blue-500/10 rounded-lg p-3">
                                <p className="text-xs text-blue-300">Александр ({f.alexander_percent}%)</p>
                                <p className="text-lg font-bold text-blue-400">{formatMoney(alexAmount)}</p>
                              </div>
                              <div className="bg-purple-500/10 rounded-lg p-3">
                                <p className="text-xs text-purple-300">Илья ({f.ilya_percent}%)</p>
                                <p className="text-lg font-bold text-purple-400">{formatMoney(ilyaAmount)}</p>
                              </div>
                              {f.cash_out_percent && (
                                <div className="bg-orange-500/10 rounded-lg p-3">
                                  <p className="text-xs text-orange-300">Обнал ({f.cash_out_percent}%)</p>
                                  <p className="text-lg font-bold text-orange-400">{formatMoney(cashOutAmount)}</p>
                                </div>
                              )}
                              {contractorsTotal > 0 && (
                                <div className="bg-cyan-500/10 rounded-lg p-3">
                                  <p className="text-xs text-cyan-300">Исполнители</p>
                                  <p className="text-lg font-bold text-cyan-400">{formatMoney(contractorsTotal)}</p>
                                </div>
                              )}
                            </div>

                            {f.notes && <p className="text-sm text-white/40">{f.notes}</p>}

                            {/* Contractors list */}
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <p className="text-sm font-medium text-white/60">Исполнители</p>
                                <Button size="sm" variant="ghost" onClick={() => setShowConForm(f.id)} className="text-cyan-400 h-7 text-xs">
                                  <Plus className="w-3 h-3 mr-1" /> Добавить
                                </Button>
                              </div>
                              {f.crm_contractors?.length ? (
                                <div className="space-y-2">
                                  {f.crm_contractors.map((c: any) => (
                                    <div key={c.id} className="flex justify-between items-center bg-white/5 rounded-lg px-3 py-2">
                                      <div>
                                        <p className="text-sm text-white">{c.name}</p>
                                        {c.description && <p className="text-xs text-white/30">{c.description}</p>}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-cyan-400">{formatMoney(Number(c.amount))}</span>
                                        <Button size="icon" variant="ghost" className="h-6 w-6 text-red-400/60" onClick={() => deleteContractor.mutateAsync(c.id)}>
                                          <Trash2 className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : <p className="text-xs text-white/20">Нет исполнителей</p>}
                            </div>

                            {/* Delete finance */}
                            <div className="flex justify-end">
                              <Button size="sm" variant="ghost" className="text-red-400 text-xs" onClick={async () => {
                                if (confirm("Удалить запись?")) {
                                  await deleteFinance.mutateAsync({ id: f.id, client_id: id! });
                                  toast({ title: "Запись удалена" });
                                }
                              }}>
                                <Trash2 className="w-3 h-3 mr-1" /> Удалить запись
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
              <h2 className="text-lg font-semibold">Прочие расходы</h2>
              <Button size="sm" onClick={() => setShowExpForm(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-1" /> Добавить
              </Button>
            </div>
            {!expenses?.length ? (
              <p className="text-white/30 text-center py-10">Расходов пока нет</p>
            ) : (
              <div className="space-y-3">
                {expenses.map((e: any) => (
                  <Card key={e.id} className="bg-white/5 border-white/10">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-white">{e.title}</p>
                        {e.description && <p className="text-sm text-white/40">{e.description}</p>}
                        <p className="text-xs text-white/20 mt-1">{new Date(e.created_at).toLocaleDateString("ru")}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-red-400">{formatMoney(Number(e.amount))}</span>
                        <Button size="icon" variant="ghost" className="text-red-400/60 hover:text-red-400" onClick={() => deleteExpense.mutateAsync({ id: e.id, client_id: id! })}>
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
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white">
          <DialogHeader><DialogTitle>Новая задача</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div><Label>Название *</Label><Input value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
            <div><Label>Описание</Label><Textarea value={taskForm.description} onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" rows={2} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Ответственный</Label>
                <Select value={taskForm.assignee_id} onValueChange={(v) => setTaskForm({ ...taskForm, assignee_id: v })}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white mt-1"><SelectValue placeholder="Выберите" /></SelectTrigger>
                  <SelectContent className="bg-[#1a1a2e] border-white/10">
                    {team?.map((m) => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Приоритет</Label>
                <Select value={taskForm.priority} onValueChange={(v) => setTaskForm({ ...taskForm, priority: v })}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[#1a1a2e] border-white/10">
                    <SelectItem value="low">Низкий</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="high">Высокий</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div><Label>Дедлайн</Label><Input type="date" value={taskForm.due_date} onChange={(e) => setTaskForm({ ...taskForm, due_date: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowTaskForm(false)} className="text-white/60">Отмена</Button>
            <Button onClick={handleAddTask} className="bg-blue-600 hover:bg-blue-700">Создать</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── FINANCE DIALOG ── */}
      <Dialog open={showFinForm} onOpenChange={setShowFinForm}>
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white max-w-lg">
          <DialogHeader><DialogTitle>Новая финансовая запись</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Период *</Label><Input placeholder="Январь 2026" value={finForm.period} onChange={(e) => setFinForm({ ...finForm, period: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
              <div><Label>Сумма (₽) *</Label><Input type="number" value={finForm.amount} onChange={(e) => setFinForm({ ...finForm, amount: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>% Александра</Label><Input type="number" value={finForm.alexander_percent} onChange={(e) => setFinForm({ ...finForm, alexander_percent: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
              <div><Label>% Ильи</Label><Input type="number" value={finForm.ilya_percent} onChange={(e) => setFinForm({ ...finForm, ilya_percent: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
            </div>
            <div><Label>% обнала (необязательно)</Label><Input type="number" value={finForm.cash_out_percent} onChange={(e) => setFinForm({ ...finForm, cash_out_percent: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
            <div><Label>Заметки</Label><Textarea value={finForm.notes} onChange={(e) => setFinForm({ ...finForm, notes: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" rows={2} /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowFinForm(false)} className="text-white/60">Отмена</Button>
            <Button onClick={handleAddFinance} className="bg-blue-600 hover:bg-blue-700">Создать</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── CONTRACTOR DIALOG ── */}
      <Dialog open={!!showConForm} onOpenChange={(o) => { if (!o) setShowConForm(null); }}>
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white">
          <DialogHeader><DialogTitle>Добавить исполнителя</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div><Label>Имя / Компания *</Label><Input value={conForm.name} onChange={(e) => setConForm({ ...conForm, name: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
            <div><Label>Сумма (₽) *</Label><Input type="number" value={conForm.amount} onChange={(e) => setConForm({ ...conForm, amount: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
            <div><Label>Описание</Label><Input value={conForm.description} onChange={(e) => setConForm({ ...conForm, description: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowConForm(null)} className="text-white/60">Отмена</Button>
            <Button onClick={handleAddContractor} className="bg-blue-600 hover:bg-blue-700">Добавить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── EXPENSE DIALOG ── */}
      <Dialog open={showExpForm} onOpenChange={setShowExpForm}>
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white">
          <DialogHeader><DialogTitle>Добавить расход</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div><Label>Название *</Label><Input value={expForm.title} onChange={(e) => setExpForm({ ...expForm, title: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
            <div><Label>Сумма (₽) *</Label><Input type="number" value={expForm.amount} onChange={(e) => setExpForm({ ...expForm, amount: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
            <div><Label>Описание</Label><Input value={expForm.description} onChange={(e) => setExpForm({ ...expForm, description: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowExpForm(false)} className="text-white/60">Отмена</Button>
            <Button onClick={handleAddExpense} className="bg-blue-600 hover:bg-blue-700">Добавить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CrmClientDetail;
