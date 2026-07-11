"use client";
import { useState } from "react";
import { Search, Bell, Mic, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { CaptureDropdown } from "@/components/meetings/CaptureDropdown";

export function Topbar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/notebook/all?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex-shrink-0">
      <div className="flex h-9 items-center justify-center bg-[#F5F1FF] px-4 text-center text-xs text-[#6D4AFF]">
        <span>
          You have 7 days left in your business plan free trial.{" "}
          <button type="button" className="font-semibold underline underline-offset-2 hover:text-[#5A3FE6]">
            Subscribe now →
          </button>
        </span>
      </div>

      <header className="flex h-[60px] flex-shrink-0 items-center gap-6 border-b border-[#ECECEC] bg-white px-6">
        <form onSubmit={handleSearch} className="flex flex-1 justify-center">
          <div className="relative w-full max-w-[520px]">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666666]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or keyword"
              className="w-full rounded-full border border-[#ECECEC] bg-[#FAFAFC] py-2.5 pl-11 pr-14 text-sm text-[#1F1F1F] outline-none transition focus:border-[#6D4AFF] focus:ring-2 focus:ring-[#F5F1FF]"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-[#F5F1FF] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6D4AFF]">
              Ctrl+K
            </span>
          </div>
        </form>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            className="hidden items-center justify-center rounded-full border border-[#ECECEC] bg-white px-4 py-2 text-sm font-semibold text-[#1F1F1F] transition hover:bg-[#FAFAFC] sm:inline-flex"
          >
            + Invite
          </button>
          <CaptureDropdown />
          <button
            type="button"
            className="rounded-full p-2 text-[#666666] transition hover:bg-[#F5F1FF] hover:text-[#6D4AFF]"
          >
            <Mic className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="relative rounded-full p-2 text-[#666666] transition hover:bg-[#F5F1FF] hover:text-[#6D4AFF]"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
          </button>
          <button
            type="button"
            className="hidden rounded-full p-2 text-[#666666] transition hover:bg-[#F5F1FF] hover:text-[#6D4AFF] sm:block"
          >
            <Settings className="h-4 w-4" />
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6D4AFF] text-xs font-bold text-white">
            S
          </div>
        </div>
      </header>
    </div>
  );
}
