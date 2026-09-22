"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

import { ChevronRight } from "lucide-react";

interface HorizontalCarouselProps {
  children: ReactNode;
  scrollAmount?: number;
  className?: string;
}

export function HorizontalCarousel({ children, scrollAmount = 280, className = "" }: HorizontalCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollNext() {
    scrollRef.current?.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className={`flex gap-4 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
      >
        {children}
      </div>

      <button
        type="button"
        onClick={scrollNext}
        aria-label="Show more"
        className="absolute top-1/2 right-[-17px] z-20 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full border border-[#dedcff] bg-white text-[#271fbd] shadow-[0_4px_14px_rgba(30,20,120,0.10)] transition hover:bg-[#f6f5ff]"
      >
        <ChevronRight size={21} strokeWidth={2.5} />
      </button>
    </div>
  );
}
