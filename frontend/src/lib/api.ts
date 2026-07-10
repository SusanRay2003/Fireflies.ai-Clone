const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const api = {
  meetings: {
    list: (search?: string) =>
      request<import("@/types").MeetingListItem[]>(
        `/meetings/${search ? `?search=${encodeURIComponent(search)}` : ""}`
      ),
    get: (id: number) => request<import("@/types").MeetingDetail>(`/meetings/${id}`),
    create: (form: FormData) =>
      fetch(`${BASE_URL}/meetings/`, { method: "POST", body: form }).then(r => r.json()),
    update: (id: number, data: object) =>
      request(`/meetings/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
    delete: (id: number) =>
      request(`/meetings/${id}`, { method: "DELETE" }),
  },
  actionItems: {
    create: (meetingId: number, data: { text: string; assignee?: string }) =>
      request(`/meetings/${meetingId}/action-items`, { method: "POST", body: JSON.stringify(data) }),
    update: (meetingId: number, itemId: number, data: object) =>
      request(`/meetings/${meetingId}/action-items/${itemId}`, { method: "PATCH", body: JSON.stringify(data) }),
    delete: (meetingId: number, itemId: number) =>
      request(`/meetings/${meetingId}/action-items/${itemId}`, { method: "DELETE" }),
  },
  search: {
    global: (q: string) => request(`/search/?q=${encodeURIComponent(q)}`),
  },
};