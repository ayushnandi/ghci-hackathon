import { SessionJSON, UserJSON } from "@clerk/nextjs/server";
import axios from "axios";

async function pushToAgent(
  clerkId: string,
  sessionToken?: string,
  user?: Partial<UserJSON>,
  status?: string
) {
  try {
    await axios.post(`${process.env.AGENT_URL}/`, {
      clerkId,
      sessionToken,
      user,
      status,
    });
  } catch (error) {
    console.error("Failed to push session to agent:", error);
  }
}

export async function handleSessionCreated(session: SessionJSON) {
  await pushToAgent(session.user_id, session.id, undefined, "created");
}

export async function handleSessionEnded(session: SessionJSON) {
  await pushToAgent(session.user_id, session.id, undefined, "ended");
}

export async function handleSessionRemoved(session: SessionJSON) {
  await pushToAgent(session.user_id, session.id, undefined, "removed");
}

export async function handleSessionRevoked(session: SessionJSON) {
  await pushToAgent(session.user_id, session.id, undefined, "revoked");
}

export async function handleUserUpdated(user: UserJSON) {
  await pushToAgent(user.id, undefined, {
    first_name: user.first_name,
    last_name: user.last_name,
    email_addresses: user.email_addresses,
    image_url: user.image_url,
  });
}
