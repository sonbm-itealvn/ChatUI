"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Chat } from "@/components/chat";
import type { Message } from "@/lib/types";
import { callChatAPI } from "@/lib/api";
import federationLogo from "../z7222553644201_dace0d0bb2b939170037ceb44c7c06cc.jpg";
import unionLogo from "../logo lien chi.png";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await callChatAPI("", "");
      setConversationId(data.conversation_id);
      if (Array.isArray(data.messages)) {
        setMessages(
          data.messages.map((m: any) => ({
            id: Date.now().toString() + Math.random().toString(),
            content: m.content,
            role: "assistant",
            agent: m.agent,
            timestamp: new Date(),
          }))
        );
      }
    })();
  }, []);

  const handleSendMessage = async (content: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const data = await callChatAPI(content, conversationId ?? "");

    if (!conversationId) setConversationId(data.conversation_id);

    if (data.messages) {
      const responses: Message[] = data.messages.map((m: any) => ({
        id: Date.now().toString() + Math.random().toString(),
        content: m.content,
        role: "assistant",
        agent: m.agent,
        timestamp: new Date(),
      }));
      setMessages((prev) => [...prev, ...responses]);
    }

    setIsLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 via-white to-blue-50">
      <header className="w-full border-b border-blue-100 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="flex flex-1 items-center justify-center gap-6">
            <Image
              src={federationLogo}
              alt="Logo cơ quan 1"
              className="h-16 w-auto rounded-lg object-contain shadow-sm"
              priority
            />
            <Image
              src={unionLogo}
              alt="Logo Liên chi"
              className="h-16 w-auto rounded-lg object-contain shadow-sm"
              priority
            />
          </div>
          <div className="flex flex-col gap-1 text-slate-700">
            <p className="text-lg font-semibold">
              Nền tảng hỗ trợ người lao động
            </p>
            <p className="text-sm text-slate-500">
              Kết nối nhanh chóng với Tổng liên đoàn lao động Việt Nam
            </p>
          </div>
        </div>
      </header>

      <section className="flex flex-1 items-center justify-center px-4 pb-10 pt-6">
        <div className="w-full max-w-4xl">
          <div className="flex min-h-[70vh]">
            <Chat
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>

      <footer className="w-full border-t border-blue-100 bg-white/80 py-6 text-center text-base font-semibold text-slate-700">
        Tổng liên đoàn lao động Việt Nam
      </footer>
    </main>
  );
}
