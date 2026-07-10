import { Play } from "lucide-react";

export function ProductPreview() {
  return (
    <div className="group relative flex h-[190px] w-full items-center justify-center overflow-hidden rounded-[20px] border border-[#f2c87b] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.28),_transparent_35%),linear-gradient(135deg,_#28135f_0%,_#4f28aa_45%,_#101837_100%)] p-4 transition duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(52,25,118,0.16)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.18),_transparent_22%),radial-gradient(circle_at_80%_0%,_rgba(255,196,96,0.24),_transparent_30%)]" />
      <div className="absolute left-4 top-4 h-12 w-12 rounded-full border border-white/25 bg-white/10" />
      <div className="absolute bottom-4 right-4 h-16 w-16 rounded-full border border-[#f5d26a]/40" />

      <div className="relative flex h-full w-full items-center justify-center rounded-[16px] border border-white/15 bg-white/10 backdrop-blur-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#6D4AFF] shadow-[0_10px_24px_rgba(0,0,0,0.16)]">
          <Play className="ml-1 h-6 w-6 fill-current" />
        </div>
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-2.5 py-2 backdrop-blur">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[10px] font-semibold text-[#1F1F1F]">
          SU
        </div>
        <div className="text-[11px] text-white/90">
          <p className="font-medium">Susan</p>
          <p className="text-[10px] text-white/70">Product Demo</p>
        </div>
      </div>
    </div>
  );
}
