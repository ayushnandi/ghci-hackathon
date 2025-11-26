"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Reminder {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: string;
  status: "active" | "completed";
}

export default function StreamListener() {
  const { user, isLoaded } = useUser();
  const { setReminders, setUICards } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const userId = user.id;

    console.log("🔌 Connecting SSE for:", userId);

    const evt = new EventSource(`/api/stream/${userId}`);

    evt.onmessage = (evt) =>
      eventHandler(evt, router, setReminders, setUICards);
    evt.onerror = (err) => console.error("❌ SSE error:", err);

    return () => evt.close();
  }, [isLoaded, user]);

  return null;
}

const eventHandler = (
  evt: MessageEvent<any>,
  router: AppRouterInstance,
  setReminders: Function,
  setUICards: Function
) => {
  const msg = evt.data;

  switch (true) {
    case msg.startsWith("navigate:"): {
      const path = msg.replace("navigate:", "");
      console.log("➡️ Navigating to:", path);
      router.push(path);
      break;
    }

    case msg.startsWith("reminder:"): {
      try {
        const reminder = JSON.parse(msg.replace("reminder:", ""));
        console.log("🆕 Reminder received:", reminder);
        setReminders((prev: Reminder[]) => [...prev, reminder]);
      } catch (err) {
        console.error("❌ Reminder parse error:", err);
      }
      break;
    }

    case msg.startsWith("ui_card:"): {
      try {
        const card = JSON.parse(msg.replace("ui_card:", ""));
        console.log("🃏 UI Card received:", card);

        setUICards((prev: any[]) => [
          ...prev,
          ...(Array.isArray(card) ? card : [card]),
        ]);

        setTimeout(() => {
          setUICards((prev: any[]) => prev.slice(1));
        }, 8000);
      } catch (err) {
        console.error("❌ Failed to parse UI Card:", err);
      }
      break;
    }

    case msg === "refresh": {
      console.log("🔄 Refreshing page...");
      router.refresh();
      break;
    }

    default:
      console.warn("⚠️ Unknown SSE event:", msg);
  }
};
