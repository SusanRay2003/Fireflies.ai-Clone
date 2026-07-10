import { Sparkles, MessageSquareMore } from "lucide-react";
import { ChatInput } from "./ChatInput";

export function AskFredPanel() {
  return (
    <aside className="hidden h-full w-[360px] flex-shrink-0 flex-col border-l border-[#ECECEC] bg-white xl:flex">
      <div className="flex items-center justify-between border-b border-[#ECECEC] px-5 py-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#666666]">Assistant</p>
          <h2 className="text-base font-semibold text-[#1F1F1F]">Ask Fred</h2>
        </div>
        <div className="rounded-full bg-[#F5F1FF] p-2 text-[#6D4AFF]">
          <Sparkles className="h-4 w-4" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="rounded-[18px] border border-[#ECECEC] bg-[#FAFAFC] p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-[#1F1F1F]">
            <MessageSquareMore className="h-4 w-4 text-[#6D4AFF]" />
            Slack & Gmail integration
          </div>
          <p className="mt-2 text-sm leading-6 text-[#666666]">
            Connect your workspace to get summaries, follow-ups, and action items from every meeting.
          </p>
        </div>

        <div className="mt-4 rounded-[18px] border border-[#ECECEC] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
          <p className="text-sm font-semibold text-[#1F1F1F]">Hello! I can help you recap meetings and draft follow-ups.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "My action items",
              "Key decisions",
              "Key initiatives",
            ].map((item) => (
              <button
                key={item}
                className="rounded-full border border-[#ECECEC] bg-[#FAFAFC] px-3 py-1.5 text-sm text-[#666666] transition hover:border-[#D9D0FF] hover:text-[#6D4AFF]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#ECECEC] bg-white p-4">
        <ChatInput />
      </div>
    </aside>
  );
}
