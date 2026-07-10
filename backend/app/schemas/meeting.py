from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ParticipantBase(BaseModel):
    name: str
    email: Optional[str] = None

class ParticipantOut(ParticipantBase):
    id: int
    class Config: from_attributes = True

class TranscriptSegmentOut(BaseModel):
    id: int
    speaker: str
    text: str
    start_time: float
    end_time: float
    sequence: int
    class Config: from_attributes = True

class ActionItemBase(BaseModel):
    text: str
    assignee: Optional[str] = None

class ActionItemCreate(ActionItemBase):
    pass

class ActionItemUpdate(BaseModel):
    text: Optional[str] = None
    assignee: Optional[str] = None
    completed: Optional[bool] = None

class ActionItemOut(ActionItemBase):
    id: int
    completed: bool
    created_at: datetime
    class Config: from_attributes = True

class KeyTopicOut(BaseModel):
    id: int
    title: str
    start_time: Optional[float]
    sequence: int
    class Config: from_attributes = True

class SummaryOut(BaseModel):
    id: int
    overview: Optional[str]
    short_summary: Optional[str]
    class Config: from_attributes = True

class MeetingBase(BaseModel):
    title: str
    organizer: Optional[str] = "Susan Ray"

class MeetingCreate(MeetingBase):
    transcript_text: Optional[str] = None
    participants: Optional[list[ParticipantBase]] = []

class MeetingUpdate(BaseModel):
    title: Optional[str] = None
    organizer: Optional[str] = None
    participants: Optional[list[ParticipantBase]] = None

class MeetingListItem(BaseModel):
    id: int
    title: str
    date: datetime
    duration: float
    organizer: str
    status: str
    participants: list[ParticipantOut] = []
    class Config: from_attributes = True

class MeetingDetail(MeetingListItem):
    transcript_segments: list[TranscriptSegmentOut] = []
    summary: Optional[SummaryOut] = None
    action_items: list[ActionItemOut] = []
    key_topics: list[KeyTopicOut] = []