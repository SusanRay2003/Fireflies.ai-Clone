"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Mic, Activity, Upload, Puzzle, BarChart2,
  Bot, Sparkles, Users, TrendingUp, Settings, MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/" },
  { label: "AskFred", icon: Mic, href: "/ask-fred", shortcut: "Ctrl+J" },
  { label: "Meetings", icon: Activity, href: "/meetings" },
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
    <aside className="w-[176px] flex-shrink-0 flex flex-col border-r border-gray-200 bg-white h-full">
      {/* Logo */}
      <div className="px-4 py-4 flex items-center gap-2">
        <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-gray-900 text-sm">fireflies.ai</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ label, icon: Icon, href, shortcut, badge }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors group",
                active
                  ? "bg-purple-50 text-purple-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1 truncate">{label}</span>
              {shortcut && (
                <span className="text-[10px] text-gray-400 hidden group-hover:inline">{shortcut}</span>
              )}
              {badge && (
                <span className="text-[9px] font-bold bg-green-500 text-white px-1 py-0.5 rounded">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-gray-100">
        <p className="text-[10px] text-gray-400">Your Privacy Choices</p>
      </div>
    </aside>
  );
}