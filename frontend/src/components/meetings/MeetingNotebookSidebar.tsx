import { useState } from "react";
import { Search, ChevronRight, Hash, FileText, Video, Plus } from "lucide-react";
import { CreateChannelModal } from "./CreateChannelModal";

interface Props {
  activeTab: "hosted" | "shared";
  onTabChange: (tab: "hosted" | "shared") => void;
}

export function MeetingNotebookSidebar({ activeTab, onTabChange }: Props) {
  const [showCreateChannel, setShowCreateChannel] = useState(false);

  return (
    <aside className="flex h-full w-full max-w-[280px] flex-col border-r border-[#ECECEC] bg-[#FAFAFC] px-4 py-4">
      <div className="rounded-[18px] border border-[#ECECEC] bg-white p-3 shadow-[0_4px_16px_rgba(15,23,42,0.03)]">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F1FF] text-[#6D4AFF]">
            <Search className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#666666]">Channels</p>
            <p className="text-sm font-semibold text-[#1F1F1F]">Search channels</p>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#999999]" />
          <input
            placeholder="Search channels"
            className="w-full rounded-[14px] border border-[#ECECEC] bg-[#FAFAFC] py-3 pl-10 pr-3 text-sm text-[#1F1F1F] outline-none transition focus:border-[#6D4AFF] focus:ring-2 focus:ring-[#F5F1FF]"
          />
        </div>
      </div>

      <div className="mt-5">
        <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#666666]">Meetings</p>
        <div className="mt-2 space-y-2">
          {[
            { label: "My Meetings", value: "hosted" as const, icon: Hash },
            { label: "All Meetings", value: "shared" as const, icon: FileText },
            { label: "Voice Agent Meetings", value: "shared" as const, icon: Video },
          ].map(({ label, value, icon: Icon }) => (
            <button
              key={label}
              onClick={() => onTabChange(value)}
              className={`flex w-full items-center gap-3 rounded-[14px] px-3 py-3 text-sm font-semibold transition duration-150 ease-out ${
                activeTab === value
                  ? "bg-[#F5F1FF] text-[#6D4AFF]"
                  : "text-[#666666] hover:bg-white hover:text-[#1F1F1F]"
              }`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="text-left">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between px-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#666666]">All Channels</p>
          <button
            type="button"
            onClick={() => setShowCreateChannel(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ECECEC] bg-white text-[#6D4AFF] transition hover:bg-[#FAFAFC]"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-2 space-y-1">
          {[
            { name: "General", icon: Hash },
            { name: "Product", icon: FileText },
            { name: "Customer Success", icon: Video },
          ].map(({ name, icon: Icon }) => (
            <button
              key={name}
              className="flex w-full items-center gap-3 rounded-[14px] px-3 py-3 text-sm text-[#666666] transition duration-150 ease-out hover:bg-white hover:text-[#1F1F1F]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FAFAFC] text-[#6D4AFF]">
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-left">{name}</span>
            </button>
          ))}
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
