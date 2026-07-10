"use client";
import { useState } from "react";
import { Calendar, Upload, Plus } from "lucide-react";
import { ScheduleProviderModal } from "@/components/meetings/ScheduleProviderModal";
import { AddLiveMeetingModal } from "@/components/meetings/AddLiveMeetingModal";
import { QuickStartCard } from "./QuickStartCard";

export function QuickActionsClient() {
  const [showScheduleProviders, setShowScheduleProviders] = useState(false);
  const [showAddLive, setShowAddLive] = useState(false);

  return (
    <>
      <div className="grid gap-3 lg:grid-cols-3">
        <QuickStartCard
          title="Schedule Meeting"
          icon={Calendar}
          accentClass="bg-[#fff0f4] text-[#e54377]"
          onClick={() => setShowScheduleProviders(true)}
        />
        <QuickStartCard
          title="Upload File"
          icon={Upload}
          href="/uploads"
          accentClass="bg-[#eefbf4] text-[#2d9d72]"
        />
        <QuickStartCard
          title="Capture Meeting"
          icon={Plus}
          accentClass="bg-[#f3eeff] text-[#6D4AFF]"
          onClick={() => setShowAddLive(true)}
        />
      </div>

      {showScheduleProviders && (
        <ScheduleProviderModal onClose={() => setShowScheduleProviders(false)} />
      )}

      {showAddLive && <AddLiveMeetingModal onClose={() => setShowAddLive(false)} />}
    </>
  );
}
