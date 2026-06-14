import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, ImageIcon, Mail, MessageSquareQuote, Users } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { adminApi } from "@/lib/admin-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard — PointBridge" }] }),
  component: AdminDashboard,
});

const cardColors = [
  "from-primary/10 to-primary/5 border-primary/20",
  "from-secondary/15 to-secondary/5 border-secondary/25",
  "from-blue-500/10 to-blue-500/5 border-blue-500/20",
  "from-violet-500/10 to-violet-500/5 border-violet-500/20",
];

function StatCard({
  title,
  value,
  hint,
  icon: Icon,
  to,
  index,
}: {
  title: string;
  value: number;
  hint: string;
  icon: typeof Mail;
  to: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
    >
      <Card
        className={`overflow-hidden border bg-gradient-to-br shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant ${cardColors[index % cardColors.length]}`}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className="rounded-xl bg-white/80 p-2.5 text-primary shadow-sm">
            <Icon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight">{value}</div>
          <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
          <Button asChild variant="link" className="mt-3 h-auto px-0 text-primary">
            <Link to={to}>
              Manage <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: adminApi.stats,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-r from-[oklch(0.16_0.06_260)] via-[oklch(0.28_0.09_256)] to-[oklch(0.42_0.12_230)] p-6 text-white shadow-elegant sm:p-8"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Welcome back</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Dashboard Overview</h2>
            <p className="mt-2 max-w-xl text-sm text-white/80 sm:text-base">
              Manage contact messages, customer feedback, website images and registered users from one place.
            </p>
          </div>
          <div className="shrink-0 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <Logo variant="footer" className="max-h-12 brightness-0 invert" />
          </div>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Contact Messages"
          value={data?.contacts.total ?? 0}
          hint={`${data?.contacts.new ?? 0} new messages`}
          icon={Mail}
          to="/admin/messages"
          index={0}
        />
        <StatCard
          title="Feedback"
          value={data?.testimonials.total ?? 0}
          hint={`${data?.testimonials.pending ?? 0} pending approval`}
          icon={MessageSquareQuote}
          to="/admin/testimonials"
          index={1}
        />
        <StatCard
          title="Site Images"
          value={data?.images.total ?? 0}
          hint="Update image links across the website"
          icon={ImageIcon}
          to="/admin/images"
          index={2}
        />
        <StatCard
          title="Users"
          value={data?.users.total ?? 0}
          hint="Registered accounts in the database"
          icon={Users}
          to="/admin/users"
          index={3}
        />
      </div>
    </div>
  );
}
