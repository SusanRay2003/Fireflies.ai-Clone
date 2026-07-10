"use client";
import { useState } from "react";
import { X, Upload } from "lucide-react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

export function CreateMeetingModal({ onClose, onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [participants, setParticipants] = useState("");
  const [transcriptText, setTranscriptText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) { toast.error("Title is required"); return; }
    setLoading(true);
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("organizer", "Susan Ray");
      const pList = participants.split(",").map(s => s.trim()).filter(Boolean)
        .map(name => ({ name }));
      form.append("participants", JSON.stringify(pList));
      if (transcriptText) form.append("transcript_text", transcriptText);
      if (file) form.append("transcript_file", file);
      await api.meetings.create(form);
      toast.success("Meeting created!");
      onCreated();
    } catch {
      toast.error("Failed to create meeting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">New Meeting</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Meeting Title *</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="E.g. Product team sync"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Participants (comma-separated)</label>
            <input
              value={participants}
              onChange={e => setParticipants(e.target.value)}
              placeholder="Alice, Bob, Carol"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Paste Transcript (optional)</label>
            <textarea
              value={transcriptText}
              onChange={e => setTranscriptText(e.target.value)}
              placeholder={"[00:00] Speaker: text...\n[00:30] Other: response..."}
              rows={5}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 font-mono"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Or Upload Transcript File (.txt)</label>
            <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-md cursor-pointer hover:border-purple-400 text-sm text-gray-500">
              <Upload className="w-4 h-4" />
              {file ? file.name : "Browse files"}
              <input type="file" accept=".txt,.vtt" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
            </label>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Creating…" : "Create Meeting"}
          </button>
        </div>
      </div>
    </div>
  );
}