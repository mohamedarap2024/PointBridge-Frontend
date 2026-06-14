import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquareQuote,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "pb-admin-sidebar-collapsed";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/messages", label: "Messages", icon: Mail },
  { to: "/admin/testimonials", label: "Feedback", icon: MessageSquareQuote },
  { to: "/admin/images", label: "Images", icon: ImageIcon },
  { to: "/admin/users", label: "Users", icon: Users },
] as const;

function NavItem({
  item,
  active,
  collapsed,
  onClick,
}: {
  item: (typeof navItems)[number];
  active: boolean;
  collapsed: boolean;
  onClick?: () => void;
}) {
  const Icon = item.icon;
  const link = (
    <Link
      to={item.to}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300",
        collapsed && "justify-center px-2",
        active
          ? "bg-gradient-to-r from-primary/90 to-primary text-white shadow-md shadow-primary/25"
          : "text-white/75 hover:bg-white/10 hover:text-white hover:translate-x-0.5",
      )}
    >
      <Icon className={cn("h-5 w-5 shrink-0", active && "text-white")} />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    );
  }

  return link;
}

export function AdminShell() {
  const { user, logout } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "true") setCollapsed(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleCollapsed = () => {
    setCollapsed((v) => {
      const next = !v;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  const sidebarContent = (isMobile = false) => (
    <>
      <div
        className={cn(
          "flex items-center border-b border-white/10 px-4 py-5",
          collapsed && !isMobile ? "justify-center px-2" : "gap-3",
        )}
      >
        <Link to="/admin" className={cn("shrink-0 transition-transform hover:scale-105", collapsed && !isMobile && "mx-auto")}>
          {collapsed && !isMobile ? (
            <img src="/pointbridge-logo.png" alt="PointBridge" className="h-10 w-10 object-contain brightness-0 invert" />
          ) : (
            <Logo variant="footer" className="max-h-10 brightness-0 invert" />
          )}
        </Link>
        {(!collapsed || isMobile) && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">Admin Panel</p>
            <p className="text-xs text-white/55">PointBridge Consulting</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          return (
            <NavItem
              key={item.to}
              item={item}
              active={active}
              collapsed={collapsed && !isMobile}
              onClick={isMobile ? () => setMobileOpen(false) : undefined}
            />
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        {(!collapsed || isMobile) && (
          <div className="mb-3 rounded-xl bg-white/5 px-3 py-3 backdrop-blur-sm">
            <p className="truncate text-sm font-medium text-white">{user?.name}</p>
            <p className="truncate text-xs text-white/55">{user?.email}</p>
          </div>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full text-white/80 transition-all duration-300 hover:bg-red-500/15 hover:text-red-200",
                collapsed && !isMobile ? "justify-center px-2" : "justify-start",
              )}
              onClick={logout}
            >
              <LogOut className={cn("h-4 w-4", (!collapsed || isMobile) && "mr-2")} />
              {(!collapsed || isMobile) && "Log out"}
            </Button>
          </TooltipTrigger>
          {collapsed && !isMobile && <TooltipContent side="right">Log out</TooltipContent>}
        </Tooltip>
      </div>
    </>
  );

  return (
    <TooltipProvider delayDuration={0}>
      <div className="min-h-dvh bg-[linear-gradient(160deg,oklch(0.97_0.012_255)_0%,oklch(0.99_0.005_255)_45%,oklch(0.96_0.02_230)_100%)]">
        <div className="flex min-h-dvh">
          {/* Desktop sidebar */}
          <motion.aside
            initial={false}
            animate={{ width: collapsed ? 76 : 288 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden shrink-0 flex-col overflow-hidden border-r border-white/10 bg-[linear-gradient(180deg,oklch(0.16_0.06_260)_0%,oklch(0.20_0.07_258)_100%)] text-white lg:flex"
          >
            {sidebarContent()}
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border/40 bg-white text-primary shadow-md transition-transform hover:scale-110"
            >
              {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
            </button>
          </motion.aside>

          {/* Mobile sidebar overlay */}
          {mobileOpen && (
            <>
              <button
                type="button"
                aria-label="Close menu"
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[linear-gradient(180deg,oklch(0.16_0.06_260)_0%,oklch(0.20_0.07_258)_100%)] text-white shadow-2xl lg:hidden"
              >
                <button
                  type="button"
                  className="absolute right-3 top-4 rounded-lg p-1 text-white/70 hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
                {sidebarContent(true)}
              </motion.aside>
            </>
          )}

          <div className="flex min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-20 border-b border-border/50 bg-white/85 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setMobileOpen(true)}
                    aria-label="Open menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/70 sm:text-xs">
                      Admin Panel
                    </p>
                    <h1 className="text-base font-bold text-foreground sm:text-lg">PointBridge Control Center</h1>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="rounded-full transition-transform hover:scale-105">
                  <Link to="/">View Website</Link>
                </Button>
              </div>
            </header>

            <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
