"use client";

import { useState, useRef, useEffect } from "react";
import LiveKitModal from "./LiveKitModal";
import { BarVisualizer } from "@livekit/components-react";

const MINI_WIDTH = 220;
const MINI_HEIGHT = 64;
const MARGIN = 24;

export default function LiveKitUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [dockSide, setDockSide] = useState<"left" | "right">("right");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const ref = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const moved = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // Initial default position
  useEffect(() => {
    if (typeof window === "undefined") return;
    setPosition({
      x: window.innerWidth - MINI_WIDTH - MARGIN,
      y: window.innerHeight - MINI_HEIGHT - MARGIN,
    });
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    moved.current = false;

    const rect = ref.current!.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;

    moved.current = true;

    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const onMouseUp = () => {
    if (!dragging.current) return;
    dragging.current = false;

    // CLICK → open modal
    if (!moved.current) {
      setOpen(true);
      return;
    }

    // --- SNAP ONLY BOTTOM LEFT/RIGHT ---
    const width = window.innerWidth;

    // Decide snap side by center of widget
    const snapSide: "left" | "right" =
      position.x + MINI_WIDTH / 2 < width / 2 ? "left" : "right";

    setDockSide(snapSide);

    const snappedX =
      snapSide === "right" ? width - MINI_WIDTH - MARGIN : MARGIN;

    const snappedY = window.innerHeight - MINI_HEIGHT - MARGIN;

    setPosition({
      x: snappedX,
      y: snappedY,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [position]);

  return (
    <>
      {children}

      {/* MINI FLOATING BAR */}
      {!open && (
        <div
          ref={ref}
          onMouseDown={onMouseDown}
          className="
            fixed z-[9998]
            rounded-xl border border-border
            bg-white shadow-xl
            cursor-pointer flex items-center justify-center
            transition-transform duration-150
          "
          style={{
            left: position.x,
            top: position.y,
            width: MINI_WIDTH,
            height: MINI_HEIGHT,
          }}
        >
          {/* Static BarVisualizer for idle state */}
          <BarVisualizer
            barCount={7}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}

      {/* FULL MODAL WHEN OPEN */}
      {open && (
        <LiveKitModal dockSide={dockSide} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
