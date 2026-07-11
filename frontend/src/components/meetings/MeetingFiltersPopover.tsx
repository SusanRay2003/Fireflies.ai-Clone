"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  ChevronRight,
  CalendarDays,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

const SECTIONS = [
  { id: "hostedBy", label: "Hosted By" },
  { id: "participants", label: "Participants" },
  { id: "dateRange", label: "Date Range" },
  { id: "duration", label: "Duration" },
  { id: "capturedFrom", label: "Captured From" },
  { id: "privacy", label: "Privacy" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

const hosts = [
  "Susan Ray",
  "Mina Patel",
  "Chris Johnson",
  "Ava Lee",
  "Jordan Kim",
];

const captureSources = [
  "Meeting Notetaker",
  "Chrome Extension",
  "Mobile App",
  "Desktop App",
  "Uploads",
  "Voice Agent",
];

export function MeetingFiltersPopover({ onClose }: { onClose: () => void }) {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [section, setSection] = useState<SectionId>("hostedBy");
  const [searchHost, setSearchHost] = useState("");
  const [selectedHosts, setSelectedHosts] = useState<string[]>([hosts[0]]);
  const [selectedSources, setSelectedSources] = useState<string[]>([captureSources[0]]);
  const [selectedDateRange, setSelectedDateRange] = useState("Last 7 Days");
  const [selectedDuration, setSelectedDuration] = useState("Any");
  const [selectedPrivacy, setSelectedPrivacy] = useState("Private");

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const filteredHosts = hosts.filter((host) =>
    host.toLowerCase().includes(searchHost.toLowerCase())
  );

  const toggleHost = (host: string) => {
    setSelectedHosts((current) =>
      current.includes(host) ? current.filter((item) => item !== host) : [...current, host]
    );
  };

  const toggleSource = (value: string) => {
    setSelectedSources((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  };

  const clearAll = () => {
    setSelectedHosts([]);
    setSelectedSources([]);
    setSelectedDateRange("Last 7 Days");
    setSelectedDuration("Any");
    setSelectedPrivacy("Private");
    setSearchHost("");
  };

  return (
    <div
      ref={popoverRef}
      className="absolute right-0 top-full z-50 mt-3 w-[680px] rounded-[24px] border border-[#ECECEC] bg-white shadow-[0_20px_80px_rgba(15,23,42,0.12)] transition duration-150 ease-out"
    >
      <div className="grid grid-cols-[220px_1fr] gap-4 p-5">
        <div className="space-y-3 border-r border-[#ECECEC] pr-4">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#666666]">Filters</p>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-semibold text-[#6D4AFF] transition hover:text-[#5A3FE6]"
            >
              Clear all
            </button>
          </div>
          {SECTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSection(item.id)}
              className={`flex w-full items-center justify-between rounded-[14px] px-3 py-3 text-sm text-left transition duration-150 ease-out ${
                section === item.id
                  ? "bg-[#F5F1FF] text-[#6D4AFF]"
                  : "text-[#666666] hover:bg-[#FAFAFC]"
              }`}
            >
              <span>{item.label}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {section === "hostedBy" && (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1F1F1F]">Search Host</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#999999]" />
                  <input
                    value={searchHost}
                    onChange={(event) => setSearchHost(event.target.value)}
                    placeholder="Search host"
                    className="w-full rounded-[14px] border border-[#ECECEC] bg-[#FAFAFC] py-3 pl-10 pr-3 text-sm text-[#1F1F1F] outline-none transition focus:border-[#6D4AFF] focus:ring-2 focus:ring-[#F5F1FF]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                {filteredHosts.map((host) => (
                  <label
                    key={host}
                    className="flex cursor-pointer items-center justify-between rounded-[14px] border border-[#ECECEC] bg-white px-4 py-3 text-sm text-[#1F1F1F] transition hover:border-[#6D4AFF]"
                  >
                    <span>{host}</span>
                    <input
                      type="checkbox"
                      checked={selectedHosts.includes(host)}
                      onChange={() => toggleHost(host)}
                      className="h-4 w-4 accent-[#6D4AFF]"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {section === "participants" && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-[#1F1F1F]">Participants</p>
              <p className="text-sm text-[#666666]">Select people who were involved in meetings.</p>
              <div className="grid gap-3">
                {hosts.map((host) => (
                  <label
                    key={host}
                    className="flex cursor-pointer items-center justify-between rounded-[14px] border border-[#ECECEC] bg-white px-4 py-3 text-sm text-[#1F1F1F] transition hover:border-[#6D4AFF]"
                  >
                    <span>{host}</span>
                    <input
                      type="checkbox"
                      checked={selectedHosts.includes(host)}
                      onChange={() => toggleHost(host)}
                      className="h-4 w-4 accent-[#6D4AFF]"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {section === "dateRange" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-[#6D4AFF]" />
                <p className="text-sm font-semibold text-[#1F1F1F]">Date Range</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Today",
                  "Yesterday",
                  "Last 7 Days",
                  "Last 30 Days",
                  "Custom",
                ].map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setSelectedDateRange(range)}
                    className={`rounded-[14px] border px-4 py-3 text-sm text-left transition duration-150 ease-out ${
                      selectedDateRange === range
                        ? "border-[#6D4AFF] bg-[#F5F1FF] text-[#1F1F1F]"
                        : "border-[#ECECEC] bg-white text-[#666666] hover:border-[#6D4AFF] hover:bg-[#FAFAFC]"
                    }`}
                  >
                    <span className="font-semibold">{range}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {section === "duration" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-[#6D4AFF]" />
                <p className="text-sm font-semibold text-[#1F1F1F]">Duration</p>
              </div>
              <div className="space-y-3">
                {[
                  "Any",
                  "Less than 15 min",
                  "15-30 min",
                  "30-60 min",
                  "More than 60 min",
                ].map((duration) => (
                  <label key={duration} className="flex items-center gap-3 rounded-[14px] border border-[#ECECEC] bg-white px-4 py-3 text-sm text-[#1F1F1F] transition hover:border-[#6D4AFF]">
                    <input
                      type="radio"
                      name="duration"
                      value={duration}
                      checked={selectedDuration === duration}
                      onChange={() => setSelectedDuration(duration)}
                      className="h-4 w-4 accent-[#6D4AFF]"
                    />
                    <span>{duration}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {section === "capturedFrom" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#6D4AFF]" />
                <p className="text-sm font-semibold text-[#1F1F1F]">Captured From</p>
              </div>
              <div className="grid gap-3">
                {captureSources.map((source) => (
                  <label key={source} className="flex cursor-pointer items-center justify-between rounded-[14px] border border-[#ECECEC] bg-white px-4 py-3 text-sm text-[#1F1F1F] transition hover:border-[#6D4AFF]">
                    <span>{source}</span>
                    <input
                      type="checkbox"
                      checked={selectedSources.includes(source)}
                      onChange={() => toggleSource(source)}
                      className="h-4 w-4 accent-[#6D4AFF]"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {section === "privacy" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-[#6D4AFF]" />
                <p className="text-sm font-semibold text-[#1F1F1F]">Privacy</p>
              </div>
              <div className="space-y-3">
                {[
                  "Private",
                  "Shared",
                  "Public",
                ].map((privacy) => (
                  <label key={privacy} className="flex items-center gap-3 rounded-[14px] border border-[#ECECEC] bg-white px-4 py-3 text-sm text-[#1F1F1F] transition hover:border-[#6D4AFF]">
                    <input
                      type="radio"
                      name="privacy"
                      value={privacy}
                      checked={selectedPrivacy === privacy}
                      onChange={() => setSelectedPrivacy(privacy)}
                      className="h-4 w-4 accent-[#6D4AFF]"
                    />
                    <span>{privacy}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-[#ECECEC] px-5 py-4">
        <div className="flex items-center gap-2 text-sm text-[#666666]">
          <ExternalLink className="h-4 w-4 text-[#6D4AFF]" />
          <span>Filters are for display only in this demo.</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-[#F5F1FF] px-4 py-2 text-sm font-semibold text-[#6D4AFF] transition hover:bg-[#EDE4FF]"
        >
          Close
        </button>
      </div>
    </div>
  );
}
