import { CalendarDays, Sparkles } from "lucide-react";

export function UpcomingEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-[#ECECEC] bg-[#FAFAFC] px-6 py-14 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F1FF] text-[#6D4AFF]">
        <CalendarDays className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-[#1F1F1F]">No upcoming meeting scheduled</h3>
      <p className="mt-2 max-w-[320px] text-sm leading-6 text-[#666666]">
        Schedule a meeting to keep your team aligned and automatically capture the conversation.
      </p>
      <button className="mt-5 inline-flex items-center gap-2 rounded-[12px] bg-[#6D4AFF] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#5A3FE6]">
        <Sparkles className="h-4 w-4" />
        Capture meeting
      </button>
    </div>
  );
}
