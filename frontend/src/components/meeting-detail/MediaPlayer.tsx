"use client";
import { forwardRef, useImperativeHandle, useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, SkipBack, SkipForward } from "lucide-react";
import { formatTimestamp } from "@/lib/utils";

interface Props {
  duration: number;
  onTimeUpdate: (time: number) => void;
}

export const MediaPlayer = forwardRef<{ seekTo: (t: number) => void }, Props>(
  ({ duration, onTimeUpdate }, ref) => {
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useImperativeHandle(ref, () => ({
      seekTo: (t: number) => {
        setCurrentTime(t);
        onTimeUpdate(t);
      },
    }));

    useEffect(() => {
      if (playing) {
        intervalRef.current = setInterval(() => {
          setCurrentTime(prev => {
            const next = prev + 0.5;
            if (next >= duration) { setPlaying(false); return duration; }
            onTimeUpdate(next);
            return next;
          });
        }, 500);
      }
      return () => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }
};
    }, [playing, duration, onTimeUpdate]);

    const seek = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      const t = pct * duration;
      setCurrentTime(t);
      onTimeUpdate(t);
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <button className="p-1.5 text-gray-500 hover:text-gray-700" onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}>
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700"
            onClick={() => setPlaying(!playing)}
          >
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <button className="p-1.5 text-gray-500 hover:text-gray-700" onClick={() => setCurrentTime(Math.min(duration, currentTime + 10))}>
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        <span className="text-xs text-gray-500 w-10 tabular-nums">{formatTimestamp(currentTime)}</span>

        <div className="flex-1 h-1.5 bg-gray-200 rounded-full cursor-pointer" onClick={seek}>
          <div className="h-full bg-purple-600 rounded-full relative" style={{ width: `${progress}%` }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-600 rounded-full shadow" />
          </div>
        </div>

        <span className="text-xs text-gray-500 w-10 tabular-nums">{formatTimestamp(duration)}</span>
        <Volume2 className="w-4 h-4 text-gray-400" />
      </div>
    );
  }
);
MediaPlayer.displayName = "MediaPlayer";