import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { adminApi, type AdminUser } from "@/lib/admin-api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Users — Admin" }] }),
  component: AdminUsersPage,
});

function UserCard({ item }: { item: AdminUser }) {
  const queryClient = useQueryClient();
  const [name, setName] = useState(item.name);
  const [role, setRole] = useState<"admin" | "user">(item.role as "admin" | "user");
  const [password, setPassword] = useState("");

  const saveMutation = useMutation({
    mutationFn: () =>
      adminApi.updateUser(item.id, {
        name,
        role,
        ...(password ? { password } : {}),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setPassword("");
      toast.success("User updated");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => adminApi.deleteUser(item.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      toast.success("User deleted");
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Could not delete user"),
  });

  return (
    <Card className="border-border/60">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base">{item.email}</CardTitle>
          <Badge variant={role === "admin" ? "default" : "secondary"}>{role}</Badge>
        </div>
        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteMutation.mutate()}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label>Role</Label>
          <Select value={role} onValueChange={(v) => setRole(v as "admin" | "user")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label>New password (optional)</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep current password" />
        </div>
        <div className="sm:col-span-2">
          <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
            Save user
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AdminUsersPage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "user">("user");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: adminApi.users,
  });

  const createMutation = useMutation({
    mutationFn: () => adminApi.createUser({ name, email, password, role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      setName("");
      setEmail("");
      setPassword("");
      setRole("user");
      setShowForm(false);
      toast.success("User created");
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Could not create user"),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Users</h2>
          <p className="mt-1 text-muted-foreground">Manage registered accounts stored in PostgreSQL.</p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>New User</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Select value={role} onValueChange={(v) => setRole(v as "admin" | "user")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Button className="sm:col-span-2" onClick={() => createMutation.mutate()} disabled={createMutation.isPending}>
              Create user
            </Button>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">Loading users…</div>
      ) : (
        <div className="grid gap-4">
          {data?.items.map((item) => (
            <UserCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
