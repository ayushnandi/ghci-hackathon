import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import type { UserJSON, SessionJSON } from "@clerk/nextjs/server";
import {
  handleUserCreated,
  handleUserDeleted,
  handleUserUpdated,
} from "@/utils/webhookHandlers/user";
import {
  handleSessionCreated,
  handleSessionEnded,
  handleSessionRemoved,
  handleSessionRevoked,
} from "@/utils/webhookHandlers/session";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add Webhook Secret!");
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Webhook verification failed", error);
    return new Response("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;
  const data = evt.data;

  console.log(`Clerk webhook received: ${eventType} for ID: ${data.id}`);

  switch (eventType) {
    /** USER EVENTS */
    case "user.created":
      await handleUserCreated(data as UserJSON);
      break;

    case "user.updated":
      await handleUserUpdated(data as UserJSON);
      break;

    case "user.deleted":
      await handleUserDeleted(data as UserJSON);
      break;

    /** SESSION EVENTS */
    // case "session.created":
    //   await handleSessionCreated(data as SessionJSON);
    //   break;

    // case "session.ended":
    //   await handleSessionEnded(data as SessionJSON);
    //   break;

    // case "session.removed":
    //   await handleSessionRemoved(data as SessionJSON);
    //   break;

    // case "session.revoked":
    //   await handleSessionRevoked(data as SessionJSON);
    //   break;

    default:
      console.log(`Unhandled Clerk event: ${eventType}`);
  }

  return new Response("Webhook received", { status: 200 });
}
