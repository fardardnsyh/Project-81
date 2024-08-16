import React from "react";
import { Bot, User } from "lucide-react";
import CopyButton from "./CopyButton";

interface MessageProps {
  content: string;
  isUserMessage: boolean;
}

const Message = ({ content, isUserMessage }: MessageProps) => {
  return (
    <div className="py-2">
      <div className="max-w-4xl mx-auto px-4">
        <div
          className={`flex items-start gap-3 ${
            isUserMessage ? "justify-end" : "justify-start"
          }`}
        >
          {!isUserMessage && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
              <Bot className="w-5 h-5 text-gray-300" />
            </div>
          )}
          <div
            className={`rounded-lg px-4 py-2 max-w-[75%] ${
              isUserMessage ? "bg-gray-700" : "bg-gray-800"
            } relative group`}
          >
            <p className="text-sm text-gray-200 whitespace-pre-wrap">
              {content}
            </p>
            {!isUserMessage && <CopyButton content={content} />}
          </div>
          {isUserMessage && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-200" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
