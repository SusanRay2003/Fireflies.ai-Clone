export interface Participant {
  id: number;
  name: string;
  email?: string;
}

export interface TranscriptSegment {
  id: number;
  speaker: string;
  text: string;
  start_time: number;
  end_time: number;
  sequence: number;
}

export interface ActionItem {
  id: number;
  text: string;
  assignee?: string;
  completed: boolean;
  created_at: string;
}

export interface KeyTopic {
  id: number;
  title: string;
  start_time?: number;
  sequence: number;
}

export interface MeetingSummary {
  id: number;
  overview?: string;
  short_summary?: string;
}

export interface MeetingListItem {
  id: number;
  title: string;
  date: string;
  duration: number;
  organizer: string;
  status: string;
  participants: Participant[];
}

export interface MeetingDetail extends MeetingListItem {
  transcript_segments: TranscriptSegment[];
  summary?: MeetingSummary;
  action_items: ActionItem[];
  key_topics: KeyTopic[];
}