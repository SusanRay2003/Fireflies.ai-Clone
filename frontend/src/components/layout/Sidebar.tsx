"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Mic, Video, Activity, Upload, Puzzle, BarChart2,
  Bot, Sparkles, Users, TrendingUp, Settings, MoreHorizontal, BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/" },
  { label: "AskFred", icon: Mic, href: "/ask-fred", shortcut: "Ctrl+J" },
  { label: "Meetings", icon: Video, href: "/notebook/mine" },
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
  const isNotebook = pathname.startsWith("/notebook");

  if (isNotebook) {
    const iconItems = [
      { label: "Home", icon: Home, href: "/" },
      { label: "Notebook", icon: BookOpen, href: "/notebook/all", active: true },
      { label: "Apps", icon: Puzzle, href: "/integrations" },
      { label: "Team", icon: Users, href: "/team" },
      { label: "Settings", icon: Settings, href: "/settings" },
    ];

    return (
      <aside className="flex h-full w-[52px] flex-shrink-0 flex-col items-center border-r border-[#ECECEC] bg-white py-3">
        <Link href="/" className="mb-4 flex h-8 w-8 items-center justify-center">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#6D4AFF] to-[#5A3FE6]">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
        </Link>
        <nav className="flex flex-1 flex-col items-center gap-1">
          {iconItems.map(({ label, icon: Icon, href, active }) => {
            const isActive =
              active ||
              pathname === href ||
              (href === "/notebook/all" && pathname.startsWith("/notebook"));
            return (
              <Link
                key={href}
                href={href}
                title={label}
                className={cn(
                  "relative flex h-9 w-9 items-center justify-center rounded-lg transition",
                  isActive
                    ? "text-[#6D4AFF] before:absolute before:left-0 before:top-1/2 before:h-5 before:w-0.5 before:-translate-y-1/2 before:rounded-r before:bg-[#6D4AFF]"
                    : "text-[#999999] hover:bg-[#FAFAFC] hover:text-[#666666]",
                )}
              >
                <Icon className="h-4 w-4" />
              </Link>
            );
          })}
        </nav>
      </aside>
    );
  }

  return (
    <aside className="flex h-full w-[160px] flex-shrink-0 flex-col border-r border-[#ECECEC] bg-white">
      <div className="flex items-center gap-2 px-4 py-4">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[#6D4AFF] to-[#5A3FE6]">
          <Sparkles className="h-3.5 w-3.5 text-white" />
        </div>
        <span className="text-xs font-bold text-[#1F1F1F]">fireflies.ai</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
        {NAV_ITEMS.map(({ label, icon: Icon, href, shortcut, badge }) => {
          const active =
            pathname === href ||
            (href === "/notebook/mine" && pathname.startsWith("/notebook")) ||
            (href !== "/" && href !== "/notebook/mine" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-2 rounded-md px-3 py-2 text-xs transition-colors",
                active
                  ? "bg-[#F5F1FF] text-[#6D4AFF]"
                  : "text-[#666666] hover:bg-[#FAFAFC] hover:text-[#1F1F1F]",
              )}
            >
              <Icon className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="flex-1 truncate">{label}</span>
              {shortcut && (
                <span className="hidden text-[9px] text-[#666666] group-hover:inline">{shortcut}</span>
              )}
              {badge && (
                <span className="rounded bg-green-500 px-1 py-0.5 text-[8px] font-bold text-white">
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
        <button
          type="button"
          className="mt-3 w-full rounded-lg border border-[#ECECEC] bg-white px-2 py-1.5 text-xs font-semibold text-[#6D4AFF] transition hover:bg-[#FAFAFC]"
        >
          Create Team
        </button>
      </div>

      <div className="border-t border-[#ECECEC] px-3 py-2">
        <p className="text-[10px] text-[#666666]">Your Privacy Choices</p>
      </div>
    </aside>
  );
}
