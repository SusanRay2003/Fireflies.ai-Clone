from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.meeting import Meeting, TranscriptSegment

router = APIRouter(prefix="/search", tags=["search"])

@router.get("/")
def global_search(q: str = Query(..., min_length=1), db: Session = Depends(get_db)):
    meetings = db.query(Meeting).filter(Meeting.title.ilike(f"%{q}%")).limit(10).all()
    segments = (
        db.query(TranscriptSegment)
        .filter(TranscriptSegment.text.ilike(f"%{q}%"))
        .limit(20)
        .all()
    )
    return {
        "meetings": [{"id": m.id, "title": m.title, "date": m.date} for m in meetings],
        "transcript_hits": [
            {"meeting_id": s.meeting_id, "speaker": s.speaker, "text": s.text, "start_time": s.start_time}
            for s in segments
        ]
    }