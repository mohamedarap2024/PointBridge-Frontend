import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquareQuote,
  Shield,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/messages", label: "Messages", icon: Mail },
  { to: "/admin/testimonials", label: "Feedback", icon: MessageSquareQuote },
  { to: "/admin/images", label: "Images", icon: ImageIcon },
  { to: "/admin/users", label: "Users", icon: Users },
] as const;

export function AdminShell() {
  const { user, logout } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-[oklch(0.97_0.01_255)]">
      <div className="flex min-h-dvh">
        <aside className="hidden w-72 shrink-0 border-r border-border/60 bg-[oklch(0.16_0.06_260)] text-white lg:flex lg:flex-col">
          <div className="border-b border-white/10 px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/20 text-secondary">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">PointBridge</p>
                <p className="text-xs text-white/60">Admin Dashboard</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-white/10 text-white shadow-inner"
                      : "text-white/70 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="rounded-xl bg-white/5 px-4 py-3">
              <p className="truncate text-sm font-medium">{user?.name}</p>
              <p className="truncate text-xs text-white/60">{user?.email}</p>
            </div>
            <Button
              variant="ghost"
              className="mt-3 w-full justify-start text-white/80 hover:bg-white/10 hover:text-white"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-border/60 bg-white/90 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">Admin Panel</p>
                <h1 className="text-lg font-bold text-foreground">PointBridge Control Center</h1>
              </div>
              <div className="flex items-center gap-2 lg:hidden">
                <Button asChild variant="outline" size="sm">
                  <Link to="/">View Site</Link>
                </Button>
              </div>
              <Button asChild variant="outline" size="sm" className="hidden lg:inline-flex">
                <Link to="/">View Website</Link>
              </Button>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto lg:hidden">
              {navItems.map((item) => {
                const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "shrink-0 rounded-full px-4 py-2 text-xs font-semibold",
                      active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
