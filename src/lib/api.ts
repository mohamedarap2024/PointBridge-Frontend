const API_BASE = import.meta.env.VITE_API_URL ?? "";

export type ContactPayload = {
  name: string;
  email: string;
  org?: string;
  subject: string;
  message: string;
};

export async function submitContact(data: ContactPayload) {
  const response = await fetch(`${API_BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? "Failed to send message");
  }

  return response.json() as Promise<{ ok: true; message: string }>;
}
