import json
import re

from openai import OpenAI

from ..core.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)


def generate_meeting_analysis(transcript_text: str, meeting_title: str) -> dict:
    """
    Generate meeting summary, action items and key topics using OpenAI.
    """

    prompt = f"""
You are an expert meeting assistant.

Analyze the following meeting transcript.

Meeting Title:
{meeting_title}

Transcript:
{transcript_text[:8000]}

Return ONLY valid JSON in the following format.

{{
  "overview": "2-3 sentence overview",
  "short_summary": "One sentence summary",
  "action_items": [
    {{
      "text": "Action item",
      "assignee": "Person name or null"
    }}
  ],
  "key_topics": [
    {{
      "title": "Topic name",
      "start_time": 0
    }}
  ]
}}

Do not include markdown.
Do not wrap in ```json.
Return ONLY JSON.
"""

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "system",
                "content": "You are an expert meeting summarizer."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        response_format={"type": "json_object"}
    )

    return json.loads(response.choices[0].message.content)


def parse_transcript_text(raw_text: str) -> list[dict]:
    """
    Parse transcript lines like:

    [00:00] Susan: Hello
    [00:05] John: Hi

    into structured transcript segments.
    """

    segments = []

    lines = raw_text.strip().split("\n")

    sequence = 0

    timestamp_pattern = re.compile(
        r"\[?(\d{1,2}:\d{2}(?::\d{2})?)\]?\s*([^:]+):\s*(.+)"
    )

    for line in lines:

        line = line.strip()

        if not line:
            continue

        match = timestamp_pattern.match(line)

        if match:

            time_str, speaker, text = match.groups()

            start_seconds = _time_to_seconds(time_str)

            segments.append(
                {
                    "speaker": speaker.strip(),
                    "text": text.strip(),
                    "start_time": start_seconds,
                    "end_time": start_seconds + 5,
                    "sequence": sequence,
                }
            )

            sequence += 1

        else:

            if segments:

                segments[-1]["text"] += " " + line

            else:

                segments.append(
                    {
                        "speaker": "Unknown",
                        "text": line,
                        "start_time": 0,
                        "end_time": 5,
                        "sequence": sequence,
                    }
                )

                sequence += 1

    for i in range(len(segments) - 1):
        segments[i]["end_time"] = segments[i + 1]["start_time"]

    return segments


def _time_to_seconds(time_str: str) -> float:

    parts = time_str.split(":")

    if len(parts) == 3:
        return (
            int(parts[0]) * 3600
            + int(parts[1]) * 60
            + float(parts[2])
        )

    elif len(parts) == 2:
        return int(parts[0]) * 60 + float(parts[1])

    return float(parts[0])