"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { MeetingDetail } from "@/types";
import { TranscriptPanel } from "@/components/meeting-detail/TranscriptPanel";
import { SummaryPanel } from "@/components/meeting-detail/SummaryPanel";
import { MediaPlayer } from "@/components/meeting-detail/MediaPlayer";
import { MeetingHeader } from "@/components/meeting-detail/MeetingHeader";
import toast from "react-hot-toast";

export default function MeetingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [meeting, setMeeting] = useState<MeetingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"transcript" | "summary" | "action-items">("transcript");
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef<{ seekTo: (t: number) => void }>(null);

const loadMeeting = useCallback(async () => {
  try {
    const data = await api.meetings.get(Number(id));
    setMeeting(data);
  } catch {
    toast.error("Failed to load meeting");
  } finally {
    setLoading(false);
  }
}, [id]);

useEffect(() => {
  const timer = setTimeout(() => {
    loadMeeting();
  }, 0);

  return () => clearTimeout(timer);
}, [loadMeeting]);

  const handleSeek = (time: number) => {
    playerRef.current?.seekTo(time);
  };

  if (loading) return <div className="p-8 text-center text-gray-400 animate-pulse">Loading meeting…</div>;
  if (!meeting) return <div className="p-8 text-center text-gray-400">Meeting not found.</div>;

  return (
    <div className="flex flex-col h-full">
      <MeetingHeader meeting={meeting} onUpdated={loadMeeting} />

      {/* Media player */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <MediaPlayer
          ref={playerRef}
          duration={meeting.duration}
          onTimeUpdate={setCurrentTime}
        />
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 flex gap-1">
        {(["transcript", "summary", "action-items"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors capitalize ${
              activeTab === tab
                ? "border-purple-600 text-purple-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "action-items" ? "Action Items" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "transcript" && (
          <TranscriptPanel
            segments={meeting.transcript_segments}
            currentTime={currentTime}
            onSegmentClick={handleSeek}
          />
        )}
        {activeTab === "summary" && (
          <SummaryPanel
            summary={meeting.summary}
            keyTopics={meeting.key_topics}
            onTopicClick={handleSeek}
          />
        )}
        {activeTab === "action-items" && (
          <ActionItemsPanel
            meetingId={meeting.id}
            items={meeting.action_items}
            onUpdated={loadMeeting}
          />
        )}
      </div>
    </div>
  );
}

// inline action items panel to keep files manageable
import { ActionItem } from "@/types";
import { Check, Plus, Trash2 } from "lucide-react";

function ActionItemsPanel({
  meetingId, items, onUpdated,
}: { meetingId: number; items: ActionItem[]; onUpdated: () => void }) {
  const [newText, setNewText] = useState("");

  const toggle = async (item: ActionItem) => {
    await api.actionItems.update(meetingId, item.id, { completed: !item.completed });
    onUpdated();
  };
  const add = async () => {
    if (!newText.trim()) return;
    await api.actionItems.create(meetingId, { text: newText });
    setNewText("");
    onUpdated();
  };
  const del = async (itemId: number) => {
    await api.actionItems.delete(meetingId, itemId);
    onUpdated();
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="max-w-2xl space-y-2">
        {items.map(item => (
          <div key={item.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 group">
            <button
              onClick={() => toggle(item)}
              className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                item.completed ? "bg-purple-600 border-purple-600" : "border-gray-300 hover:border-purple-400"
              }`}
            >
              {item.completed && <Check className="w-3 h-3 text-white" />}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${item.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                {item.text}
              </p>
              {item.assignee && (
                <p className="text-xs text-gray-500 mt-0.5">@{item.assignee}</p>
              )}
            </div>
            <button
              onClick={() => del(item.id)}
              className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        {/* Add new */}
        <div className="flex gap-2 mt-4">
          <input
            value={newText}
            onChange={e => setNewText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && add()}
            placeholder="Add action item…"
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button onClick={add} className="px-3 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}