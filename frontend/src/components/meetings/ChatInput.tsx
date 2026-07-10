import { useState } from "react";
import { Mic, Send } from "lucide-react";

export function ChatInput() {
  const [value, setValue] = useState("");

  return (
    <div className="rounded-[16px] border border-[#ECECEC] bg-[#FAFAFC] p-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={2}
        placeholder="Ask anything. Type / to run AI skills."
        className="w-full resize-none bg-transparent px-2 py-2 text-sm text-[#1F1F1F] outline-none placeholder:text-[#666666]"
      />
      <div className="mt-1 flex items-center justify-between px-2 pb-1">
        <button className="rounded-full border border-[#ECECEC] bg-white p-2 text-[#6D4AFF] transition hover:bg-[#F5F1FF]">
          <Mic className="h-4 w-4" />
        </button>
        <button className="rounded-full border border-[#D9D0FF] bg-[#F5F1FF] p-2 text-[#6D4AFF] transition hover:bg-[#EDE4FF]">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
