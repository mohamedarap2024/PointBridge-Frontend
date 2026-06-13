import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AuthField } from "@/components/site/AuthLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login — PointBridge" }] }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setLoading(true);
    try {
      const user = await login(String(data.email), String(data.password));
      if (user.role !== "admin") {
        toast.error("This account does not have admin access.");
        return;
      }
      toast.success("Welcome back, admin.");
      navigate({ to: "/admin" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[radial-gradient(circle_at_top,oklch(0.92_0.04_255),oklch(0.98_0.01_255))] px-4 py-10">
      <Card className="w-full max-w-md border-border/60 shadow-elegant">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Shield className="h-7 w-7" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Sign in to manage messages, feedback, images and users.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-4">
            <AuthField id="email" label="Email" type="email" autoComplete="email" />
            <AuthField id="password" label="Password" type="password" autoComplete="current-password" />
            <Button type="submit" className="w-full rounded-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign In to Admin"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link to="/" className="font-medium text-primary hover:underline">
              Back to website
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
