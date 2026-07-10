import { Search, CalendarRange, Sparkles, Plus, MessageSquare, ChevronRight } from "lucide-react";

interface Props {
  activeTab: "hosted" | "shared";
  onTabChange: (tab: "hosted" | "shared") => void;
}

export function MeetingNotebookSidebar({ activeTab, onTabChange }: Props) {
  return (
    <aside className="flex h-full w-full max-w-[280px] flex-col border-r border-[#ECECEC] bg-[#FAFAFC] px-4 py-4">
      <div className="rounded-[16px] border border-[#ECECEC] bg-white p-3 shadow-[0_4px_16px_rgba(15,23,42,0.03)]">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F1FF] text-[#6D4AFF]">
            <Search className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#666666]">Channels</p>
            <p className="text-sm font-semibold text-[#1F1F1F]">Search channels</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#666666]">Meetings</p>
        <div className="mt-2 space-y-1">
          {[
            { label: "My Meetings", value: "hosted" as const },
            { label: "All Meetings", value: "shared" as const },
            { label: "Voice Agent Meetings", value: "shared" as const },
          ].map(({ label, value }) => (
            <button
              key={label}
              onClick={() => onTabChange(value)}
              className={`flex w-full items-center justify-between rounded-[12px] px-3 py-2 text-sm transition duration-150 ease-out ${
                activeTab === value
                  ? "bg-[#F5F1FF] text-[#6D4AFF]"
                  : "text-[#666666] hover:bg-white hover:text-[#1F1F1F]"
              }`}
            >
              <span>{label}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between px-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#666666]">All Channels</p>
          <button className="flex h-7 w-7 items-center justify-center rounded-full border border-[#ECECEC] bg-white text-[#6D4AFF] transition hover:bg-[#FAFAFC]">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-2 space-y-1">
          {[
            { name: "General", icon: MessageSquare },
            { name: "Product", icon: Sparkles },
            { name: "Customer Success", icon: CalendarRange },
          ].map(({ name, icon: Icon }) => (
            <button
              key={name}
              className="flex w-full items-center gap-2 rounded-[12px] px-3 py-2 text-sm text-[#666666] transition hover:bg-white hover:text-[#1F1F1F]"
            >
              <Icon className="h-4 w-4" />
              <span>{name}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
