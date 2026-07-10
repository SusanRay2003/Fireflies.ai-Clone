"use client";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { MeetingListItem } from "@/types";
import { MeetingCard } from "../../components/meetings/MeetingCard";
import { CreateMeetingModal } from "../../components/meetings/CreateMeetingModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { Video, Plus, Filter } from "lucide-react";
import toast from "react-hot-toast";

export default function MeetingsPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const [meetings, setMeetings] = useState<MeetingListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [activeTab, setActiveTab] = useState<"hosted" | "shared">("hosted");

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
      loadMeetings();
    } catch {
      toast.error("Failed to delete meeting");
    }
  };

  return (
    <div className="flex h-full">
      {/* Left sidebar */}
      <div className="w-56 border-r border-gray-200 bg-white p-3 flex-shrink-0">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">Meetings</h2>
        <nav className="space-y-0.5">
          {[
            { label: "My Meetings", value: "hosted" },
            { label: "All Meetings", value: "shared" },
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveTab(value as "hosted" | "shared")}
              className={`w-full text-left text-sm px-2 py-1.5 rounded-md transition-colors ${
                activeTab === value
                  ? "bg-purple-50 text-purple-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3">
          <button className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              <Plus className="w-3.5 h-3.5" /> New Meeting
            </button>
          </div>
        </div>

        {/* Meeting list */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : meetings.length === 0 ? (
            <EmptyState
              icon={Video}
              title="No meetings yet"
              description="Create a meeting or upload a transcript to get started."
              action={
                <button
                  onClick={() => setShowCreate(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4" /> New Meeting
                </button>
              }
            />
          ) : (
            <div className="space-y-2">
              {meetings.map(m => (
                <MeetingCard key={m.id} meeting={m} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </div>

      {showCreate && (
        <CreateMeetingModal
          onClose={() => setShowCreate(false)}
          onCreated={() => { setShowCreate(false); loadMeetings(); }}
        />
      )}
    </div>
  );
}