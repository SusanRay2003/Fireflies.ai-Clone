"""
Run with: python seed.py
Seeds 4 realistic meetings with full transcripts, summaries, and action items.
"""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from datetime import datetime, timedelta
from app.core.database import SessionLocal, engine
from app.core.database import Base
from app.models.meeting import Meeting, Participant, TranscriptSegment, MeetingSummary, ActionItem, KeyTopic

Base.metadata.create_all(bind=engine)
db = SessionLocal()

def seed():
    # clear existing data
    for model in [KeyTopic, ActionItem, MeetingSummary, TranscriptSegment, Participant, Meeting]:
        db.query(model).delete()
    db.commit()

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
                (30, 55, "Priya Sharma", "That onboarding win was huge. For Q3, I think we should double down on the API side. We have a lot of enterprise customers waiting for webhook support and better SDKs. That's the number one request in our support queue right now."),
                (55, 90, "Susan Ray", "Agreed. Alex, can you scope out the webhook implementation? I'm thinking we need it by end of July to not block the enterprise deals pipeline."),
                (90, 130, "Alex Johnson", "I can do that. Realistically it's a 3-week sprint if Priya can help with the documentation side. The tricky part is retry logic and signature verification."),
                (130, 160, "Priya Sharma", "I'm on the docs. I'll also set up a developer preview environment so customers can test it early. Should we do a private beta with 5 or so design partners?"),
                (160, 195, "Susan Ray", "Yes — let's pick the top 5 enterprise prospects and loop in the sales team. I'll email Marcus today. For the mobile side, we still have the push notification bug on iOS 17. That needs to be resolved this sprint, it's affecting a vocal group of users."),
                (195, 230, "Alex Johnson", "I'll assign that to the mobile team. Should be a 2-day fix once we isolate the root cause. I'll get Rohan on it Monday."),
                (230, 270, "Priya Sharma", "One more thing — the design system refresh. We've been putting it off but the inconsistency is slowing down every feature team. Can we allocate at least one designer and one frontend engineer for 2 weeks this quarter?"),
                (270, 310, "Susan Ray", "Let's put that in the plan with a target of mid-August. Priya, you own that workstream. Any final blockers before we close out?"),
                (310, 340, "Alex Johnson", "Just want to flag that we're still waiting on legal to approve the new DPA for EU customers. That's blocking 3 enterprise contracts. Can someone chase that this week?"),
                (340, 360, "Susan Ray", "I'll escalate to legal today. Let's wrap here. Great session everyone."),
            ],
            "summary": {
                "overview": "The Q3 product roadmap planning session covered Q2 retrospective highlights, enterprise API needs including webhook support, mobile bug fixes, and a design system refresh. The team agreed on concrete owners and timelines for each initiative.",
                "short_summary": "Team planned Q3 priorities: webhook API for enterprise, iOS push bug fix, and design system refresh.",
            },
            "action_items": [
                ("Alex Johnson scope webhook implementation for end of July", "Alex Johnson"),
                ("Priya Sharma set up developer preview environment for webhook beta", "Priya Sharma"),
                ("Susan Ray email Marcus to select 5 enterprise beta partners", "Susan Ray"),
                ("Rohan investigate iOS 17 push notification bug starting Monday", "Rohan"),
                ("Priya Sharma lead design system refresh workstream (target mid-August)", "Priya Sharma"),
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
                (15, 45, "Rohan Mehta", "I finished the database indexing work on the transcript search. Query time went from 800ms to under 50ms on the largest datasets. I'm now looking into the background job queue — there's a race condition that causes duplicate processing occasionally."),
                (45, 80, "Lena Fischer", "Nice work on the indexing. I completed the transcript segment highlighting feature on the frontend. Click-to-seek is working now. I'm blocked on the media player because we need a real audio file URL format — right now it's just a placeholder."),
                (80, 110, "Alex Johnson", "Good catch Lena. Let's mock the audio URL as a signed S3 URL format for now so we can keep moving. Rohan, for the race condition, have you looked at using a distributed lock with Redis?"),
                (110, 140, "Rohan Mehta", "I was going to try a database-level advisory lock first since we don't have Redis in the stack yet. If that doesn't work cleanly I'll revisit Redis. Should have a fix by Wednesday."),
                (140, 165, "Lena Fischer", "I also noticed the search highlight component has a performance issue with very long transcripts — it re-renders on every keystroke. I'll add debouncing and memoize the highlight logic."),
                (165, 185, "Alex Johnson", "Good catch. Any blockers either of you need from me?"),
                (185, 210, "Rohan Mehta", "I need access to the staging database to test the lock. Can you grant that today?"),
                (210, 230, "Alex Johnson", "Done. I'll send the credentials after this call. Lena, anything else?"),
                (230, 250, "Lena Fischer", "No, I think I'm good. I should have a PR up for the debounce fix by tomorrow morning."),
            ],
            "summary": {
                "overview": "Weekly engineering standup covering Rohan's database indexing improvements (800ms to 50ms), Lena's transcript highlighting and click-to-seek feature, and plans to fix a race condition in the job queue and a search highlight performance issue.",
                "short_summary": "Engineering standup: search indexing 16x faster, click-to-seek done, race condition and debounce fix in progress.",
            },
            "action_items": [
                ("Alex Johnson grant Rohan staging database access today", "Alex Johnson"),
                ("Rohan fix job queue race condition with database advisory lock by Wednesday", "Rohan Mehta"),
                ("Lena submit PR for search highlight debounce fix by tomorrow morning", "Lena Fischer"),
            ],
            "key_topics": [
                ("Database Indexing Improvements", 15),
                ("Click-to-Seek Feature", 45),
                ("Race Condition in Job Queue", 80),
                ("Search Highlight Performance", 140),
            ],
        },
        {
            "title": "Customer Onboarding Call — Acme Corp",
            "date": datetime.utcnow() - timedelta(days=10),
            "duration": 2700,
            "organizer": "Susan Ray",
            "participants": [
                {"name": "Susan Ray", "email": "susan@company.com"},
                {"name": "David Park", "email": "david.park@acmecorp.com"},
                {"name": "Nina Torres", "email": "nina.torres@acmecorp.com"},
            ],
            "segments": [
                (0, 20, "Susan Ray", "Hi David, hi Nina — great to have you here for your onboarding session. I'm Susan from the customer success team. Today I want to walk you through the platform and make sure you're set up for success."),
                (20, 60, "David Park", "Thanks Susan. We're very excited. We have about 200 meetings per month across our sales and engineering teams. The main thing we want is automatic summaries and action item extraction. Our ops team is spending 3 hours a week manually writing meeting notes."),
                (60, 95, "Susan Ray", "That's exactly what our platform is built for. Let me show you the meeting library first — you can see all your past meetings with AI-generated summaries right here. The action items get extracted automatically and you can assign them to team members."),
                (95, 130, "Nina Torres", "This looks great. How does the speaker detection work? We have some meetings with 10 plus people and the transcripts can get messy."),
                (130, 165, "Susan Ray", "Great question. The system uses voice fingerprinting and calendar integration to identify speakers. For large meetings it helps to have everyone say their name when they first speak. You can also manually edit speaker labels after the fact."),
                (165, 200, "David Park", "Can we integrate with our Salesforce CRM? We want the action items to automatically create tasks in Salesforce."),
                (200, 235, "Susan Ray", "Yes, we have a native Salesforce integration. I'll share the setup guide after this call. It takes about 15 minutes to configure and then every action item can auto-sync to a Salesforce task."),
                (235, 270, "Nina Torres", "What about security? We handle some sensitive customer data in our sales calls."),
                (270, 310, "Susan Ray", "We're SOC 2 Type II certified, all data is encrypted at rest and in transit, and you can set data retention policies per workspace. I'll send over our security whitepaper today."),
                (310, 350, "David Park", "Perfect. One last thing — what does the rollout process look like for our team?"),
                (350, 400, "Susan Ray", "I recommend starting with 5 power users for 2 weeks, gather their feedback, then roll out to the full team. I'll stay close to you during the first month. Let's schedule a check-in call for 2 weeks from today."),
                (400, 420, "David Park", "Sounds like a plan. Thank you Susan, this was very helpful."),
            ],
            "summary": {
                "overview": "Customer onboarding call with Acme Corp introducing them to the meeting intelligence platform. Key topics covered were speaker detection for large meetings, Salesforce CRM integration for action item sync, security and SOC 2 compliance, and rollout strategy starting with 5 pilot users.",
                "short_summary": "Onboarding Acme Corp: demonstrated summaries, covered Salesforce integration, security, and 5-user pilot rollout plan.",
            },
            "action_items": [
                ("Susan Ray send Salesforce integration setup guide to David and Nina", "Susan Ray"),
                ("Susan Ray send security whitepaper to Acme Corp today", "Susan Ray"),
                ("Schedule 2-week check-in call with Acme Corp", "Susan Ray"),
                ("Acme Corp identify 5 pilot users for initial rollout", "David Park"),
            ],
            "key_topics": [
                ("Platform Overview", 20),
                ("Speaker Detection", 95),
                ("Salesforce Integration", 165),
                ("Security and Compliance", 235),
                ("Rollout Strategy", 310),
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
                (0, 18, "Priya Sharma", "Okay, I've shared my screen. You should see the new dashboard mockups. I want to walk through the 3 key screens and get your feedback before we hand off to engineering."),
                (18, 55, "Lena Fischer", "The overall layout looks really clean. I love the card-based meeting list. My concern is the sidebar — it feels like it's competing with the main content for attention. The current purple is quite heavy."),
                (55, 90, "Priya Sharma", "That's fair feedback. I was going for brand consistency but I can try a lighter sidebar with just icon highlights on active state. What do you think Marcus from the sales perspective?"),
                (90, 125, "Marcus Webb", "Honestly my biggest ask is that the action items are front and center on the dashboard. Right now you have to click into a meeting to see them. Our customers keep saying they want a unified task view across all meetings."),
                (125, 160, "Priya Sharma", "That makes a lot of sense. I can add an action items widget on the right panel of the home screen — similar to how Notion shows you a task sidebar. Would a count badge on the nav item also help?"),
                (160, 190, "Marcus Webb", "Yes, the badge would be great for quick awareness. Also — can we add a filter for overdue action items? That would be killer for sales managers."),
                (190, 225, "Lena Fischer", "From an implementation perspective, the badge is straightforward. The overdue filter needs a due-date field on action items though, which we don't have yet. That's probably a week of backend work."),
                (225, 260, "Priya Sharma", "Let's add due dates to action items in this sprint then. I'll update the mockups to include the date picker UI. Lena, can you give me a rough estimate on the sidebar redesign?"),
                (260, 290, "Lena Fischer", "The sidebar change is 2 days max — it's mostly CSS variables. If we're updating the design tokens anyway for the design system refresh, we can batch this together."),
                (290, 320, "Marcus Webb", "One more thing — the transcript view. When I'm reviewing a meeting I want to jump to specific speakers quickly. Can we add a speaker filter or a mini-outline on the side?"),
                (320, 360, "Priya Sharma", "Love it. I'll add a speaker filter chip row above the transcript and a chapter outline panel. Lena, does that add significant complexity?"),
                (360, 400, "Lena Fischer", "The speaker filter is easy, maybe a day. The chapter outline needs the key topics from the AI summary to map to timestamps — that part needs some integration work, maybe 3 days total."),
            ],
            "summary": {
                "overview": "Design review of the new dashboard with feedback from engineering and sales. Key decisions included lightening the sidebar design, adding an action items widget and overdue filter on the home screen, adding due dates to action items, and designing a speaker filter and chapter outline for the transcript view.",
                "short_summary": "Dashboard design review: lighter sidebar, action items widget, overdue filter, speaker filter and chapter outline for transcripts approved.",
            },
            "action_items": [
                ("Priya update mockups with lighter sidebar and icon-only active states", "Priya Sharma"),
                ("Priya add action items widget and overdue filter to home screen design", "Priya Sharma"),
                ("Priya add due date picker to action item UI in mockups", "Priya Sharma"),
                ("Add due_date field to action items in backend sprint", "Lena Fischer"),
                ("Lena implement sidebar redesign, batch with design system tokens", "Lena Fischer"),
                ("Priya design speaker filter chips and chapter outline panel", "Priya Sharma"),
            ],
            "key_topics": [
                ("Sidebar Design Feedback", 18),
                ("Action Items Widget", 90),
                ("Overdue Filter and Due Dates", 160),
                ("Sidebar Implementation Estimate", 225),
                ("Transcript Speaker Filter and Chapter Outline", 290),
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
            db.add(KeyTopic(meeting_id=m.id, title=title, start_time=float(start_time), sequence=i))

    db.commit()
    print("✅ Database seeded with 4 meetings.")

if __name__ == "__main__":
    seed()