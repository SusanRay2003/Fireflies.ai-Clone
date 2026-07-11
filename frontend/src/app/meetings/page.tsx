"use client";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { MeetingListItem } from "@/types";
import { MeetingCard } from "@/components/meetings/MeetingCard";
import { CreateMeetingModal } from "@/components/meetings/CreateMeetingModal";
import { MeetingNotebookSidebar } from "@/components/meetings/MeetingNotebookSidebar";
import { AskFredPanel } from "@/components/meetings/AskFredPanel";
import { MeetingFiltersPopover } from "@/components/meetings/MeetingFiltersPopover";
import { Video, Plus, Filter, Menu } from "lucide-react";
import toast from "react-hot-toast";

export default function MeetingsPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const [meetings, setMeetings] = useState<MeetingListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<"hosted" | "shared">("hosted");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const loadMeetings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.meetings.list(search);
      setMeetings(data);
    } catch {
      toast.error("Failed to load meetings");
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
  const fetchMeetings = async () => {
    await loadMeetings();
  };

  fetchMeetings();
}, [loadMeetings]);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this meeting?")) return;
    try {
      await api.meetings.delete(id);
      toast.success("Meeting deleted");
      await loadMeetings();
    } catch {
      toast.error("Failed to delete meeting");
    }
  };

  return (
    <div className="flex h-full bg-[#FAFAFC]">
      <div className="hidden w-[280px] flex-shrink-0 md:block">
        <MeetingNotebookSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/25 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-[#FAFAFC] transition-transform duration-150 ease-out md:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <MeetingNotebookSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#ECECEC] bg-white px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="rounded-full border border-[#ECECEC] p-2 text-[#666666] transition hover:bg-[#FAFAFC] hover:text-[#1F1F1F] md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#666666]">Workspace</p>
              <h2 className="text-xl font-semibold text-[#1F1F1F]">Meetings</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowFilters((current) => !current)}
                className="hidden items-center gap-2 rounded-full border border-[#ECECEC] bg-white px-4 py-2 text-sm font-semibold text-[#666666] transition hover:bg-[#FAFAFC] sm:inline-flex"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
              {showFilters && <MeetingFiltersPopover onClose={() => setShowFilters(false)} />}
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[#6D4AFF] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5A3FE6]"
            >
              <Plus className="h-4 w-4" />
              New meeting
            </button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1">
          <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
            <div className="mb-4 flex flex-wrap gap-2">
              {[
                { label: "Hosted by me", value: "hosted" as const },
                { label: "Shared with me", value: "shared" as const },
              ].map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setActiveTab(value)}
                  className={`rounded-full border px-3 py-2 text-sm transition duration-150 ease-out ${
                    activeTab === value
                      ? "border-[#D9D0FF] bg-[#F5F1FF] text-[#6D4AFF]"
                      : "border-[#ECECEC] bg-white text-[#666666] hover:bg-[#FAFAFC] hover:text-[#1F1F1F]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 animate-pulse rounded-[16px] border border-[#ECECEC] bg-white" />
                ))}
              </div>
            ) : meetings.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-[#ECECEC] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F1FF] text-[#6D4AFF]">
                  <Video className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#1F1F1F]">No meetings yet</h3>
                <p className="mt-2 text-sm leading-6 text-[#666666]">
                  Create a meeting or upload a transcript to get started.
                </p>
                <button
                  onClick={() => setShowCreate(true)}
                  className="mt-5 inline-flex items-center gap-2 rounded-[12px] bg-[#6D4AFF] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#5A3FE6]"
                >
                  <Plus className="h-4 w-4" />
                  Create meeting
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {meetings.map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </div>

          <AskFredPanel />
        </div>
      </div>

      {showCreate && (
        <CreateMeetingModal
          onClose={() => setShowCreate(false)}
          onCreated={() => {
            setShowCreate(false);
            void loadMeetings();
          }}
        />
      )}
    </div>
  );
}