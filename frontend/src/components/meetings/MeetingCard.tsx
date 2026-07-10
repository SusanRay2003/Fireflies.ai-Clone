"use client";
import Link from "next/link";
import { format } from "date-fns";
import { MeetingListItem } from "@/types";
import { formatDuration } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Trash2, MoreHorizontal, Clock3, Users2 } from "lucide-react";
import { useState } from "react";

interface Props {
  meeting: MeetingListItem;
  onDelete?: (id: number) => void;
}

export function MeetingCard({ meeting, onDelete }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="group flex items-center gap-4 rounded-[16px] border border-[#ECECEC] bg-white p-4 transition duration-150 ease-out hover:-translate-y-0.5 hover:border-[#D9D0FF] hover:shadow-[0_10px_24px_rgba(15,23,42,0.03)]">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[12px] bg-[#F5F1FF] text-[11px] font-semibold text-[#6D4AFF]">
        {meeting.title.slice(0, 2).toUpperCase()}
      </div>

      <Link href={`/meetings/${meeting.id}`} className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#1F1F1F]">{meeting.title}</p>
        <div className="mt-1 flex flex-wrap items-center gap-3 text-[12px] text-[#666666]">
          <span className="flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            {format(new Date(meeting.date), "EEE, MMM d yyyy, h:mm a")}
          </span>
          <span>{formatDuration(meeting.duration)}</span>
          {meeting.participants.length > 0 && (
            <span className="flex items-center gap-1.5">
              <Users2 className="h-3.5 w-3.5" />
              {meeting.participants.length}
            </span>
          )}
        </div>
      </Link>

      <div className="flex -space-x-1.5">
        {meeting.participants.slice(0, 3).map((p) => (
          <Avatar key={p.id} name={p.name} />
        ))}
      </div>

      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-full p-1 text-[#666666] opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[#FAFAFC] hover:text-[#1F1F1F]"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-7 z-10 w-36 rounded-[12px] border border-[#ECECEC] bg-white py-1 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
            <button
              onClick={() => {
                onDelete?.(meeting.id);
                setMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-red-600 transition hover:bg-red-50"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}