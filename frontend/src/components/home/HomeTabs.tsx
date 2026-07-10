"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import { MeetingListItem } from "@/types";
import { MeetingCard } from "@/components/meetings/MeetingCard";
import { UpcomingEmptyState } from "./UpcomingEmptyState";

interface Props {
  meetings: MeetingListItem[];
}

const tabs = [
  { id: "recent", label: "Recent" },
  { id: "upcoming", label: "Upcoming" },
  { id: "ai", label: "AI Feed" },
] as const;

export function HomeTabs({ meetings }: Props) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("recent");
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <div className="overflow-hidden rounded-[24px] border border-[#ECECEC] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECECEC] px-4 py-3 sm:px-6">
          <div className="flex flex-wrap gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-3 py-2 text-[12px] font-medium transition-all duration-150 ease-out ${
                  activeTab === tab.id
                    ? "border border-[#D9D0FF] bg-[#F5F1FF] text-[#6D4AFF]"
                    : "text-[#666666] hover:bg-[#FAFAFC] hover:text-[#1F1F1F]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center gap-1.5 rounded-full border border-[#ECECEC] px-3 py-2 text-[12px] text-[#666666] transition hover:border-[#D9D0FF] hover:bg-[#FAFAFC] hover:text-[#1F1F1F]"
          >
            <Settings className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === "upcoming" ? (
            <UpcomingEmptyState />
          ) : activeTab === "ai" ? (
            <div className="flex min-h-[220px] items-center justify-center rounded-[20px] border border-dashed border-[#ECECEC] bg-[#FAFAFC] px-6 py-10 text-center">
              <div>
                <p className="text-base font-semibold text-[#1F1F1F]">AI Feed Coming Soon</p>
                <p className="mt-2 text-sm leading-6 text-[#666666]">
                  Fireflies will surface highlights, action items, and key moments here.
                </p>
              </div>
            </div>
          ) : meetings.length === 0 ? (
            <div className="rounded-[20px] border border-[#ECECEC] bg-[#FAFAFC] p-6 text-sm text-[#666666]">
              No meetings available. Capture a meeting or upload a file to populate this feed.
            </div>
          ) : (
            <div className="space-y-2">
              {meetings.slice(0, 3).map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          )}
        </div>
      </div>

      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-[20px] bg-white p-6 shadow-[0_16px_48px_rgba(15,23,42,0.18)]">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#1F1F1F]">Meeting Settings</h2>
              <button onClick={() => setShowSettings(false)} className="text-[#666666] transition hover:text-[#1F1F1F]">
                ✕
              </button>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded border border-[#6D4AFF] bg-[#6D4AFF]">
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#1F1F1F]">Auto-join calendar meetings</p>
                  <p className="mt-1 text-xs text-[#666666]">All meetings with web-conf link</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <svg className="h-5 w-5 text-[#6D4AFF]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#1F1F1F]">Send email recap to</p>
                  <p className="mt-1 text-xs text-[#666666]">Everyone on the invite</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <svg className="h-5 w-5 text-[#6D4AFF]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#1F1F1F]">Meeting privacy</p>
                  <p className="mt-1 text-xs text-[#666666]">Teammates & Anyone with Link</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <svg className="h-5 w-5 text-[#6D4AFF]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 1015.5 17H5.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#1F1F1F]">Meeting language</p>
                  <p className="mt-1 text-xs text-[#666666]">English (Global)</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 rounded-[12px] border border-[#ECECEC] bg-white px-4 py-2 text-xs font-medium text-[#1F1F1F] transition hover:bg-[#FAFAFC]"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 rounded-[12px] bg-[#6D4AFF] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#5A3FE6]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
