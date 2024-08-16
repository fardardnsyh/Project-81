"use client";

import { Message, useChat } from "ai/react";
import Messages from "./Messages";
import ChatInput from "./ChatInput";
const ChatWrapper = ({
  sessionID,
  initialMessages,
  decodedUrl,
  navPosition,
}: {
  sessionID: string | undefined;
  initialMessages: Message[];
  decodedUrl: string;
  navPosition: "top" | "left";
}) => {
  const { messages, handleInputChange, handleSubmit, input, setInput } =
    useChat({
      api: "/api/chat-stream",
      body: { sessionID },
      initialMessages,
    });

  return (
    <div className="relative min-h-screen bg-zinc-900 flex divide-y flex-col justify-between gap-2">
      <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
        <Messages messages={messages} decodedUrl={decodedUrl} />
      </div>
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        setInput={setInput}
        navPosition={navPosition}
      />
    </div>
  );
};

export default ChatWrapper;
