import { Smartphone, Apple, Play } from "lucide-react";

export function MobileAppCard() {
  return (
    <div className="rounded-[20px] border border-[#ECECEC] bg-[#FAFAFC] p-6 transition duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#F5F1FF] text-[#6D4AFF]">
        <Smartphone className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-[#1F1F1F]">Mobile App</h3>
      <p className="mt-2 text-sm leading-6 text-[#666666]">
        Record in-person conversations and review meetings on the go.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button className="inline-flex items-center gap-2 rounded-[12px] border border-[#ECECEC] bg-white px-3 py-2 text-sm font-medium text-[#1F1F1F] transition hover:bg-[#FAFAFC]">
          <Apple className="h-4 w-4" />
          App Store
        </button>
        <button className="inline-flex items-center gap-2 rounded-[12px] border border-[#ECECEC] bg-white px-3 py-2 text-sm font-medium text-[#1F1F1F] transition hover:bg-[#FAFAFC]">
          <Play className="h-4 w-4" />
          Play Store
        </button>
      </div>
    </div>
  );
}
