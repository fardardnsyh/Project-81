"use client";

import React from "react";
import { useState } from "react";
import { CheckCircle, Copy } from "lucide-react";

interface CopyButtonProps {
  content: string;
}

const CopyButton = ({ content }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(content);
    setTimeout(() => {
      setIsCopied(false);
    }, 900);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1 rounded bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      {isCopied ? (
        <CheckCircle className="w-4 h-4 text-[#3b83f3]" />
      ) : (
        <Copy className="w-4 h-4 text-gray-300" />
      )}
    </button>
  );
};

export default CopyButton;
