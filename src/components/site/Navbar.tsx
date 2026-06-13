import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Calendar,
  ChevronDown,
  FileText,
  GraduationCap,
  Home,
  Info,
  LogIn,
  Menu,
  MessageCircle,
  Newspaper,
  UserPlus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { TopBar } from "./TopBar";
import { aboutLinks, mainNav, serviceLinks } from "@/lib/navigation";

const navIcons: Record<string, LucideIcon> = {
  "/": Home,
  "/training": GraduationCap,
  "/projects": Calendar,
  "/publications": FileText,
  "/blog": Newspaper,
  "/contact": MessageCircle,
};

const navItemClass =
  "inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors lg:px-2.5 lg:py-2 xl:gap-1.5 xl:px-3 xl:text-sm";

function NavLink({
  to,
  label,
  hash,
  active,
  onClick,
  icon: Icon,
}: {
  to: string;
  label: string;
  hash?: string;
  active?: boolean;
  onClick?: () => void;
  icon?: LucideIcon;
}) {
  return (
    <Link
      to={to}
      hash={hash}
      onClick={onClick}
      className={`relative ${navItemClass} ${
        active
          ? "text-primary after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:rounded-full after:bg-secondary xl:after:left-3 xl:after:right-3"
          : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
      }`}
    >
      {Icon && <Icon className="hidden h-3.5 w-3.5 shrink-0 opacity-80 xl:inline-flex xl:h-4 xl:w-4" />}
      {label}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isAboutActive = pathname === "/about" || pathname === "/projects";
  const isServicesActive = pathname === "/services";

  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <nav className="border-b border-border/60 bg-gradient-to-b from-white to-[oklch(0.98_0.005_255)] shadow-[0_4px_24px_oklch(0.24_0.07_260/0.08)]">
        <div className="mx-auto grid min-h-[72px] max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-2 sm:min-h-[76px] sm:px-6 sm:gap-4 lg:min-h-[80px] lg:px-8 lg:gap-5">
          <Link
            to="/"
            className="inline-flex shrink-0 items-center py-1 transition-opacity hover:opacity-90"
            aria-label="PointBridge Consulting — Home"
          >
            <Logo variant="navbar" />
          </Link>

          <div className="hidden min-w-0 items-center justify-center lg:flex">
            <ul className="flex flex-wrap items-center justify-center gap-0.5 xl:gap-1">
              <li>
                <NavLink to="/" label="Home" active={pathname === "/"} icon={Home} />
              </li>

              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={`${navItemClass} outline-none hover:bg-primary/5 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/30 ${
                      isAboutActive ? "text-primary" : "text-foreground/80"
                    }`}
                  >
                    <Info className="hidden h-3.5 w-3.5 opacity-80 xl:inline-flex xl:h-4 xl:w-4" />
                    About
                    <ChevronDown className="h-3 w-3 opacity-60 xl:h-3.5 xl:w-3.5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-[200px]">
                    {aboutLinks.map((l) => (
                      <DropdownMenuItem key={l.label} asChild>
                        <Link to={l.to} hash={"hash" in l ? l.hash : undefined} className="cursor-pointer">
                          {l.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>

              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={`${navItemClass} outline-none hover:bg-primary/5 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/30 ${
                      isServicesActive ? "text-primary" : "text-foreground/80"
                    }`}
                  >
                    <Briefcase className="hidden h-3.5 w-3.5 opacity-80 xl:inline-flex xl:h-4 xl:w-4" />
                    Services
                    <ChevronDown className="h-3 w-3 opacity-60 xl:h-3.5 xl:w-3.5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="max-h-[320px] min-w-[280px] overflow-y-auto">
                    {serviceLinks.map((l) => (
                      <DropdownMenuItem key={l.hash} asChild>
                        <Link to={l.to} hash={l.hash} className="cursor-pointer text-sm">
                          {l.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>

              {mainNav.slice(1).map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    label={l.label}
                    active={pathname === l.to}
                    icon={navIcons[l.to]}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="flex shrink-0 items-center justify-end gap-3 sm:gap-4 lg:gap-3 lg:border-l lg:border-border/40 lg:pl-4 xl:gap-4 xl:pl-5">
            <div className="hidden items-center gap-3 sm:flex lg:gap-3 xl:gap-4">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-9 min-w-[104px] justify-center rounded-full border-primary/40 px-4 text-primary shadow-sm hover:bg-primary/5 xl:h-10 xl:min-w-[112px] xl:px-5"
              >
                <Link to="/login">
                  <LogIn className="mr-1.5 h-4 w-4 shrink-0" />
                  Sign In
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="h-9 min-w-[104px] justify-center rounded-full bg-primary px-4 shadow-md hover:bg-primary/90 xl:h-10 xl:min-w-[112px] xl:px-5"
              >
                <Link to="/signup">
                  <UserPlus className="mr-1.5 h-4 w-4 shrink-0" />
                  Sign Up
                </Link>
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 shrink-0 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {open && (
          <div className="border-t border-border bg-background lg:hidden">
            <ul className="space-y-1 px-4 py-4">
              <li>
                <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted">
                  <Home className="h-4 w-4" /> Home
                </Link>
              </li>
              {/* About & Services accordions - same as before */}
              <li>
                <button type="button" onClick={() => setAboutOpen((v) => !v)} className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted">
                  <span className="flex items-center gap-2"><Info className="h-4 w-4" /> About</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${aboutOpen ? "rotate-180" : ""}`} />
                </button>
                {aboutOpen && (
                  <ul className="ml-3 mt-1 space-y-1 border-l border-border pl-3">
                    {aboutLinks.map((l) => (
                      <li key={l.label}>
                        <Link to={l.to} hash={"hash" in l ? l.hash : undefined} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-primary">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <button type="button" onClick={() => setServicesOpen((v) => !v)} className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted">
                  <span className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> Services</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
                {servicesOpen && (
                  <ul className="ml-3 mt-1 max-h-48 space-y-1 overflow-y-auto border-l border-border pl-3">
                    {serviceLinks.map((l) => (
                      <li key={l.hash}>
                        <Link to={l.to} hash={l.hash} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-primary">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              {mainNav.slice(1).map((l) => {
                const Icon = navIcons[l.to];
                return (
                  <li key={l.to}>
                    <Link to={l.to} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted">
                      {Icon && <Icon className="h-4 w-4" />} {l.label}
                    </Link>
                  </li>
                );
              })}
              <li className="grid grid-cols-2 gap-3 pt-3 sm:hidden">
                <Button asChild variant="outline" className="h-11 rounded-full">
                  <Link to="/login" onClick={() => setOpen(false)}><LogIn className="mr-1.5 h-4 w-4" /> Sign In</Link>
                </Button>
                <Button asChild className="h-11 rounded-full bg-primary">
                  <Link to="/signup" onClick={() => setOpen(false)}><UserPlus className="mr-1.5 h-4 w-4" /> Sign Up</Link>
                </Button>
              </li>
              <li className="flex justify-center pt-4">
                <SocialLinks variant="footer" />
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
