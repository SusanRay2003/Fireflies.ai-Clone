"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Video,
  ChevronDown,
  Calendar,
  Upload,
  Mic,
  Plus,
} from "lucide-react";
import { AddLiveMeetingModal } from "./AddLiveMeetingModal";
import { ScheduleProviderModal } from "./ScheduleProviderModal";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const MENU_ITEMS = [
  { id: "live", label: "Add to live meeting", icon: Video },
  { id: "schedule", label: "Schedule new meeting", icon: Calendar },
  { id: "upload", label: "Upload audio or video", icon: Upload },
  { id: "record", label: "Start recording", icon: Mic },
] as const;

type MenuId = (typeof MENU_ITEMS)[number]["id"];

interface Props {
  variant?: "topbar" | "pill";
  className?: string;
}

export function CaptureDropdown({ variant = "topbar", className }: Props) {
  const [open, setOpen] = useState(false);
  const [showLive, setShowLive] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (id: MenuId) => {
    setOpen(false);
    switch (id) {
      case "live":
        setShowLive(true);
        break;
      case "schedule":
        setShowSchedule(true);
        break;
      case "upload":
        router.push("/uploads");
        break;
      case "record":
        toast.success("Starting recording… (demo)");
        break;
    }
  };

  return (
    <>
      <div ref={containerRef} className={cn("relative", className)}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "inline-flex items-center gap-2 font-semibold text-white transition hover:bg-[#5A3FE6]",
            variant === "topbar"
              ? "rounded-full bg-[#6D4AFF] px-4 py-2 text-sm"
              : "rounded-full bg-[#6D4AFF] px-5 py-2.5 text-sm",
          )}
        >
          {variant === "pill" ? (
            <>
              <Plus className="h-4 w-4" />
              Capture
            </>
          ) : (
            <>
              <Video className="h-4 w-4" />
              Capture
              <ChevronDown className={cn("h-3 w-3 transition", open && "rotate-180")} />
            </>
          )}
        </button>

        {open && (
          <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-[#ECECEC] bg-white py-1.5 shadow-lg">
            {MENU_ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleSelect(id)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-[#1F1F1F] transition hover:bg-[#F5F1FF] hover:text-[#6D4AFF]"
              >
                <Icon className="h-4 w-4 flex-shrink-0 text-[#666666]" />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {showLive && <AddLiveMeetingModal onClose={() => setShowLive(false)} />}
      {showSchedule && <ScheduleProviderModal onClose={() => setShowSchedule(false)} />}
    </>
  );
}
