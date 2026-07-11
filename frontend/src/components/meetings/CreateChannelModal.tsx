"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface Props {
  onClose: () => void;
  onCreate: (name: string, isPrivate: boolean) => void;
}

export function CreateChannelModal({ onClose, onCreate }: Props) {
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const isValid = name.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div ref={dialogRef} className="w-full max-w-md rounded-[24px] bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.18)]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#1F1F1F]">Create Channel</h2>
            <p className="mt-1 text-sm text-[#666666]">Add a channel to organize your meetings.</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-[#666666] transition hover:bg-[#FAFAFC] hover:text-[#1F1F1F]">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <label className="block text-sm font-semibold text-[#1F1F1F]">Channel Name</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter channel name"
            className="w-full rounded-[16px] border border-[#ECECEC] bg-[#FAFAFC] px-4 py-3 text-sm text-[#1F1F1F] outline-none transition focus:border-[#6D4AFF] focus:ring-2 focus:ring-[#F5F1FF]"
          />
          {submitted && !isValid ? (
            <p className="text-sm text-red-600">Channel name is required.</p>
          ) : null}
          <div className="flex items-center justify-between rounded-[16px] border border-[#ECECEC] bg-white px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-[#1F1F1F]">Make Private</p>
              <p className="text-xs text-[#666666]">Only invited members can join.</p>
            </div>
            <button
              type="button"
              onClick={() => setIsPrivate((current) => !current)}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                isPrivate ? "bg-[#6D4AFF] text-white" : "border border-[#ECECEC] bg-white text-[#666666]"
              }`}
            >
              {isPrivate ? "On" : "Off"}
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#ECECEC] bg-white px-4 py-2 text-sm font-semibold text-[#1F1F1F] transition hover:bg-[#FAFAFC]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              setSubmitted(true);
              if (!isValid) return;
              onCreate(name.trim(), isPrivate);
            }}
            className="rounded-full bg-[#6D4AFF] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5A3FE6] disabled:opacity-50"
            disabled={!isValid}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
