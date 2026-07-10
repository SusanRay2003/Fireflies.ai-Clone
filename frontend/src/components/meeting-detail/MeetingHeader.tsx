"use client";
import { useState } from "react";
import { format } from "date-fns";
import { MeetingDetail } from "@/types";
import { formatDuration } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Edit2, Check, X } from "lucide-react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface Props {
  meeting: MeetingDetail;
  onUpdated: () => void;
}

export function MeetingHeader({ meeting, onUpdated }: Props) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(meeting.title);

  const save = async () => {
    try {
      await api.meetings.update(meeting.id, { title });
      toast.success("Title updated");
      setEditing(false);
      onUpdated();
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <Link href="/meetings" className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 mb-2">
        <ChevronLeft className="w-3.5 h-3.5" /> Meetings
      </Link>

      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
          <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-purple-700 rounded" />
        </div>
        <div className="flex-1 min-w-0">
          {editing ? (
            <div className="flex items-center gap-2">
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="text-base font-bold text-gray-900 border-b-2 border-purple-400 focus:outline-none bg-transparent flex-1"
                autoFocus
              />
              <button onClick={save} className="text-green-600 hover:text-green-800"><Check className="w-4 h-4" /></button>
              <button onClick={() => { setEditing(false); setTitle(meeting.title); }} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group">
              <h1 className="text-base font-bold text-gray-900 truncate">{meeting.title}</h1>
              <button onClick={() => setEditing(true)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-gray-500">{format(new Date(meeting.date), "EEE, MMM d yyyy, h:mm a")}</span>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-500">{formatDuration(meeting.duration)}</span>
            <div className="flex -space-x-1">
              {meeting.participants.map(p => <Avatar key={p.id} name={p.name} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}