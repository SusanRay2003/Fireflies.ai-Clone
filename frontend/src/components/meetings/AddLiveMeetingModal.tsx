"use client";
import { useState } from "react";
import { X, Link as LinkIcon } from "lucide-react";

interface Props {
  onClose: () => void;
}

export function AddLiveMeetingModal({ onClose }: Props) {
  const [name, setName] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [language, setLanguage] = useState("English (Global)");

  const canStart = !!meetingLink.trim();

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Add to live meeting</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Name your meeting <span className="text-gray-400">(Optional)</span></label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="E.g. Product team sync"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Meeting link</label>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-9 h-9 rounded bg-gray-50 border border-gray-200">
                <LinkIcon className="w-4 h-4 text-gray-500" />
              </span>
              <input
                value={meetingLink}
                onChange={e => setMeetingLink(e.target.value)}
                placeholder="https://teams.microsoft.com/l/meetup-join/"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Capture meetings from GMeet, Zoom, MS teams, and more.</p>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Meeting language</label>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option>English (Global)</option>
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Cancel</button>
          <button
            disabled={!canStart}
            onClick={() => {
              // In the real app this would start capture; here we just close for demo
              onClose();
            }}
            className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            Start Capturing
          </button>
        </div>
      </div>
    </div>
  );
}
