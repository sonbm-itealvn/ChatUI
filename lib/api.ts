const DEFAULT_CHAT_API_BASE = "https://chatserver-3ntj.onrender.com";
const CHAT_API_BASE =
  (typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_CHAT_API_BASE
    : undefined) || DEFAULT_CHAT_API_BASE;

// Helper to call the server
export async function callChatAPI(message: string, conversationId: string) {
  try {
    const endpoint = `${CHAT_API_BASE.replace(/\/$/, "")}/chat`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversation_id: conversationId, message }),
    });
    if (!res.ok) throw new Error(`Chat API error: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error("Error sending message:", err);
    return null;
  }
}
