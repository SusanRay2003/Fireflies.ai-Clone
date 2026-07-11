import { useState } from "react";
import { Mic, Send } from "lucide-react";

export function ChatInput() {
  const [value, setValue] = useState("");

  return (
    <div className="rounded-[24px] border border-[#ECECEC] bg-[#FAFAFC] p-4 shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#1F1F1F]">
        <span className="rounded-full bg-white px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-[#666666]"># My Meetings</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
        placeholder="Ask anything. Type / to run AI skills."
        className="w-full resize-none rounded-[16px] border border-[#ECECEC] bg-white px-4 py-3 text-sm text-[#1F1F1F] outline-none placeholder:text-[#999999]"
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ECECEC] bg-white text-[#6D4AFF] transition hover:bg-[#F5F1FF]">
          <Mic className="h-5 w-5" />
        </button>
        <button className="ml-auto inline-flex items-center gap-2 rounded-full bg-[#6D4AFF] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5A3FE6]">
          <Send className="h-4 w-4" />
          Send
        </button>
      </div>
    </div>
  );
}
