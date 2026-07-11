"use client";

import { useState } from "react";
import { Globe, Bot } from "lucide-react";

interface Props {
  filterBadge: string;
}

export function ChatInput({ filterBadge }: Props) {
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-4 top-4 z-10 flex flex-wrap gap-1.5">
        <span className="rounded-full bg-[#F5F1FF] px-2.5 py-1 text-xs font-medium text-[#6D4AFF]">
          {filterBadge}
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={4}
        placeholder="Ask anything. Type / to run AI skills."
        className="w-full resize-none rounded-2xl border border-[#D9D0FF] bg-white px-4 pb-12 pt-10 text-sm text-[#1F1F1F] outline-none transition placeholder:text-[#999999] focus:border-[#6D4AFF] focus:ring-2 focus:ring-[#F5F1FF]"
      />
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#6D4AFF] transition hover:bg-[#F5F1FF]"
        >
          <Globe className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#6D4AFF] transition hover:bg-[#F5F1FF]"
        >
          <Bot className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
