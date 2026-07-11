"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Hash, List, Bot, Plus } from "lucide-react";
import { CreateChannelModal } from "./CreateChannelModal";
import { NOTEBOOK_NAV_ITEMS } from "@/lib/notebookViews";
import { cn } from "@/lib/utils";

const NAV_ICONS = {
  mine: Hash,
  all: List,
  autopilot: Bot,
} as const;

interface Props {
  onNavigate?: () => void;
}

export function MeetingNotebookSidebar({ onNavigate }: Props) {
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col border-r border-[#ECECEC] bg-[#FAFAFC] px-3 py-4">
      <div className="px-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999999]" />
          <input
            placeholder="Search channels"
            className="w-full rounded-lg border border-[#ECECEC] bg-white py-2.5 pl-10 pr-3 text-sm text-[#1F1F1F] outline-none transition focus:border-[#6D4AFF] focus:ring-1 focus:ring-[#6D4AFF]"
          />
        </div>
      </div>

      <div className="mt-5">
        <p className="px-1 text-xs font-medium text-[#999999]">Meetings</p>
        <div className="mt-1.5 space-y-0.5">
          {NOTEBOOK_NAV_ITEMS.map(({ label, href, view }) => {
            const Icon = NAV_ICONS[view];
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition duration-150 ease-out",
                  isActive
                    ? "bg-[#F5F1FF] text-[#6D4AFF]"
                    : "text-[#666666] hover:bg-[#F0F0F4] hover:text-[#1F1F1F]",
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="text-left">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between px-1">
          <p className="text-xs font-medium text-[#999999]">All channels</p>
          <button
            type="button"
            onClick={() => setShowCreateChannel(true)}
            className="flex h-6 w-6 items-center justify-center rounded-md text-[#6D4AFF] transition hover:bg-[#F5F1FF]"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="mt-1 space-y-0.5">
          <button
            type="button"
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[#666666] transition duration-150 ease-out hover:bg-[#F0F0F4] hover:text-[#1F1F1F]"
          >
            <Hash className="h-4 w-4 flex-shrink-0 text-[#999999]" />
            <span className="text-left">susan</span>
          </button>
        </div>
      </div>

      {showCreateChannel && (
        <CreateChannelModal
          onClose={() => setShowCreateChannel(false)}
          onCreate={() => setShowCreateChannel(false)}
        />
      )}
    </aside>
  );
}
