from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional
import json

from ..core.database import get_db
from ..models.meeting import Meeting, Participant, TranscriptSegment, MeetingSummary, ActionItem, KeyTopic
from ..schemas.meeting import (
    MeetingCreate, MeetingUpdate, MeetingListItem, MeetingDetail,
    ActionItemCreate, ActionItemUpdate, ActionItemOut
)
from ..services.ai_service import generate_meeting_analysis, parse_transcript_text

router = APIRouter(prefix="/meetings", tags=["meetings"])


@router.get("/", response_model=list[MeetingListItem])
def list_meetings(
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Meeting)
    if search:
        query = query.filter(Meeting.title.ilike(f"%{search}%"))
    return query.order_by(Meeting.date.desc()).all()


@router.post("/", response_model=MeetingDetail)
async def create_meeting(
    title: str = Form(...),
    organizer: str = Form(default="Susan Ray"),
    participants: str = Form(default="[]"),   # JSON string
    transcript_text: Optional[str] = Form(default=None),
    transcript_file: Optional[UploadFile] = File(default=None),
    db: Session = Depends(get_db)
):
    # read transcript from file if provided
    raw_transcript = transcript_text or ""
    if transcript_file:
        content = await transcript_file.read()
        raw_transcript = content.decode("utf-8")

    participants_list = json.loads(participants)

    # create meeting record
    meeting = Meeting(title=title, organizer=organizer)
    db.add(meeting)
    db.flush()  # get meeting.id before committing

    # add participants
    for p in participants_list:
        db.add(Participant(meeting_id=meeting.id, name=p["name"], email=p.get("email")))

    # parse and store transcript segments
    segments = []
    if raw_transcript:
        parsed = parse_transcript_text(raw_transcript)
        for seg in parsed:
            s = TranscriptSegment(meeting_id=meeting.id, **seg)
            db.add(s)
            segments.append(s)
        if parsed:
            meeting.duration = parsed[-1]["end_time"]

    # generate AI analysis
    if raw_transcript:
        try:
            analysis = generate_meeting_analysis(raw_transcript, title)
            db.add(MeetingSummary(
                meeting_id=meeting.id,
                overview=analysis.get("overview", ""),
                short_summary=analysis.get("short_summary", ""),
            ))
            for i, ai in enumerate(analysis.get("action_items", [])):
                db.add(ActionItem(
                    meeting_id=meeting.id,
                    text=ai["text"],
                    assignee=ai.get("assignee"),
                ))
            for i, kt in enumerate(analysis.get("key_topics", [])):
                db.add(KeyTopic(
                    meeting_id=meeting.id,
                    title=kt["title"],
                    start_time=kt.get("start_time", 0),
                    sequence=i,
                ))
        except Exception as e:
            print(f"AI analysis failed: {e}")  # don't fail the whole request

    db.commit()
    db.refresh(meeting)
    return meeting


@router.get("/{meeting_id}", response_model=MeetingDetail)
def get_meeting(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    return meeting


@router.patch("/{meeting_id}", response_model=MeetingDetail)
def update_meeting(meeting_id: int, data: MeetingUpdate, db: Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    if data.title:
        meeting.title = data.title
    if data.organizer:
        meeting.organizer = data.organizer
    if data.participants is not None:
        db.query(Participant).filter(Participant.meeting_id == meeting_id).delete()
        for p in data.participants:
            db.add(Participant(meeting_id=meeting_id, name=p.name, email=p.email))
    db.commit()
    db.refresh(meeting)
    return meeting


@router.delete("/{meeting_id}")
def delete_meeting(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    db.delete(meeting)
    db.commit()
    return {"ok": True}


# --- Action Items ---

@router.post("/{meeting_id}/action-items", response_model=ActionItemOut)
def create_action_item(meeting_id: int, data: ActionItemCreate, db: Session = Depends(get_db)):
    item = ActionItem(meeting_id=meeting_id, text=data.text, assignee=data.assignee)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.patch("/{meeting_id}/action-items/{item_id}", response_model=ActionItemOut)
def update_action_item(meeting_id: int, item_id: int, data: ActionItemUpdate, db: Session = Depends(get_db)):
    item = db.query(ActionItem).filter(ActionItem.id == item_id, ActionItem.meeting_id == meeting_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Action item not found")
    if data.text is not None:
        item.text = data.text
    if data.assignee is not None:
        item.assignee = data.assignee
    if data.completed is not None:
        item.completed = data.completed
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{meeting_id}/action-items/{item_id}")
def delete_action_item(meeting_id: int, item_id: int, db: Session = Depends(get_db)):
    item = db.query(ActionItem).filter(ActionItem.id == item_id, ActionItem.meeting_id == meeting_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Action item not found")
    db.delete(item)
    db.commit()
    return {"ok": True}