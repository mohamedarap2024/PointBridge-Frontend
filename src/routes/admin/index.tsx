import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ImageIcon, Mail, MessageSquareQuote, Users } from "lucide-react";
import { adminApi } from "@/lib/admin-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard — PointBridge" }] }),
  component: AdminDashboard,
});

function StatCard({
  title,
  value,
  hint,
  icon: Icon,
  to,
}: {
  title: string;
  value: number;
  hint: string;
  icon: typeof Mail;
  to: string;
}) {
  return (
    <Card className="overflow-hidden border-border/60 shadow-sm transition-shadow hover:shadow-elegant">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="rounded-xl bg-primary/10 p-2 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
        <Button asChild variant="link" className="mt-3 h-auto px-0 text-primary">
          <Link to={to}>
            Manage <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: adminApi.stats,
  });

  if (isLoading) {
    return <div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">Loading dashboard…</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="mt-1 text-muted-foreground">
          Manage contact messages, customer feedback, website images and registered users.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Contact Messages"
          value={data?.contacts.total ?? 0}
          hint={`${data?.contacts.new ?? 0} new messages`}
          icon={Mail}
          to="/admin/messages"
        />
        <StatCard
          title="Feedback"
          value={data?.testimonials.total ?? 0}
          hint={`${data?.testimonials.pending ?? 0} pending approval`}
          icon={MessageSquareQuote}
          to="/admin/testimonials"
        />
        <StatCard
          title="Site Images"
          value={data?.images.total ?? 0}
          hint="Update image links across the website"
          icon={ImageIcon}
          to="/admin/images"
        />
        <StatCard
          title="Users"
          value={data?.users.total ?? 0}
          hint="Registered accounts in the database"
          icon={Users}
          to="/admin/users"
        />
      </div>
    </div>
  );
}
