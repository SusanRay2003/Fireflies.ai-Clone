import Link from "next/link";
import { Calendar, Upload, Plus } from "lucide-react";

export default function HomePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-8 flex items-center justify-between border border-purple-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome Aboard, Susan!</h1>
          <p className="text-gray-600">Fireflies is ready to automate your meetings and streamline your workflows.</p>
        </div>
        <div className="w-24 h-16 bg-gray-900 rounded-lg flex items-center justify-center text-white text-xs">
          ▶ Demo
        </div>
      </div>

      {/* Quick Start */}
      <h2 className="text-base font-semibold text-gray-900 mb-1">Quick Start</h2>
      <p className="text-sm text-gray-500 mb-4">Capture your first meeting or upload a recording to see Fireflies in action.</p>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: "Schedule Meeting", icon: Calendar, href: "/meetings" },
          { label: "Upload File", icon: Upload, href: "/uploads" },
          { label: "Capture Meeting", icon: Plus, href: "/meetings" },
        ].map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center justify-between px-4 py-4 border border-gray-200 bg-white rounded-xl hover:border-purple-300 hover:shadow-sm transition-all text-sm font-medium text-gray-700 group"
          >
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-purple-500" />
              {label}
            </div>
            <span className="text-gray-400 group-hover:text-purple-500">›</span>
          </Link>
        ))}
      </div>

      {/* Recent */}
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-base font-semibold text-gray-900">Recent</h2>
        <Link href="/meetings" className="text-xs text-purple-600 hover:underline ml-auto">View all →</Link>
      </div>

      <RecentMeetingsPreview />
    </div>
  );
}

// server component to show a few recent meetings
import { MeetingListItem } from "@/types";
import { format } from "date-fns";

async function RecentMeetingsPreview() {
  let meetings: MeetingListItem[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/meetings/`, { next: { revalidate: 30 } });
    meetings = await res.json();
  } catch {}

  if (meetings.length === 0) {
    return <p className="text-sm text-gray-400">No meetings yet.</p>;
  }

  return (
    <div className="space-y-2">
      {meetings.slice(0, 3).map(m => (
        <Link
          key={m.id}
          href={`/meetings/${m.id}`}
          className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-purple-200 transition-colors"
        >
          <div className="w-8 h-8 rounded bg-purple-50 flex items-center justify-center">
            <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-purple-700 rounded-sm" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{m.title}</p>
            <p className="text-xs text-gray-500">{format(new Date(m.date), "EEE, MMM d yyyy, h:mm a")}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}