"use client";
import { useState } from "react";
import { Search, Bell, Video, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export function Topbar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/meetings?search=${encodeURIComponent(query)}`);
  };

  return (
    <header className="h-20 border-b border-[#ECECEC] bg-white flex items-center px-8 gap-6 flex-shrink-0">
      <form onSubmit={handleSearch} className="flex-1 flex justify-center">
        <div className="relative w-full max-w-[520px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or keyword"
            className="w-full rounded-full border border-[#ECECEC] bg-[#FAFAFC] pl-11 pr-14 py-3 text-sm text-[#1F1F1F] outline-none transition focus:border-[#6D4AFF] focus:ring-2 focus:ring-[#F5F1FF]"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-[#F5F1FF] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6D4AFF]">
            Ctrl+K
          </span>
        </div>
      </form>

      <div className="flex items-center gap-4 ml-auto">
        <button className="hidden sm:inline-flex items-center justify-center rounded-full border border-[#ECECEC] bg-white px-4 py-2 text-sm font-semibold text-[#1F1F1F] transition hover:bg-[#FAFAFC]">
          Invite
        </button>
        <button className="inline-flex items-center gap-2 rounded-full bg-[#6D4AFF] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5A3FE6]">
          <Video className="w-4 h-4" />
          Capture
          <ChevronDown className="w-3 h-3" />
        </button>
        <button className="relative rounded-full p-2 text-[#666666] transition hover:bg-[#F5F1FF] hover:text-[#6D4AFF]">
          <Bell className="w-4 h-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6D4AFF] text-xs font-bold text-white">
          S
        </div>
      </div>
    </header>
  );
}
