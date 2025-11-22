"use client";

import { useState, useRef, useEffect } from "react";
import LiveKitModal from "./LiveKitModal";

export default function LiveKitUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 30, y: 80 });
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // Draggable bubble handlers
  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    const rect = bubbleRef.current!.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const onMouseUp = () => {
    dragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <>
      {children}

      {/* Draggable bubble */}
      <div
        ref={bubbleRef}
        className="fixed z-[9998] w-16 h-16 bg-blue-600 shadow-xl rounded-full cursor-pointer flex items-center justify-center text-white"
        style={{
          left: position.x,
          top: position.y,
        }}
        onMouseDown={onMouseDown}
        onClick={() => {
          if (!dragging.current) setOpen(true);
        }}
      >
        🎤
      </div>

      {/* LiveKit Modal */}
      {open && <LiveKitModal onClose={() => setOpen(false)} />}
    </>
  );
}
