"use client";
import Link from "next/link";
import { format } from "date-fns";
import { MeetingListItem } from "@/types";
import { formatDuration } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Trash2, MoreHorizontal, Clock, Users } from "lucide-react";
import { useState } from "react";

interface Props {
  meeting: MeetingListItem;
  onDelete: (id: number) => void;
}

export function MeetingCard({ meeting, onDelete }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-sm transition-all p-4 flex items-center gap-4 group">
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
        <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-purple-700 rounded" />
      </div>

      {/* Content */}
      <Link href={`/meetings/${meeting.id}`} className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{meeting.title}</p>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {format(new Date(meeting.date), "EEE, MMM d yyyy, h:mm a")}
          </span>
          <span className="text-xs text-gray-500">{formatDuration(meeting.duration)}</span>
          {meeting.participants.length > 0 && (
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Users className="w-3 h-3" />
              {meeting.participants.length}
            </span>
          )}
        </div>
      </Link>

      {/* Participants avatars */}
      <div className="flex -space-x-1.5">
        {meeting.participants.slice(0, 3).map(p => (
          <Avatar key={p.id} name={p.name} />
        ))}
      </div>

      {/* Menu */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 w-36">
            <button
              onClick={() => { onDelete(meeting.id); setMenuOpen(false); }}
              className="w-full text-left px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}