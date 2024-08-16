"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Coffee, Plus } from "lucide-react";

interface NavProps {
  position: "top" | "left";
  children: React.ReactNode;
}

const Nav = ({ position = "top", children }: NavProps) => {
  const [scrollingUp, setScrollingUp] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const isTopStyle = isMobile || position === "top";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isTopStyle) {
      const messagesContainer = document.getElementById("messages-container");

      const handleScroll = () => {
        if (messagesContainer) {
          const currentScrollTop = messagesContainer.scrollTop;

          if (currentScrollTop > lastScrollTop) {
            setScrollingUp(true);
          } else if (currentScrollTop < lastScrollTop) {
            setScrollingUp(false);
          }

          setLastScrollTop(currentScrollTop);
        }
      };

      messagesContainer?.addEventListener("scroll", handleScroll);

      return () =>
        messagesContainer?.removeEventListener("scroll", handleScroll);
    }
  }, [isTopStyle, lastScrollTop]);

  const PlusButton = () => (
    <Link
      className="flex items-center justify-center p-2 rounded-full bg-zinc-800 hover:bg-zinc-700"
      href="/"
      aria-label="Add"
    >
      <Plus size={20} className="text-zinc-200" />
    </Link>
  );

  return (
    <div className={`flex ${isTopStyle ? "flex-col" : "flex-row"}`}>
      <header
        className={`sticky ${
          isTopStyle ? "top-0 z-50 w-full" : "left-0 h-screen"
        } bg-background transition-all duration-300 ${
          isTopStyle ? (scrollingUp ? "py-0 px-2" : "py-2 px-2") : "py-4 px-4"
        }`}
      >
        <nav
          className={`${
            isTopStyle
              ? "mx-auto flex items-center justify-between transition-all duration-300 md:w-2/3"
              : "flex flex-col items-start justify-between transition-all duration-300 h-full"
          } ${scrollingUp && isTopStyle ? "py-2 px-4" : "py-4 px-4"}`}
        >
          <div className="flex items-center gap-20 justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 transition-colors hover:text-zinc-300"
              rel="noopener noreferrer"
            >
              <Image
                src="/web-gpt.png"
                alt="Web-GPT Logo"
                width={scrollingUp && isTopStyle ? 30 : 40}
                height={scrollingUp && isTopStyle ? 30 : 40}
                className="rounded-md transition-all duration-300"
                priority
              />
              <span
                className={`text-sm font-medium sm:text-lg transition-all duration-300 hidden sm:block`}
              >
                Web-GPT
              </span>
            </Link>
            <div>{!isTopStyle && <PlusButton />}</div>
          </div>
          <div className="flex items-center space-x-2">
            {isTopStyle && <PlusButton />}
            <Link
              href="https://buymeacoffee.com/pritamchk"
              className={`flex items-center gap-2 rounded-full bg-zinc-800 px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-zinc-700 ${
                scrollingUp && isTopStyle ? "px-2 py-2" : "px-4 py-2"
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Coffee size={18} />
              <span
                className={`transition-all duration-300 ${
                  scrollingUp && isTopStyle ? "hidden w-0 opacity-0" : "block"
                }`}
              >
                Donate
              </span>
            </Link>
          </div>
        </nav>
      </header>
      <div className={`flex-1 ${!isTopStyle ? "ml-[20px]" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default Nav;
