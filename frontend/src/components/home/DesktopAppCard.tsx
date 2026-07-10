import { Monitor, Download } from "lucide-react";

export function DesktopAppCard() {
  return (
    <div className="rounded-[20px] border border-[#ECECEC] bg-[#FAFAFC] p-6 transition duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#F5F1FF] text-[#6D4AFF]">
        <Monitor className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-[#1F1F1F]">Desktop App</h3>
      <p className="mt-2 text-sm leading-6 text-[#666666]">
        Capture conversations without any bot present in your meeting.
      </p>
      <button className="mt-5 inline-flex items-center gap-2 rounded-[12px] bg-[#6D4AFF] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#5A3FE6]">
        <Download className="h-4 w-4" />
        Download
      </button>
    </div>
  );
}
