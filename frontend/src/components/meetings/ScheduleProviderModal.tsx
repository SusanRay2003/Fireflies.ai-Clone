"use client";
import { X, Globe, Mail } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
}

export function ScheduleProviderModal({ onClose }: Props) {
  const handleProvider = (name: string) => {
    toast(`${name} flow not implemented in this demo`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Schedule Meeting</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-600">Your AI Notetaker will be invited to the calendar meeting to record, transcribe and summarize.</p>

          <div className="space-y-3">
            <button
              onClick={() => handleProvider("Google Calendar")}
              className="flex items-center gap-3 w-full rounded-md border border-gray-200 px-4 py-3 text-sm hover:bg-gray-50"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded bg-white">
                <Globe className="w-5 h-5 text-blue-600" />
              </span>
              Google Calendar
            </button>

            <button
              onClick={() => handleProvider("Microsoft Outlook")}
              className="flex items-center gap-3 w-full rounded-md border border-gray-200 px-4 py-3 text-sm hover:bg-gray-50"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded bg-white">
                <Mail className="w-5 h-5 text-indigo-600" />
              </span>
              Microsoft Outlook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
