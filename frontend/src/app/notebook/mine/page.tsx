"use client";

import { NotebookWorkspace } from "@/components/meetings/NotebookWorkspace";

export default function MyMeetingsPage() {
  return <NotebookWorkspace view="mine" defaultMineFilter="shared" />;
}
