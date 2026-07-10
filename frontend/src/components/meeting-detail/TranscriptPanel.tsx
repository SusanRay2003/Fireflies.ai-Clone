"use client";
import { useState, useEffect, useRef } from "react";
import { TranscriptSegment } from "@/types";
import { formatTimestamp, speakerColor } from "@/lib/utils";
import { Search, X } from "lucide-react";

interface Props {
  segments: TranscriptSegment[];
  currentTime: number;
  onSegmentClick: (time: number) => void;
}

export function TranscriptPanel({ segments, currentTime, onSegmentClick }: Props) {
  const [search, setSearch] = useState("");
  const activeRef = useRef<HTMLDivElement>(null);

  // find the currently active segment
  const activeId = segments.reduce<number | null>((acc, seg) => {
    if (currentTime >= seg.start_time) return seg.id;
    return acc;
  }, null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeId]);

  const highlighted = (text: string) => {
    if (!search) return text;
    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return (
      <>
        {parts.map((p, i) =>
          p.toLowerCase() === search.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200 rounded px-0.5">{p}</mark>
          ) : p
        )}
      </>
    );
  };

  const filtered = search
    ? segments.filter(s => s.text.toLowerCase().includes(search.toLowerCase()) || s.speaker.toLowerCase().includes(search.toLowerCase()))
    : segments;

  return (
    <div className="flex flex-col h-full">
      {/* Search bar */}
      <div className="px-6 py-3 border-b border-gray-100 bg-white">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search transcript…"
            className="w-full pl-9 pr-8 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {search && (
          <p className="text-xs text-gray-500 mt-1">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
        )}
      </div>

      {/* Segments */}
      <div className="flex-1 overflow-y-auto p-6 space-y-1">
        {filtered.map(seg => {
          const isActive = seg.id === activeId;
          return (
            <div
              key={seg.id}
              ref={isActive ? activeRef : undefined}
              onClick={() => onSegmentClick(seg.start_time)}
              className={`flex gap-4 p-3 rounded-lg cursor-pointer transition-colors group ${
                isActive ? "bg-purple-50 border border-purple-200" : "hover:bg-gray-50"
              }`}
            >
              <span className="text-xs text-purple-500 font-mono mt-0.5 w-10 flex-shrink-0 group-hover:text-purple-700">
                {formatTimestamp(seg.start_time)}
              </span>
              <div className="flex-1 min-w-0">
                <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded mr-2 ${speakerColor(seg.speaker)}`}>
                  {seg.speaker}
                </span>
                <span className="text-sm text-gray-700 leading-relaxed">
                  {highlighted(seg.text)}
                </span>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && search && (
          <p className="text-center text-sm text-gray-400 py-8">No transcript matches for &quot;{search}&quot;</p>
        )}
      </div>
    </div>
  );
}