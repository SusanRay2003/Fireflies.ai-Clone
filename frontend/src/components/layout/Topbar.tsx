"use client";
import { useState } from "react";
import { Search, Bell, Mic2, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export function Topbar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/meetings?search=${encodeURIComponent(query)}`);
  };

  return (
    <header className="h-12 border-b border-gray-200 bg-white flex items-center px-4 gap-4 flex-shrink-0">
      <form onSubmit={handleSearch} className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by title or keyword"
            className="w-full pl-9 pr-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">Ctrl+K</span>
        </div>
      </form>

      <div className="flex items-center gap-2 ml-auto">
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50">
          Invite
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700">
          <Mic2 className="w-3.5 h-3.5" />
          Capture
          <ChevronDown className="w-3 h-3" />
        </button>
        <button className="relative p-1.5 text-gray-500 hover:text-gray-700">
          <Bell className="w-4 h-4" />
          <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>
        <div className="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          S
        </div>
      </div>
    </header>
  );
}