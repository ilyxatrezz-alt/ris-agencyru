import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAllTasks, useUpdateTask, useDeleteTask, useTeamMembers, useClients } from "@/hooks/useCrmData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import {
  ArrowLeft, CheckCircle2, Clock, AlertCircle, Users, CalendarDays,
  ListTodo, Search, Trash2, Edit, Filter
} from "lucide-react";

const taskStatusIcons: Record<string, any> = {
  pending: <Clock className="w-5 h-5 text-yellow-500" />,
  in_progress: <AlertCircle className="w-5 h-5 text-blue-500" />,
  done: <CheckCircle2 className="w-5 h-5 text-green-500" />,
};
const statusLabels: Record<string, string> = { pending: "Ожидает", in_progress: "В работе", done: "Выполнена" };
const priorityLabels: Record<string, string> = { low: "Низкий", medium: "Средний", high: "Высокий" };
const priorityColors: Record<string, string> = {
  low: "border-gray-300 text-gray-500",
  medium: "border-yellow-400 text-yellow-600",
  high: "border-red-400 text-red-600",
};

const CrmTasks = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialAssignee = searchParams.get("assignee") || "all";
  const initialStatus = searchParams.get("status") || "active";

  const { data: allTasks } = useAllTasks();
  const { data: team } = useTeamMembers();
  const { data: clients } = useClients();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [assigneeFilter, setAssigneeFilter] = useState(initialAssignee);
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState<any>(null);
  const [editForm, setEditForm] = useState({ status: "", priority: "", due_date: "", assignee_id: "" });

  const filtered = allTasks?.filter(t => {
    // Status filter
    if (statusFilter === "active" && t.status !== "pending" && t.status !== "in_progress") return false;
    if (statusFilter === "done" && t.status !== "done") return false;
    if (statusFilter === "pending" && t.status !== "pending") return false;
    if (statusFilter === "in_progress" && t.status !== "in_progress") return false;

    // Assignee filter
    if (assigneeFilter !== "all") {
      if (assigneeFilter === "none" && t.assignee_id) return false;
      if (assigneeFilter !== "none" && t.assignee_id !== assigneeFilter) return false;
    }

    // Search
    if (search) {
      const q = search.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchClient = (t as any).crm_clients?.name?.toLowerCase().includes(q);
      if (!matchTitle && !matchClient) return false;
    }

    return true;
  }) ?? [];

  const openEdit = (task: any) => {
    setEditingTask(task);
    setEditForm({
      status: task.status,
      priority: task.priority,
      due_date: task.due_date || "",
      assignee_id: task.assignee_id || "",
    });
  };

  const handleSaveEdit = async () => {
    if (!editingTask) return;
    await updateTask.mutateAsync({
      id: editingTask.id,
      client_id: editingTask.client_id,
      status: editForm.status,
      priority: editForm.priority,
      due_date: editForm.due_date || null,
      assignee_id: editForm.assignee_id || null,
    });
    toast({ title: "Задача обновлена" });
    setEditingTask(null);
  };

  const handleQuickStatus = async (task: any, newStatus: string) => {
    await updateTask.mutateAsync({ id: task.id, client_id: task.client_id, status: newStatus });
    toast({ title: newStatus === "done" ? "Задача выполнена ✅" : "Статус обновлён" });
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
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500 flex items-center justify-center shrink-0">
                <ListTodo className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-base sm:text-xl font-bold text-gray-900 truncate">Все задачи</h1>
              <Badge className="bg-gray-100 text-gray-600 text-xs">{filtered.length}</Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4">
        {/* Filters */}
        <Card className="bg-white border-gray-200">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">Фильтры</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Search */}
              <div className="relative sm:col-span-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Поиск по задаче или клиенту..."
                  value={search} onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400" />
              </div>

              {/* Assignee filter */}
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">Ответственный</Label>
                <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                  <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg z-50">
                    <SelectItem value="all">Все</SelectItem>
                    {team?.map(m => (
                      <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                    ))}
                    <SelectItem value="none">Без ответственного</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status filter */}
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">Статус</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg z-50">
                    <SelectItem value="all">Все</SelectItem>
                    <SelectItem value="active">В работе</SelectItem>
                    <SelectItem value="pending">Ожидает</SelectItem>
                    <SelectItem value="in_progress">В процессе</SelectItem>
                    <SelectItem value="done">Выполненные</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks list */}
        {!filtered.length ? (
          <div className="text-center py-16 text-gray-400">
            <ListTodo className="w-12 h-12 mx-auto mb-3 text-gray-200" />
            <p>Задач по выбранным фильтрам нет</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((t: any) => (
              <Card key={t.id} className={`bg-white border-gray-200 hover:shadow-md transition-all ${
                t.status === "done" ? "opacity-60" : ""
              }`}>
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    {/* Quick status toggle */}
                    <button className="mt-1 shrink-0" onClick={() => {
                      const next = t.status === "done" ? "pending" : "done";
                      handleQuickStatus(t, next);
                    }}>
                      {taskStatusIcons[t.status] || taskStatusIcons.pending}
                    </button>

                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm sm:text-base ${t.status === "done" ? "line-through text-gray-400" : "text-gray-900"}`}>
                        {t.title}
                      </p>
                      {t.description && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{t.description}</p>
                      )}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {/* Client */}
                        <Badge variant="outline" className="border-[#fa3714]/30 text-[#fa3714] text-xs cursor-pointer"
                          onClick={() => navigate(`/crm/${t.client_id}`)}>
                          {t.crm_clients?.name || "Клиент"}
                        </Badge>
                        {/* Priority */}
                        <Badge variant="outline" className={`text-xs ${priorityColors[t.priority]}`}>
                          {priorityLabels[t.priority] || t.priority}
                        </Badge>
                        {/* Status */}
                        <Badge variant="outline" className="text-xs border-gray-300 text-gray-500">
                          {statusLabels[t.status] || t.status}
                        </Badge>
                        {/* Assignee */}
                        {t.crm_team_members?.name ? (
                          <Badge variant="outline" className="border-blue-300 text-blue-600 text-xs">
                            <Users className="w-3 h-3 mr-1" />{t.crm_team_members.name}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-gray-200 text-gray-400 text-xs">
                            Без ответственного
                          </Badge>
                        )}
                        {/* Due date */}
                        {t.due_date && (
                          <Badge variant="outline" className={`text-xs ${
                            new Date(t.due_date) < new Date() && t.status !== "done"
                              ? "border-red-300 text-red-600 bg-red-50"
                              : "border-gray-300 text-gray-500"
                          }`}>
                            <CalendarDays className="w-3 h-3 mr-1" />
                            {new Date(t.due_date).toLocaleDateString("ru")}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-blue-600"
                        onClick={() => openEdit(t)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-red-600"
                        onClick={async () => {
                          if (confirm("Удалить задачу?")) {
                            await deleteTask.mutateAsync({ id: t.id, client_id: t.client_id });
                            toast({ title: "Задача удалена" });
                          }
                        }}>
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

      {/* Edit task dialog */}
      <Dialog open={!!editingTask} onOpenChange={(o) => { if (!o) setEditingTask(null); }}>
        <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-md">
          <DialogHeader>
            <DialogTitle>Редактировать задачу</DialogTitle>
          </DialogHeader>
          {editingTask && (
            <div className="space-y-4 py-2">
              <p className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                <span className="font-medium text-gray-700">{editingTask.title}</span>
                <br />
                <span className="text-xs">Клиент: {editingTask.crm_clients?.name}</span>
              </p>

              <div>
                <Label className="text-sm">Статус</Label>
                <Select value={editForm.status} onValueChange={(v) => setEditForm({ ...editForm, status: v })}>
                  <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg z-50">
                    <SelectItem value="pending">Ожидает</SelectItem>
                    <SelectItem value="in_progress">В работе</SelectItem>
                    <SelectItem value="done">Выполнена</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Ответственный</Label>
                <Select value={editForm.assignee_id || "none"} onValueChange={(v) => setEditForm({ ...editForm, assignee_id: v === "none" ? "" : v })}>
                  <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg z-50">
                    <SelectItem value="none">Без ответственного</SelectItem>
                    {team?.map(m => (
                      <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Приоритет</Label>
                <Select value={editForm.priority} onValueChange={(v) => setEditForm({ ...editForm, priority: v })}>
                  <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg z-50">
                    <SelectItem value="low">Низкий</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="high">Высокий</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Дата выполнения</Label>
                <Input type="date" value={editForm.due_date}
                  onChange={(e) => setEditForm({ ...editForm, due_date: e.target.value })}
                  className="bg-gray-50 border-gray-300 text-gray-900 mt-1" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditingTask(null)} className="text-gray-500">Отмена</Button>
            <Button onClick={handleSaveEdit} className="bg-[#fa3714] hover:bg-[#e0300f] text-white"
              disabled={updateTask.isPending}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CrmTasks;
