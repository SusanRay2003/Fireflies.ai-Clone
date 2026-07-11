import { MeetingListItem } from "@/types";

export type NotebookView = "mine" | "all" | "autopilot";
export type MineFilter = "hosted" | "shared";

export interface NotebookViewState {
  workspaceTitle: string;
  showFilterPills: boolean;
  emptyState: {
    title: string;
    subtitle: string;
    actionLabel: string;
    actionType: "capture" | "create";
    showIllustration: boolean;
  };
  askFredPills: string[];
  chatInputBadge: string;
}

export function filterMeetingsByView(
  meetings: MeetingListItem[],
  view: NotebookView,
  mineFilter: MineFilter = "shared",
): MeetingListItem[] {
  if (view === "autopilot") {
    return [];
  }
  if (view === "mine" && mineFilter === "shared") {
    return [];
  }
  return meetings;
}

export function getNotebookViewState(
  view: NotebookView,
  mineFilter: MineFilter = "shared",
): NotebookViewState {
  if (view === "mine") {
    if (mineFilter === "shared") {
      return {
        workspaceTitle: "Meetings",
        showFilterPills: true,
        emptyState: {
          title: "No meetings shared with you yet",
          subtitle: "Meetings hosted by others and shared with you will show up here.",
          actionLabel: "+ Capture",
          actionType: "capture",
          showIllustration: true,
        },
        askFredPills: ["📌 Key initiatives", "📝 Summarize the channel", "💬 Product feedback"],
        chatInputBadge: "# Shared with me",
      };
    }
    return {
      workspaceTitle: "Meetings",
      showFilterPills: true,
      emptyState: {
        title: "Looks like you haven't recorded a meeting yet",
        subtitle: "Once you record your first meeting with Fireflies, it'll show up right here.",
        actionLabel: "+ Capture",
        actionType: "capture",
        showIllustration: true,
      },
      askFredPills: ["✅ My action items", "🎯 Key decisions", "📌 Key initiatives"],
      chatInputBadge: "# Hosted by me",
    };
  }

  if (view === "all") {
    return {
      workspaceTitle: "Meetings",
      showFilterPills: false,
      emptyState: {
        title: "Looks like you haven't recorded a meeting yet",
        subtitle: "Once you record your first meeting with Fireflies, it'll show up right here.",
        actionLabel: "+ Capture",
        actionType: "capture",
        showIllustration: true,
      },
      askFredPills: ["📌 Key initiatives", "📝 Summarize the channel", "💬 Product feedback"],
      chatInputBadge: "# All Meetings",
    };
  }

  return {
    workspaceTitle: "Meetings",
    showFilterPills: false,
    emptyState: {
      title: "Let a voice agent take your meetings",
      subtitle: "Create a voice agent to attend meetings on your behalf, or explore existing agents.",
      actionLabel: "+ Create",
      actionType: "create",
      showIllustration: true,
    },
    askFredPills: ["📌 Key initiatives", "📝 Summarize the channel", "💬 Product feedback"],
    chatInputBadge: "# Voice Agent Meetings",
  };
}

export const NOTEBOOK_NAV_ITEMS = [
  { label: "My Meetings", href: "/notebook/mine", view: "mine" as const },
  { label: "All Meetings", href: "/notebook/all", view: "all" as const },
  { label: "Voice Agent Meetings", href: "/notebook/autopilot", view: "autopilot" as const },
];
