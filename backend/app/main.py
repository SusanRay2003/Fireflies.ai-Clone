from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .core.database import engine, Base, SessionLocal
from .api import meetings, search

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Fireflies Clone API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(meetings.router)
app.include_router(search.router)

@app.get("/health")
def health():
    return {"status": "ok"}


@app.on_event("startup")
def auto_seed():
    """Seed the database on startup if it's empty."""
    from .models.meeting import Meeting
    db = SessionLocal()
    try:
        count = db.query(Meeting).count()
        if count == 0:
            print("🌱 Database empty — running seed...")
            _run_seed(db)
            print("✅ Seed complete.")
        else:
            print(f"✅ Database already has {count} meetings, skipping seed.")
    finally:
        db.close()


def _run_seed(db):
    from datetime import datetime, timedelta
    from .models.meeting import (
        Meeting, Participant, TranscriptSegment,
        MeetingSummary, ActionItem, KeyTopic
    )

    meetings_data = [
        {
            "title": "Q3 Product Roadmap Planning",
            "date": datetime.utcnow() - timedelta(days=2),
            "duration": 3600,
            "organizer": "Susan Ray",
            "participants": [
                {"name": "Susan Ray", "email": "susan@company.com"},
                {"name": "Alex Johnson", "email": "alex@company.com"},
                {"name": "Priya Sharma", "email": "priya@company.com"},
            ],
            "segments": [
                (0, 12, "Susan Ray", "Good morning everyone. Let's kick off our Q3 planning session. I want to start by reviewing what we shipped in Q2 and then move into prioritization for this quarter."),
                (12, 30, "Alex Johnson", "Sounds good Susan. In Q2 we managed to ship the new onboarding flow, the analytics dashboard v2, and the API rate limiting improvements. The onboarding metrics are looking really strong — 40% improvement in day-7 retention."),
                (30, 55, "Priya Sharma", "That onboarding win was huge. For Q3, I think we should double down on the API side. We have a lot of enterprise customers waiting for webhook support and better SDKs."),
                (55, 90, "Susan Ray", "Agreed. Alex, can you scope out the webhook implementation? I'm thinking we need it by end of July to not block the enterprise deals pipeline."),
                (90, 130, "Alex Johnson", "I can do that. Realistically it's a 3-week sprint if Priya can help with the documentation side. The tricky part is retry logic and signature verification."),
                (130, 160, "Priya Sharma", "I'm on the docs. I'll also set up a developer preview environment so customers can test it early. Should we do a private beta with 5 or so design partners?"),
                (160, 195, "Susan Ray", "Yes — let's pick the top 5 enterprise prospects and loop in the sales team. I'll email Marcus today."),
                (195, 230, "Alex Johnson", "I'll assign the iOS push notification bug to the mobile team. Should be a 2-day fix once we isolate the root cause."),
                (230, 270, "Priya Sharma", "Can we allocate at least one designer and one frontend engineer for the design system refresh for 2 weeks this quarter?"),
                (270, 310, "Susan Ray", "Let's put that in the plan with a target of mid-August. Priya, you own that workstream."),
                (310, 340, "Alex Johnson", "Just want to flag that we're still waiting on legal to approve the new DPA for EU customers. That's blocking 3 enterprise contracts."),
                (340, 360, "Susan Ray", "I'll escalate to legal today. Let's wrap here. Great session everyone."),
            ],
            "summary": {
                "overview": "The Q3 product roadmap planning session covered Q2 retrospective highlights, enterprise API needs including webhook support, mobile bug fixes, and a design system refresh.",
                "short_summary": "Team planned Q3 priorities: webhook API for enterprise, iOS push bug fix, and design system refresh.",
            },
            "action_items": [
                ("Alex Johnson scope webhook implementation for end of July", "Alex Johnson"),
                ("Priya Sharma set up developer preview environment for webhook beta", "Priya Sharma"),
                ("Susan Ray email Marcus to select 5 enterprise beta partners", "Susan Ray"),
                ("Susan Ray escalate DPA approval to legal team today", "Susan Ray"),
            ],
            "key_topics": [
                ("Q2 Retrospective", 12),
                ("Webhook API for Enterprise", 55),
                ("iOS Push Notification Bug", 160),
                ("Design System Refresh", 230),
                ("Legal / DPA Blocker", 310),
            ],
        },
        {
            "title": "Engineering Weekly Standup",
            "date": datetime.utcnow() - timedelta(days=5),
            "duration": 1800,
            "organizer": "Alex Johnson",
            "participants": [
                {"name": "Alex Johnson", "email": "alex@company.com"},
                {"name": "Rohan Mehta", "email": "rohan@company.com"},
                {"name": "Lena Fischer", "email": "lena@company.com"},
            ],
            "segments": [
                (0, 15, "Alex Johnson", "Alright, let's run through updates. Rohan, kick us off."),
                (15, 45, "Rohan Mehta", "I finished the database indexing work on the transcript search. Query time went from 800ms to under 50ms on the largest datasets."),
                (45, 80, "Lena Fischer", "I completed the transcript segment highlighting feature on the frontend. Click-to-seek is working now."),
                (80, 110, "Alex Johnson", "Good catch Lena. Let's mock the audio URL as a signed S3 URL format for now so we can keep moving."),
                (110, 140, "Rohan Mehta", "I was going to try a database-level advisory lock first. Should have a fix by Wednesday."),
                (140, 165, "Lena Fischer", "I also noticed the search highlight component has a performance issue with very long transcripts — I'll add debouncing."),
                (165, 185, "Alex Johnson", "Good catch. Any blockers either of you need from me?"),
                (185, 210, "Rohan Mehta", "I need access to the staging database to test the lock. Can you grant that today?"),
                (210, 250, "Alex Johnson", "Done. I'll send the credentials after this call."),
            ],
            "summary": {
                "overview": "Weekly engineering standup covering database indexing improvements, transcript highlighting, and plans to fix a race condition.",
                "short_summary": "Search indexing 16x faster, click-to-seek done, race condition and debounce fix in progress.",
            },
            "action_items": [
                ("Alex Johnson grant Rohan staging database access today", "Alex Johnson"),
                ("Rohan fix job queue race condition by Wednesday", "Rohan Mehta"),
                ("Lena submit PR for search highlight debounce fix", "Lena Fischer"),
            ],
            "key_topics": [
                ("Database Indexing", 15),
                ("Click-to-Seek Feature", 45),
                ("Race Condition Fix", 80),
            ],
        },
        {
            "title": "Customer Onboarding — Acme Corp",
            "date": datetime.utcnow() - timedelta(days=10),
            "duration": 2700,
            "organizer": "Susan Ray",
            "participants": [
                {"name": "Susan Ray", "email": "susan@company.com"},
                {"name": "David Park", "email": "david@acmecorp.com"},
                {"name": "Nina Torres", "email": "nina@acmecorp.com"},
            ],
            "segments": [
                (0, 20, "Susan Ray", "Hi David, hi Nina — great to have you here for your onboarding session. Today I want to walk you through the platform."),
                (20, 60, "David Park", "Thanks Susan. We have about 200 meetings per month. The main thing we want is automatic summaries and action item extraction."),
                (60, 95, "Susan Ray", "That's exactly what our platform is built for. Let me show you the meeting library first."),
                (95, 130, "Nina Torres", "How does the speaker detection work? We have some meetings with 10 plus people."),
                (130, 165, "Susan Ray", "The system uses voice fingerprinting and calendar integration to identify speakers."),
                (165, 200, "David Park", "Can we integrate with our Salesforce CRM? We want action items to automatically create tasks."),
                (200, 235, "Susan Ray", "Yes, we have a native Salesforce integration. I'll share the setup guide after this call."),
                (235, 310, "Nina Torres", "What about security? We handle some sensitive customer data in our sales calls."),
                (310, 360, "Susan Ray", "We're SOC 2 Type II certified, all data is encrypted at rest and in transit."),
                (360, 420, "David Park", "Perfect. Thank you Susan, this was very helpful."),
            ],
            "summary": {
                "overview": "Customer onboarding call with Acme Corp covering speaker detection, Salesforce integration, security compliance, and rollout strategy.",
                "short_summary": "Onboarded Acme Corp: covered summaries, Salesforce integration, security, and 5-user pilot plan.",
            },
            "action_items": [
                ("Susan Ray send Salesforce integration guide to David and Nina", "Susan Ray"),
                ("Susan Ray send security whitepaper to Acme Corp", "Susan Ray"),
                ("Schedule 2-week check-in call with Acme Corp", "Susan Ray"),
                ("Acme Corp identify 5 pilot users for rollout", "David Park"),
            ],
            "key_topics": [
                ("Platform Overview", 20),
                ("Speaker Detection", 95),
                ("Salesforce Integration", 165),
                ("Security and Compliance", 235),
            ],
        },
        {
            "title": "Design Review — New Dashboard",
            "date": datetime.utcnow() - timedelta(days=14),
            "duration": 2400,
            "organizer": "Priya Sharma",
            "participants": [
                {"name": "Priya Sharma", "email": "priya@company.com"},
                {"name": "Lena Fischer", "email": "lena@company.com"},
                {"name": "Marcus Webb", "email": "marcus@company.com"},
            ],
            "segments": [
                (0, 18, "Priya Sharma", "I've shared my screen. You should see the new dashboard mockups. Let me walk through the 3 key screens."),
                (18, 55, "Lena Fischer", "The overall layout looks really clean. My concern is the sidebar — it feels like it's competing with the main content."),
                (55, 90, "Priya Sharma", "That's fair. I can try a lighter sidebar with just icon highlights on active state."),
                (90, 125, "Marcus Webb", "My biggest ask is that action items are front and center on the dashboard. Customers keep asking for a unified task view."),
                (125, 160, "Priya Sharma", "I can add an action items widget on the right panel of the home screen."),
                (160, 225, "Marcus Webb", "Can we add a filter for overdue action items? That would be great for sales managers."),
                (225, 290, "Lena Fischer", "The overdue filter needs a due-date field on action items which we don't have yet. That's probably a week of backend work."),
                (290, 360, "Priya Sharma", "Let's add due dates to action items in this sprint. I'll update the mockups to include the date picker UI."),
                (360, 400, "Marcus Webb", "When I'm reviewing a meeting I want to jump to specific speakers quickly. Can we add a speaker filter?"),
            ],
            "summary": {
                "overview": "Design review of the new dashboard with feedback on sidebar design, action items widget, overdue filter, and speaker filter for transcripts.",
                "short_summary": "Dashboard design approved with lighter sidebar, action items widget, and speaker filter for transcripts.",
            },
            "action_items": [
                ("Priya update mockups with lighter sidebar", "Priya Sharma"),
                ("Priya add action items widget to home screen design", "Priya Sharma"),
                ("Add due_date field to action items backend", "Lena Fischer"),
                ("Priya design speaker filter chips for transcript view", "Priya Sharma"),
            ],
            "key_topics": [
                ("Sidebar Design", 18),
                ("Action Items Widget", 90),
                ("Overdue Filter", 160),
                ("Speaker Filter", 360),
            ],
        },
    ]

    for data in meetings_data:
        m = Meeting(
            title=data["title"],
            date=data["date"],
            duration=data["duration"],
            organizer=data["organizer"],
        )
        db.add(m)
        db.flush()

        for p in data["participants"]:
            db.add(Participant(meeting_id=m.id, name=p["name"], email=p["email"]))

        for start, end, speaker, text in data["segments"]:
            db.add(TranscriptSegment(
                meeting_id=m.id,
                speaker=speaker,
                text=text,
                start_time=float(start),
                end_time=float(end),
                sequence=start,
            ))

        db.add(MeetingSummary(
            meeting_id=m.id,
            overview=data["summary"]["overview"],
            short_summary=data["summary"]["short_summary"],
        ))

        for text, assignee in data["action_items"]:
            db.add(ActionItem(meeting_id=m.id, text=text, assignee=assignee))

        for i, (title, start_time) in enumerate(data["key_topics"]):
            db.add(KeyTopic(
                meeting_id=m.id,
                title=title,
                start_time=float(start_time),
                sequence=i,
            ))

    db.commit()