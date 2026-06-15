const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
const TOKEN_KEY = "pb_token";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });

  const body = (await response.json().catch(() => null)) as { error?: string } | T | null;

  if (!response.ok) {
    throw new Error((body as { error?: string } | null)?.error ?? "Request failed");
  }

  return body as T;
}

export async function loginRequest(email: string, password: string) {
  return api<{ ok: true; token: string; user: AuthUser }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function signupRequest(data: {
  name: string;
  email: string;
  password: string;
  organization?: string;
}) {
  return api<{ ok: true; token: string; user: AuthUser }>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function fetchMe() {
  return api<{ user: AuthUser }>("/api/auth/me");
}

export type AdminStats = {
  contacts: { total: number; new: number };
  testimonials: { total: number; pending: number };
  images: { total: number };
  users: { total: number };
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  org: string | null;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  approved: boolean;
  createdAt: string;
};

export type SiteImage = {
  id: string;
  key: string;
  label: string;
  url: string;
  category: string;
  updatedAt: string;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export const adminApi = {
  stats: () => api<AdminStats>("/api/admin/stats"),
  contacts: () => api<{ items: ContactMessage[] }>("/api/admin/contacts"),
  updateContact: (id: string, status: ContactMessage["status"]) =>
    api<{ item: ContactMessage }>(`/api/admin/contacts/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  deleteContact: (id: string) =>
    api<{ ok: true }>(`/api/admin/contacts/${id}`, { method: "DELETE" }),
  testimonials: () => api<{ items: Testimonial[] }>("/api/admin/testimonials"),
  createTestimonial: (data: Pick<Testimonial, "name" | "role" | "quote" | "approved">) =>
    api<{ item: Testimonial }>("/api/admin/testimonials", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateTestimonial: (id: string, data: Partial<Pick<Testimonial, "name" | "role" | "quote" | "approved">>) =>
    api<{ item: Testimonial }>(`/api/admin/testimonials/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteTestimonial: (id: string) =>
    api<{ ok: true }>(`/api/admin/testimonials/${id}`, { method: "DELETE" }),
  images: () => api<{ items: SiteImage[] }>("/api/admin/images"),
  createImage: (data: Pick<SiteImage, "key" | "label" | "url" | "category">) =>
    api<{ item: SiteImage }>("/api/admin/images", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateImage: (id: string, data: Partial<Pick<SiteImage, "key" | "label" | "url" | "category">>) =>
    api<{ item: SiteImage }>(`/api/admin/images/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteImage: (id: string) =>
    api<{ ok: true }>(`/api/admin/images/${id}`, { method: "DELETE" }),
  users: () => api<{ items: AdminUser[] }>("/api/admin/users"),
  createUser: (data: { name: string; email: string; password: string; role: "admin" | "user" }) =>
    api<{ item: AdminUser }>("/api/admin/users", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateUser: (id: string, data: Partial<{ name: string; role: "admin" | "user"; password: string }>) =>
    api<{ item: AdminUser }>(`/api/admin/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteUser: (id: string) =>
    api<{ ok: true }>(`/api/admin/users/${id}`, { method: "DELETE" }),
};

export async function fetchPublicImages() {
  return api<{ items: SiteImage[]; map: Record<string, string> }>("/api/content/images");
}

export async function fetchPublicTestimonials() {
  return api<{ items: Testimonial[] }>("/api/content/testimonials");
}

export async function submitFeedback(data: { name: string; role: string; quote: string }) {
  return api<{ ok: true; message: string }>("/api/content/feedback", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
