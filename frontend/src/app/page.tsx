import { MeetingListItem } from "@/types";
import { HomeTabs } from "@/components/home/HomeTabs";
import { QuickActionsClient } from "@/components/home/QuickActionsClient";
import { HeroBanner } from "@/components/home/HeroBanner";
import { DesktopAppCard } from "@/components/home/DesktopAppCard";
import { MobileAppCard } from "@/components/home/MobileAppCard";

export default async function HomePage() {
  let meetings: MeetingListItem[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/meetings/`, {
      next: { revalidate: 30 },
    });
    if (res.ok) {
      meetings = await res.json();
    }
  } catch {
    meetings = [];
  }

  return (
    <div className="min-h-screen bg-[#FAFAFC]">
      <div className="mx-auto max-w-[1220px] px-6 py-6 sm:px-8 lg:px-10 lg:py-8">
        <HeroBanner />

        <section className="mt-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6D4AFF]">Quick Start</p>
          <p className="mt-2 max-w-[560px] text-sm leading-6 text-[#666666]">
            Capture your first meeting or upload a recording to see Fireflies in action.
          </p>
          <div className="mt-4">
            <QuickActionsClient />
          </div>
        </section>

        <section className="mt-8">
          <HomeTabs meetings={meetings} />
        </section>

        <section className="mt-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1F1F1F]">Try More</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <DesktopAppCard />
            <MobileAppCard />
          </div>
        </section>
      </div>
    </div>
  );
}

