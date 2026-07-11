import { Sparkles, MessageSquare, Mail, ChevronRight } from "lucide-react";
import { ChatInput } from "./ChatInput";

export function AskFredPanel() {
  return (
    <aside className="hidden h-full w-[360px] flex-shrink-0 flex-col border-l border-[#ECECEC] bg-white xl:flex">
      <div className="flex items-center justify-between border-b border-[#ECECEC] px-5 py-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#666666]">Assistant</p>
          <h2 className="text-base font-semibold text-[#1F1F1F]">Ask Fred</h2>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F1FF] text-[#6D4AFF]">
          <Sparkles className="h-5 w-5" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="rounded-[20px] border border-[#ECECEC] bg-gradient-to-r from-[#F8F5FF] via-[#FFFFFF] to-[#F8F5FF] p-4 shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
          <div className="flex items-center gap-3 text-sm font-semibold text-[#1F1F1F]">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#6D4AFF] shadow-sm">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div>
              <p>Slack + Gmail</p>
              <p className="text-xs font-medium text-[#666666]">Connect both for smarter meeting context.</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-[16px] border border-[#ECECEC] bg-white px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-[#1F1F1F]">Connect Slack & Gmail</p>
              <p className="text-xs text-[#666666]">Get answers with full context.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-[#6D4AFF] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#5A3FE6]">
              Connect
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-[20px] border border-[#ECECEC] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
          <p className="text-sm font-semibold text-[#1F1F1F]">Hi SUSAN!</p>
          <p className="mt-2 text-sm leading-6 text-[#666666]">Get ready for your meeting</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "My action items",
              "Key decisions",
              "Key initiatives",
            ].map((item) => (
              <button
                key={item}
                className="rounded-full border border-[#ECECEC] bg-[#FAFAFC] px-3 py-2 text-sm font-semibold text-[#666666] transition hover:border-[#D9D0FF] hover:text-[#6D4AFF]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#ECECEC] bg-white p-5">
        <ChatInput />
      </div>
    </aside>
  );
}
