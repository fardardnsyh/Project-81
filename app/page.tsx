"use client";

import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Nav from "@/app/components/Nav";

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSearch = () => {
    if (isValidUrl(inputValue)) {
      setLoading(true);
      router.push(`/${inputValue}`);
    } else {
      alert("Please enter a valid URL starting with http:// or https://");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <>
      <Nav position="top">
        <main className="flex h-[88vh] flex-col items-center justify-between p-6 md:p-12 lg:p-24">
          <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm flex flex-col">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4 mt-10 sm:mt-0 bg-gradient-to-r from-blue-500 to-blue-600 text-transparent bg-clip-text">
                Chat with Any Website
              </h1>
              <p className="text-lg max-w-2xl">
                This AI chatbot interacts with web content to provide
                context-aware conversations.
              </p>
            </div>
            <div className="relative w-full max-w-md mb-8">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a URL..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <button
                onClick={handleSearch}
                className="absolute right-0 top-0 mt-3 mr-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 transition-colors duration-200 ease-in-out disabled:cursor-not-allowed"
                disabled={loading}
                aria-label={loading ? "Loading" : "Start chat"}
              >
                {loading ? "Loading..." : "Chat"}
              </button>
            </div>
          </div>

          <div className="mb-16 grid w-full max-w-5xl text-center lg:mb-0 lg:grid-cols-2 lg:text-left gap-6">
            <a
              href="https://github.com/itssodope01/Web-GPT"
              className="group rounded-lg border sm:border-transparent p-5 transition-colors border-neutral-700 hover:border-gray-300  bg-neutral-800/30 sm:bg-transparent hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="mb-3 text-2xl font-semibold">
                Github{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className="m-0 text-sm opacity-50">
                Explore the GitHub repository for this project
              </p>
            </a>
            <div className="flex flex-col md:items-end items-center justify-center lg:justify-end">
              <a
                className="flex items-center gap-2 p-4 lg:p-0"
                href="https://github.com/itssodope01"
                target="_blank"
                rel="noopener noreferrer"
              >
                By{" "}
                <Image
                  src="/itssodope01.png"
                  alt="GitHub itssodope01 Logo"
                  width={140}
                  height={40}
                  priority
                />
              </a>
            </div>
          </div>
        </main>
      </Nav>
    </>
  );
}
