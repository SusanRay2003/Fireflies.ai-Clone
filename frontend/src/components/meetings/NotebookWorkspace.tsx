"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { MeetingListItem } from "@/types";
import { MeetingCard } from "@/components/meetings/MeetingCard";
import { MeetingNotebookSidebar } from "@/components/meetings/MeetingNotebookSidebar";
import { AskFredPanel } from "@/components/meetings/AskFredPanel";
import { MeetingFiltersPopover } from "@/components/meetings/MeetingFiltersPopover";
import { CaptureDropdown } from "@/components/meetings/CaptureDropdown";
import { NotebookEmptyIllustration } from "@/components/meetings/NotebookEmptyIllustration";
import {
  getNotebookViewState,
  filterMeetingsByView,
  NotebookView,
  MineFilter,
} from "@/lib/notebookViews";
import { Filter, Menu, Search, Plus } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  view: NotebookView;
  defaultMineFilter?: MineFilter;
}

export function NotebookWorkspace({ view, defaultMineFilter = "shared" }: Props) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const router = useRouter();

  const [meetings, setMeetings] = useState<MeetingListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [mineFilter, setMineFilter] = useState<MineFilter>(defaultMineFilter);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const viewState = getNotebookViewState(view, mineFilter);
  const filteredMeetings = filterMeetingsByView(meetings, view, mineFilter);

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
    void loadMeetings();
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

  const handleMineFilterToggle = (filter: MineFilter) => {
    setMineFilter(filter);
  };

  const handleMineFilterClear = (filter: MineFilter) => {
    setMineFilter(filter === "hosted" ? "shared" : "hosted");
  };

  const handleCreateVoiceAgent = () => {
    router.push("/voice-agents");
  };

  return (
    <div className="flex h-[calc(100vh-96px)] min-h-0 bg-[#FAFAFC]">
      <div className="hidden w-[240px] flex-shrink-0 md:block">
        <MeetingNotebookSidebar />
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
        className={`fixed inset-y-0 left-0 z-50 w-[240px] bg-[#FAFAFC] transition-transform duration-150 ease-out md:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <MeetingNotebookSidebar onNavigate={() => setMobileSidebarOpen(false)} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-white">
        <div className="flex items-center justify-between border-b border-[#ECECEC] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="rounded-md p-2 text-[#666666] transition hover:bg-[#F0F0F4] hover:text-[#1F1F1F] md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
            <h2 className="text-base font-semibold text-[#1F1F1F]">{viewState.workspaceTitle}</h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowFilters((current) => !current)}
                className="inline-flex items-center gap-2 rounded-full border border-[#ECECEC] bg-white px-4 py-2 text-sm font-medium text-[#666666] transition hover:bg-[#F5F5F7]"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
              {showFilters && <MeetingFiltersPopover onClose={() => setShowFilters(false)} />}
            </div>
            <button
              type="button"
              className="rounded-full p-2 text-[#666666] transition hover:bg-[#F0F0F4] hover:text-[#1F1F1F]"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1">
          <div className="flex-1 overflow-y-auto bg-[#FAFAFC] px-4 py-6 sm:px-6">
            {viewState.showFilterPills && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {(
                  [
                    { label: "Hosted by me", value: "hosted" as const },
                    { label: "Shared with me", value: "shared" as const },
                  ] as const
                ).map(({ label, value }) => {
                  const isActive = mineFilter === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => !isActive && handleMineFilterToggle(value)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition duration-150 ease-out ${
                        isActive
                          ? "bg-[#6D4AFF] text-white"
                          : "bg-transparent text-[#666666] hover:bg-[#F0F0F4] hover:text-[#1F1F1F]"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}

            {loading ? (
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 animate-pulse rounded-lg bg-[#F0F0F4]" />
                ))}
              </div>
            ) : filteredMeetings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                {viewState.emptyState.showIllustration && <NotebookEmptyIllustration />}
                <h3 className="text-lg font-semibold text-[#1F1F1F]">{viewState.emptyState.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-[#666666]">
                  {viewState.emptyState.subtitle}
                </p>
                {viewState.emptyState.actionType === "capture" ? (
                  <div className="mt-6">
                    <CaptureDropdown variant="pill" />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleCreateVoiceAgent}
                    className="mt-6 inline-flex items-center gap-1 rounded-full bg-[#6D4AFF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5A3FE6]"
                  >
                    <Plus className="h-4 w-4" />
                    Create
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredMeetings.map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </div>

          <AskFredPanel
            quickActionPills={viewState.askFredPills}
            chatInputBadge={viewState.chatInputBadge}
          />
        </div>
      </div>
    </div>
  );
}
