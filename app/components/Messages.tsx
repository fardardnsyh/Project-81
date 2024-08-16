import React from "react";
import { type Message as TMessage } from "ai/react";
import Message from "./Message";
import { MessageSquare } from "lucide-react";

interface MessagesProps {
  messages: TMessage[];
  decodedUrl: string;
}

const Messages = ({ messages, decodedUrl }: MessagesProps) => {
  const formattedUrl =
    decodedUrl.startsWith("https:/") && !decodedUrl.startsWith("https://")
      ? `https://${decodedUrl.slice(7)}`
      : decodedUrl;

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div
      className="flex max-h-[calc(100vh-3.5rem-5rem)] flex-1 flex-col overflow-auto sm:mt-10 mt-1"
      id="messages-container"
    >
      {messages.length ? (
        messages.map((message, i) => (
          <Message
            key={i}
            content={message.content}
            isUserMessage={message.role === "user"}
          />
        ))
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <MessageSquare className="w-12 h-12 text-blue-500" />
          <h3 className="font-semibold text-xl text-white">You're all set!</h3>
          <div className="text-zinc-400 text-center">
            <p className="text-lg">Ask anything about</p>
            {isValidUrl(formattedUrl) ? (
              <a
                href={formattedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sm sm:text-lg text-blue-400"
              >
                {formattedUrl}
              </a>
            ) : (
              <p className="font-semibold text-sm sm:text-lg text-blue-400">
                {formattedUrl}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
