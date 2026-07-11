"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Mic, Video, Activity, Upload, Puzzle, BarChart2,
  Bot, Sparkles, Users, TrendingUp, Settings, MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/" },
  { label: "AskFred", icon: Mic, href: "/ask-fred", shortcut: "Ctrl+J" },
  { label: "Meetings", icon: Video, href: "/meetings" },
  { label: "Meeting Status", icon: Activity, href: "/meeting-status" },
  { label: "Uploads", icon: Upload, href: "/uploads" },
  { label: "Integrations", icon: Puzzle, href: "/integrations" },
  { label: "Analytics", icon: BarChart2, href: "/analytics" },
  { label: "Voice Agents", icon: Bot, href: "/voice-agents", badge: "NEW" },
  { label: "AI Skills", icon: Sparkles, href: "/ai-skills" },
  { label: "Team", icon: Users, href: "/team" },
  { label: "Upgrade", icon: TrendingUp, href: "/upgrade" },
  { label: "Settings", icon: Settings, href: "/settings" },
  { label: "More", icon: MoreHorizontal, href: "/more" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[160px] flex-shrink-0 flex flex-col border-r border-[#ECECEC] bg-white h-full">
      {/* Logo */}
      <div className="px-4 py-4 flex items-center gap-2">
        <div className="w-6 h-6 bg-gradient-to-br from-[#6D4AFF] to-[#5A3FE6] rounded-md flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-bold text-[#1F1F1F] text-xs">fireflies.ai</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ label, icon: Icon, href, shortcut, badge }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-xs transition-colors group",
                active
                  ? "bg-[#F5F1FF] text-[#6D4AFF]"
                  : "text-[#666666] hover:bg-[#FAFAFC] hover:text-[#1F1F1F]"
              )}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="flex-1 truncate">{label}</span>
              {shortcut && (
                <span className="text-[9px] text-[#666666] hidden group-hover:inline">{shortcut}</span>
              )}
              {badge && (
                <span className="text-[8px] font-bold bg-green-500 text-white px-1 py-0.5 rounded">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mx-2 mb-3 rounded-xl border border-[#ECECEC] bg-[#F5F1FF] p-3">
        <p className="text-[11px] font-semibold text-[#6D4AFF]">Invite coworkers</p>
        <p className="mt-1.5 text-xs text-[#666666]">Invite coworkers to your Fireflies team</p>
        <button className="mt-3 w-full rounded-lg bg-white px-2 py-1.5 text-xs font-semibold text-[#6D4AFF] border border-[#ECECEC] transition hover:bg-[#FAFAFC]">
          Create Team
        </button>
      </div>

      <div className="px-3 py-2 border-t border-[#ECECEC]">
        <p className="text-[10px] text-[#666666]">Your Privacy Choices</p>
      </div>
    </aside>
  );
}
