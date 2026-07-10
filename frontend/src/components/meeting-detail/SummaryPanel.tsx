"use client";
import { MeetingSummary, KeyTopic } from "@/types";
import { formatTimestamp } from "@/lib/utils";
import { BookOpen, Clock, ChevronRight } from "lucide-react";

interface Props {
  summary?: MeetingSummary;
  keyTopics: KeyTopic[];
  onTopicClick: (time: number) => void;
}

export function SummaryPanel({ summary, keyTopics, onTopicClick }: Props) {
  if (!summary) {
    return (
      <div className="p-8 text-center text-gray-400">
        <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-30" />
        <p className="text-sm">No summary available for this meeting.</p>
      </div>
    );
  }

  return (
    <div className="p-6 overflow-y-auto h-full max-w-3xl space-y-6">
      {/* Overview */}
      <section>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Overview</h3>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-700 leading-relaxed">{summary.overview}</p>
        </div>
      </section>

      {/* TL;DR */}
      {summary.short_summary && (
        <section>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">TL;DR</h3>
          <div className="bg-purple-50 rounded-lg border border-purple-100 p-4">
            <p className="text-sm text-purple-800 leading-relaxed font-medium">{summary.short_summary}</p>
          </div>
        </section>
      )}

      {/* Key Topics / Chapters */}
      {keyTopics.length > 0 && (
        <section>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key Topics</h3>
          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
            {keyTopics.map(topic => (
              <button
                key={topic.id}
                onClick={() => onTopicClick(topic.start_time ?? 0)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm text-gray-800 font-medium">{topic.title}</span>
                <div className="flex items-center gap-2">
                  {topic.start_time != null && (
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimestamp(topic.start_time)}
                    </span>
                  )}
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}