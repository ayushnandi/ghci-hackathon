interface AgentUserMetadata {
  clerkId: string;
  sessionToken?: string;
  basicInfo?: {
    firstName?: string;
    lastName?: string;
    emailAddresses?: any[];
    imageUrl?: string;
  };
  emotionalState?: {
    mood?: string;
    stressLevel?: number;
    engagement?: number;
  };
  voiceBiometrics?: {
    voicePrintHash?: string;
    pitch?: number;
    tempo?: number;
  };
  status?: string;
}

const userSessions = new Map<string, AgentUserMetadata>();

function updateAgentSession(update: Partial<AgentUserMetadata> & { clerkId: string }) {
  const existing = userSessions.get(update.clerkId) || {};
  userSessions.set(update.clerkId, { ...existing, ...update });
}
