import React, { useEffect, useState } from "react";
import { type useChat } from "ai/react";

type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"];
type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"];
type SetInput = ReturnType<typeof useChat>["setInput"];

interface ChatInputProps {
  input: string;
  handleInputChange: HandleInputChange;
  handleSubmit: HandleSubmit;
  setInput: SetInput;
  navPosition: "top" | "left";
}

const ChatInput = ({
  handleInputChange,
  handleSubmit,
  input,
  setInput,
  navPosition,
}: ChatInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Function to handle viewport resizing
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculateRows = (text: string) => {
    const lines = text.split("\n").length;
    return Math.min(lines, 4);
  };

  const rows = calculateRows(input);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
      setInput("");
    }
  };

  // Determine if current styling should follow the "top" position
  const isTopStyle = isMobile || navPosition === "top";

  return (
    <div
      className={`fixed bottom-0 p-2 mb-5 ${
        isTopStyle ? "left-0" : "left-[365px]"
      } w-full bg-zinc-800`}
      style={{ width: isTopStyle ? "100%" : "calc(100% - 365px)" }}
    >
      <div className="mx-auto max-w-3xl">
        <form onSubmit={handleSubmit} className="relative">
          <div
            className={`flex items-center bg-[#161616] ${
              isFocused ? "ring-2 ring-gray-500" : ""
            }`}
            style={{
              borderRadius: rows > 1 ? "0.5rem" : "9999px",
              borderTop: "none",
            }}
          >
            <textarea
              rows={rows}
              onChange={handleInputChange}
              value={input}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask your question"
              className="w-full resize-none bg-transparent py-3 px-4 text-white placeholder-gray-400 focus:outline-none"
              style={{
                minHeight: "46px",
                maxHeight: "200px",
              }}
            />
            <div className="flex items-end mr-2">
              <button
                type="submit"
                className="p-2 rounded-full bg-gray-700 hover:bg-[#3b83f3] transition-colors duration-300"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M7 11L12 6L17 11M12 18V7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
