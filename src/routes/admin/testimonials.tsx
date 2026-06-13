import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { adminApi, type Testimonial } from "@/lib/admin-api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin/testimonials")({
  head: () => ({ meta: [{ title: "Feedback — Admin" }] }),
  component: AdminTestimonialsPage,
});

function TestimonialCard({ item }: { item: Testimonial }) {
  const queryClient = useQueryClient();
  const [name, setName] = useState(item.name);
  const [role, setRole] = useState(item.role);
  const [quote, setQuote] = useState(item.quote);
  const [approved, setApproved] = useState(item.approved);

  const saveMutation = useMutation({
    mutationFn: () => adminApi.updateTestimonial(item.id, { name, role, quote, approved }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      toast.success("Feedback updated");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => adminApi.deleteTestimonial(item.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      toast.success("Feedback deleted");
    },
  });

  return (
    <Card className="border-border/60">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base">{item.name}</CardTitle>
          <Badge variant={approved ? "default" : "secondary"}>{approved ? "Approved" : "Pending"}</Badge>
        </div>
        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteMutation.mutate()}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <Label htmlFor={`name-${item.id}`}>Name</Label>
            <Input id={`name-${item.id}`} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor={`role-${item.id}`}>Role</Label>
            <Input id={`role-${item.id}`} value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
        </div>
        <div>
          <Label htmlFor={`quote-${item.id}`}>Quote</Label>
          <Textarea id={`quote-${item.id}`} rows={3} value={quote} onChange={(e) => setQuote(e.target.value)} />
        </div>
        <div className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
          <div>
            <p className="text-sm font-medium">Show on website</p>
            <p className="text-xs text-muted-foreground">Approved feedback appears on the homepage.</p>
          </div>
          <Switch checked={approved} onCheckedChange={setApproved} />
        </div>
        <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
          Save changes
        </Button>
      </CardContent>
    </Card>
  );
}

function AdminTestimonialsPage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: adminApi.testimonials,
  });

  const createMutation = useMutation({
    mutationFn: () => adminApi.createTestimonial({ name, role, quote, approved: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      setName("");
      setRole("");
      setQuote("");
      setShowForm(false);
      toast.success("Feedback added");
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Customer Feedback</h2>
          <p className="mt-1 text-muted-foreground">Manage testimonials and approve public submissions.</p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Feedback
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>New Feedback</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Role / Organization" value={role} onChange={(e) => setRole(e.target.value)} />
            <Textarea placeholder="Quote" rows={3} value={quote} onChange={(e) => setQuote(e.target.value)} />
            <Button onClick={() => createMutation.mutate()} disabled={createMutation.isPending}>
              Save feedback
            </Button>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">Loading feedback…</div>
      ) : (
        <div className="grid gap-4">
          {data?.items.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
