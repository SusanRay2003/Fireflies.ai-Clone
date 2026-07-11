import { Bot, MessageSquare, X } from "lucide-react";
import { ChatInput } from "./ChatInput";

interface Props {
  quickActionPills: string[];
  chatInputBadge: string;
}

export function AskFredPanel({ quickActionPills, chatInputBadge }: Props) {
  return (
    <aside className="hidden h-full w-[340px] flex-shrink-0 flex-col border-l border-[#ECECEC] bg-white xl:flex">
      <div className="flex items-center justify-between border-b border-[#ECECEC] px-5 py-3.5">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-[#6D4AFF]" />
          <span className="text-sm font-semibold text-[#1F1F1F]">Ask Fred</span>
        </div>
        <button
          type="button"
          className="rounded-full p-1.5 text-[#999999] transition hover:bg-[#F0F0F4] hover:text-[#666666]"
        >
          <MessageSquare className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="rounded-xl border border-[#ECECEC] bg-[#FAFAFC] px-4 py-3">
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs leading-5 text-[#666666]">
              Connect Slack and Gmail — get answers with full context.{" "}
              <button type="button" className="font-semibold text-[#6D4AFF] hover:underline">
                Connect
              </button>
            </p>
            <button type="button" className="flex-shrink-0 text-[#999999] hover:text-[#666666]">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M16 2L19 12L29 14L19 16L16 26L13 16L3 14L13 12L16 2Z" fill="#6D4AFF" opacity="0.8" />
              <path d="M24 4L25 8L29 9L25 10L24 14L23 10L19 9L23 8L24 4Z" fill="#FF6B9D" opacity="0.7" />
            </svg>
          </div>
          <p className="text-sm font-bold uppercase tracking-wide text-[#1F1F1F]">Hi SUSAN!</p>
          <p className="mt-1 text-sm text-[#666666]">Get ready for your meeting</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {quickActionPills.map((item) => (
              <button
                key={item}
                type="button"
                className="rounded-full border border-[#ECECEC] bg-white px-3 py-2 text-sm font-medium text-[#1F1F1F] transition hover:border-[#D9D0FF] hover:bg-[#F5F1FF] hover:text-[#6D4AFF]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#ECECEC] p-4">
        <ChatInput filterBadge={chatInputBadge} />
      </div>
    </aside>
  );
}
