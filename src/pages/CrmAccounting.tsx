import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsSuperAdmin } from "@/hooks/useUserRole";
import {
  useAllFinances, useAgencyExpenses, useCreateAgencyExpense, useDeleteAgencyExpense,
  useCrmStats, useClients,
} from "@/hooks/useCrmData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  ArrowLeft, Plus, Trash2, DollarSign, TrendingUp, Calculator, Receipt,
  CalendarDays, Users, ChevronDown, ChevronUp,
} from "lucide-react";

const CrmAccounting = () => {
  const navigate = useNavigate();
  const { isSuperAdmin, isLoading: roleLoading } = useIsSuperAdmin();
  const { data: stats } = useCrmStats();
  const { data: allFinances } = useAllFinances();
  const { data: clients } = useClients();
  const { data: agencyExpenses } = useAgencyExpenses();
  const createAgencyExpense = useCreateAgencyExpense();
  const deleteAgencyExpense = useDeleteAgencyExpense();

  const [filterMonth, setFilterMonth] = useState<string>("all");
  const [filterClient, setFilterClient] = useState<string>("all");
  const [showAgencyExpForm, setShowAgencyExpForm] = useState(false);
  const [agencyExpForm, setAgencyExpForm] = useState({ title: "", amount: "", description: "", period: "" });
  const [expandedClient, setExpandedClient] = useState<string | null>(null);

  const formatMoney = (n: number) =>
    new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(n);

  if (roleLoading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400">Загрузка...</div>;
  if (!isSuperAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400">
        <p>Доступ запрещён</p>
      </div>
    );
  }

  // Collect all unique months from payments
  const allMonths = new Set<string>();
  allFinances?.forEach((f: any) => {
    (f.crm_payments || []).forEach((p: any) => {
      if (p.payment_date) {
        const d = new Date(p.payment_date);
        allMonths.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
      }
    });
    if (f.period) allMonths.add(f.period);
  });
  agencyExpenses?.forEach(e => { if (e.period) allMonths.add(e.period); });
  const monthsList = Array.from(allMonths).sort().reverse();

  // Build per-client breakdown
  const clientMap: Record<string, { name: string; finances: any[] }> = {};
  allFinances?.forEach((f: any) => {
    const cid = f.client_id || f.crm_clients?.id;
    const cname = f.crm_clients?.name || "Клиент";
    if (!clientMap[cid]) clientMap[cid] = { name: cname, finances: [] };
    clientMap[cid].finances.push(f);
  });

  // Filter payments by month
  const getFinPayments = (f: any) => {
    const payments = (f.crm_payments || []) as any[];
    if (filterMonth === "all") return payments;
    return payments.filter((p: any) => {
      const d = new Date(p.payment_date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}` === filterMonth;
    });
  };
  const getFinTotal = (f: any) => getFinPayments(f).reduce((s: number, p: any) => s + Number(p.amount), 0);

  // Totals
  const filteredFinances = allFinances?.filter((f: any) => {
    if (filterClient !== "all" && (f.client_id || f.crm_clients?.id) !== filterClient) return false;
    return true;
  }) ?? [];

  const totalRevenue = filteredFinances.reduce((s, f) => s + getFinTotal(f), 0);
  const totalContractors = filteredFinances.reduce((s, f: any) =>
    s + (f.crm_contractors?.reduce((cs: number, c: any) => cs + Number(c.amount), 0) ?? 0), 0);
  const totalCashOut = filteredFinances.reduce((s, f: any) =>
    s + (f.cash_out_percent ? (getFinTotal(f) * Number(f.cash_out_percent)) / 100 : 0), 0);

  // Client-level expenses from crm_expenses
  const totalClientExpenses = filteredFinances.reduce((s, f: any) => {
    const exps = f.crm_expenses || [];
    return s + exps.reduce((es: number, e: any) => es + Number(e.amount), 0);
  }, 0);

  // Agency expenses filtered by month
  const filteredAgencyExp = agencyExpenses?.filter(e => {
    if (filterMonth === "all") return true;
    return e.period === filterMonth;
  }) ?? [];
  const totalAgencyExp = filteredAgencyExp.reduce((s, e) => s + Number(e.amount), 0);

  const netProfit = totalRevenue - totalContractors - totalCashOut - totalClientExpenses - totalAgencyExp;

  // Partner shares
  let alexanderTotal = 0;
  let ilyaTotal = 0;
  if (totalRevenue > 0 && netProfit > 0) {
    const alexWeighted = filteredFinances.reduce((s, f) =>
      s + Number(f.alexander_percent) * (getFinTotal(f) / totalRevenue), 0);
    const ilyaWeighted = filteredFinances.reduce((s, f) =>
      s + Number(f.ilya_percent) * (getFinTotal(f) / totalRevenue), 0);
    if (alexWeighted + ilyaWeighted > 0) {
      alexanderTotal = (netProfit * alexWeighted) / (alexWeighted + ilyaWeighted);
      ilyaTotal = (netProfit * ilyaWeighted) / (alexWeighted + ilyaWeighted);
    }
  }

  // Per-client stats
  const clientEntries = Object.entries(clientMap)
    .filter(([cid]) => filterClient === "all" || cid === filterClient)
    .map(([cid, data]) => {
      const rev = data.finances.reduce((s, f) => s + getFinTotal(f), 0);
      const con = data.finances.reduce((s, f: any) =>
        s + (f.crm_contractors?.reduce((cs: number, c: any) => cs + Number(c.amount), 0) ?? 0), 0);
      const cash = data.finances.reduce((s, f: any) =>
        s + (f.cash_out_percent ? (getFinTotal(f) * Number(f.cash_out_percent)) / 100 : 0), 0);
      const exps = data.finances.reduce((s, f: any) =>
        s + ((f.crm_expenses || []).reduce((es: number, e: any) => es + Number(e.amount), 0)), 0);
      return { id: cid, name: data.name, finances: data.finances, revenue: rev, contractors: con, cashOut: cash, expenses: exps, profit: rev - con - cash - exps };
    })
    .sort((a, b) => b.revenue - a.revenue);

  const handleAddAgencyExpense = async () => {
    if (!agencyExpForm.title || !agencyExpForm.amount) return;
    await createAgencyExpense.mutateAsync({
      title: agencyExpForm.title,
      amount: Number(agencyExpForm.amount),
      description: agencyExpForm.description || undefined,
      period: agencyExpForm.period || undefined,
    });
    setShowAgencyExpForm(false);
    setAgencyExpForm({ title: "", amount: "", description: "", period: "" });
    toast({ title: "Расход добавлен" });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Button variant="ghost" size="icon" onClick={() => navigate("/crm")} className="text-gray-500 hover:text-gray-900 shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#fa3714] flex items-center justify-center shrink-0">
                <Calculator className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-base sm:text-xl font-bold text-gray-900">Бухгалтерия</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={filterMonth} onValueChange={setFilterMonth}>
            <SelectTrigger className="w-full sm:w-[200px] bg-white border-gray-300 text-gray-900 h-9 text-sm">
              <SelectValue placeholder="Месяц" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 shadow-lg z-50">
              <SelectItem value="all">Все месяцы</SelectItem>
              {monthsList.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterClient} onValueChange={setFilterClient}>
            <SelectTrigger className="w-full sm:w-[250px] bg-white border-gray-300 text-gray-900 h-9 text-sm">
              <SelectValue placeholder="Клиент" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 shadow-lg z-50">
              <SelectItem value="all">Все клиенты</SelectItem>
              {clients?.filter(c => c.status !== "potential").map(c => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-3 sm:p-5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-500 flex items-center justify-center mb-2">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <p className="text-lg sm:text-2xl font-bold text-green-600">{formatMoney(totalRevenue)}</p>
              <p className="text-xs text-gray-500">Выручка</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200">
            <CardContent className="p-3 sm:p-5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-red-500 flex items-center justify-center mb-2">
                <Receipt className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <p className="text-lg sm:text-2xl font-bold text-red-500">{formatMoney(totalContractors + totalCashOut + totalClientExpenses + totalAgencyExp)}</p>
              <p className="text-xs text-gray-500">Расходы всего</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200">
            <CardContent className="p-3 sm:p-5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-500 flex items-center justify-center mb-2">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <p className={`text-lg sm:text-2xl font-bold ${netProfit >= 0 ? "text-purple-600" : "text-red-600"}`}>{formatMoney(netProfit)}</p>
              <p className="text-xs text-gray-500">Чистая прибыль</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200">
            <CardContent className="p-3 sm:p-5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500 flex items-center justify-center mb-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <p className="text-lg sm:text-2xl font-bold text-blue-600">{clientEntries.length}</p>
              <p className="text-xs text-gray-500">Клиентов с оплатами</p>
            </CardContent>
          </Card>
        </div>

        {/* Partner earnings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-blue-700 font-medium">Александр</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">{formatMoney(alexanderTotal)}</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-2">
                <Calculator className="w-5 h-5 text-purple-600" />
                <p className="text-sm text-purple-700 font-medium">Илья</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-purple-600">{formatMoney(ilyaTotal)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Expense breakdown */}
        <Card className="bg-white border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
              <Receipt className="w-5 h-5 text-red-500" /> Детализация расходов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { label: "Исполнители", amount: totalContractors, color: "text-orange-600" },
                { label: "Обнал", amount: totalCashOut, color: "text-yellow-600" },
                { label: "Расходы по клиентам", amount: totalClientExpenses, color: "text-red-500" },
                { label: "Расходы агентства", amount: totalAgencyExp, color: "text-pink-600" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 sm:px-4 py-3">
                  <p className="text-sm text-gray-700">{item.label}</p>
                  <span className={`text-base font-bold ${item.color}`}>{formatMoney(item.amount)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Per-client breakdown */}
        <Card className="bg-white border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
              <DollarSign className="w-5 h-5 text-green-500" /> По клиентам
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {!clientEntries.length ? (
              <p className="text-gray-400 text-center py-6">Данных нет</p>
            ) : clientEntries.map(ce => (
              <div key={ce.id}>
                <button
                  className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-lg px-3 sm:px-4 py-3 transition-colors"
                  onClick={() => setExpandedClient(expandedClient === ce.id ? null : ce.id)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {expandedClient === ce.id ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                    <p className="text-sm font-medium text-gray-900 truncate">{ce.name}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-sm text-green-600 font-bold">{formatMoney(ce.revenue)}</span>
                    <span className={`text-sm font-bold ${ce.profit >= 0 ? "text-purple-600" : "text-red-500"}`}>{formatMoney(ce.profit)}</span>
                  </div>
                </button>
                {expandedClient === ce.id && (
                  <div className="ml-8 mt-1 space-y-1 mb-2">
                    <div className="flex justify-between text-xs text-gray-500 px-3 py-1">
                      <span>Выручка</span><span className="text-green-600">{formatMoney(ce.revenue)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 px-3 py-1">
                      <span>Исполнители</span><span className="text-orange-600">-{formatMoney(ce.contractors)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 px-3 py-1">
                      <span>Обнал</span><span className="text-yellow-600">-{formatMoney(ce.cashOut)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 px-3 py-1">
                      <span>Расходы</span><span className="text-red-500">-{formatMoney(ce.expenses)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-medium text-gray-700 px-3 py-1 border-t border-gray-200">
                      <span>Прибыль</span><span className={ce.profit >= 0 ? "text-purple-600" : "text-red-500"}>{formatMoney(ce.profit)}</span>
                    </div>
                    {/* Per-finance entries */}
                    {ce.finances.map((f: any) => {
                      const fTotal = getFinTotal(f);
                      if (fTotal === 0 && filterMonth !== "all") return null;
                      return (
                        <div key={f.id} className="bg-white border border-gray-100 rounded-md px-3 py-2 mt-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500">{f.period}</span>
                            <span className="text-green-600 font-medium">{formatMoney(fTotal)}</span>
                          </div>
                          <div className="flex gap-3 text-[11px] text-gray-400 mt-0.5">
                            <span>Александр: {f.alexander_percent}%</span>
                            <span>Илья: {f.ilya_percent}%</span>
                            {f.cash_out_percent > 0 && <span>Обнал: {f.cash_out_percent}%</span>}
                          </div>
                          {/* Payments */}
                          {getFinPayments(f).sort((a: any, b: any) => new Date(a.payment_date).getTime() - new Date(b.payment_date).getTime()).map((p: any) => (
                            <div key={p.id} className="flex justify-between text-[11px] text-gray-400 mt-0.5 pl-2 border-l-2 border-green-200">
                              <span>
                                <CalendarDays className="w-3 h-3 inline mr-1" />
                                {new Date(p.payment_date).toLocaleDateString("ru")}
                                {p.description && <span className="ml-1">· {p.description}</span>}
                              </span>
                              <span className="text-green-600">{formatMoney(Number(p.amount))}</span>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Agency expenses (free payments) */}
        <Card className="bg-white border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                <Receipt className="w-5 h-5 text-orange-500" /> Общие расходы агентства
              </CardTitle>
              <Button size="sm" onClick={() => setShowAgencyExpForm(true)} className="bg-[#fa3714] hover:bg-[#e0300f] text-white">
                <Plus className="w-4 h-4 mr-1" /> Добавить
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Расходы, не привязанные к конкретному клиенту</p>
          </CardHeader>
          <CardContent className="space-y-2">
            {!filteredAgencyExp.length ? (
              <p className="text-gray-400 text-center py-6">Расходов нет</p>
            ) : (
              <>
                {filteredAgencyExp.map(e => (
                  <div key={e.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 sm:px-4 py-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{e.title}</p>
                      <div className="flex gap-3 text-xs text-gray-400 mt-0.5">
                        {e.period && <span>{e.period}</span>}
                        {e.description && <span className="truncate">{e.description}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-base font-bold text-orange-600">{formatMoney(Number(e.amount))}</span>
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
                  <p className="text-sm text-gray-500">Итого: <span className="font-bold text-orange-600">{formatMoney(totalAgencyExp)}</span></p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Итоговая сводка — кто кому должен */}
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-none text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="w-5 h-5" /> Итоговая сводка
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400">Выручка</p>
                <p className="text-xl font-bold text-green-400">{formatMoney(totalRevenue)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Все расходы</p>
                <p className="text-xl font-bold text-red-400">{formatMoney(totalContractors + totalCashOut + totalClientExpenses + totalAgencyExp)}</p>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-3">
              <p className="text-xs text-gray-400 mb-1">Чистая прибыль</p>
              <p className={`text-2xl font-bold ${netProfit >= 0 ? "text-green-400" : "text-red-400"}`}>{formatMoney(netProfit)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-gray-700 pt-3">
              <div>
                <p className="text-xs text-gray-400">Александр</p>
                <p className="text-xl font-bold text-blue-400">{formatMoney(alexanderTotal)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Илья</p>
                <p className="text-xl font-bold text-purple-400">{formatMoney(ilyaTotal)}</p>
              </div>
            </div>
            {alexanderTotal !== ilyaTotal && netProfit > 0 && (
              <div className="border-t border-gray-700 pt-3">
                <p className="text-xs text-gray-400 mb-1">Баланс</p>
                {alexanderTotal > ilyaTotal ? (
                  <p className="text-sm text-gray-300">Александр получает на <span className="text-yellow-400 font-bold">{formatMoney(alexanderTotal - ilyaTotal)}</span> больше</p>
                ) : (
                  <p className="text-sm text-gray-300">Илья получает на <span className="text-yellow-400 font-bold">{formatMoney(ilyaTotal - alexanderTotal)}</span> больше</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Agency expense dialog */}
      <Dialog open={showAgencyExpForm} onOpenChange={setShowAgencyExpForm}>
        <DialogContent className="bg-white border-gray-200 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Новый расход агентства</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div><Label className="text-gray-700">Название</Label><Input value={agencyExpForm.title} onChange={e => setAgencyExpForm(p => ({ ...p, title: e.target.value }))} className="bg-gray-50 border-gray-300" /></div>
            <div><Label className="text-gray-700">Сумма (₽)</Label><Input type="number" value={agencyExpForm.amount} onChange={e => setAgencyExpForm(p => ({ ...p, amount: e.target.value }))} className="bg-gray-50 border-gray-300" /></div>
            <div><Label className="text-gray-700">Месяц (ГГГГ-ММ)</Label><Input placeholder="2026-02" value={agencyExpForm.period} onChange={e => setAgencyExpForm(p => ({ ...p, period: e.target.value }))} className="bg-gray-50 border-gray-300" /></div>
            <div><Label className="text-gray-700">Описание</Label><Textarea value={agencyExpForm.description} onChange={e => setAgencyExpForm(p => ({ ...p, description: e.target.value }))} className="bg-gray-50 border-gray-300" /></div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddAgencyExpense} className="bg-[#fa3714] hover:bg-[#e0300f] text-white w-full">Добавить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CrmAccounting;
