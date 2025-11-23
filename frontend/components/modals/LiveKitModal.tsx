"use client";

import {
  ControlBar,
  RoomAudioRenderer,
  RoomContext,
  Chat,
  BarVisualizer,
} from "@livekit/components-react";
import { Room } from "livekit-client";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context";

type LiveKitModalProps = {
  onClose: () => void;
  dockSide: "left" | "right";
};

export default function LiveKitModal({ onClose, dockSide }: LiveKitModalProps) {
  const { user } = useAppContext();
  const [token, setToken] = useState<string | undefined>();
  const roomName = `session-${Date.now()}`;
  const name = `quickstart-user`;
  const [roomInstance, setRoomInstance] = useState<Room | undefined>();

  /** Create room instance */
  useEffect(() => {
    const room = new Room({
      adaptiveStream: true,
      dynacast: true,
    });
    setRoomInstance(room);

    return () => {
      room.disconnect();
    };
  }, []);

  /** Connect to LiveKit */
  useEffect(() => {
    if (!roomInstance) return;

    let mounted = true;

    (async () => {
      try {
        const resp = await fetch(
          `/api/token?room=${roomName}&username=${name}&userData=${encodeURIComponent(
            JSON.stringify(user)
          )}`
        );
        const data = await resp.json();

        if (!mounted) return;

        if (data.token) {
          await roomInstance.connect(
            process.env.NEXT_PUBLIC_LIVEKIT_URL!,
            data.token
          );
          setToken(data.token);
        }
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      mounted = false;
      roomInstance.disconnect();
    };
  }, [roomInstance, roomName, name, user]);

  if (!roomInstance) return <div>Loading room instance…</div>;
  if (!token) return <div>Loading connection…</div>;

  const sideAlign =
    dockSide === "right"
      ? "items-end justify-end pr-6"
      : "items-end justify-start pl-6";

  return (
    <>
      {/* Backdrop (subtle) */}

      {/* Modal container anchored to bottom on chosen side */}
      <div
        className={`fixed inset-0 z-[9999] flex ${sideAlign} pb-6 pointer-events-none`}
      >
        <div
          className="
            pointer-events-auto
            w-[28rem] h-[42rem]
            rounded-2xl border border-border
            bg-white
            shadow-2xl 
            p-4 
            flex flex-col 
            relative
            transform
            origin-bottom
            transition-transform transition-opacity
            duration-200
            ease-out
            animate-[fadeIn_0.2s_ease-out]
            lk-modal
          "
          data-lk-theme="custom"
        >
          {/* Close / minimize Button */}
          <button
            onClick={onClose}
            className="
              absolute top-3 right-3 
              px-2 py-1 
              rounded-md 
              text-xs
              text-gray-500 hover:text-gray-700
              hover:bg-gray-100
            "
          >
            ✕
          </button>

          <RoomContext.Provider value={roomInstance}>
            <RoomAudioRenderer />

            {/* Visualizer */}
            <div className="pb-3 border-b border-gray-200 flex items-center justify-center">
              <BarVisualizer
                barCount={7}
                style={{
                  height: "3.5rem",
                  width: "100%",
                }}
              />
            </div>

            {/* Chat Window */}
            <div className="flex flex-col flex-1 overflow-hidden pt-4">
              <div className="flex-1 overflow-hidden flex justify-center">
                <Chat
                  style={{
                    width: "24rem",
                  }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="pt-3">
              <ControlBar
                variation="minimal"
                data-lk-theme="control"
                controls={{
                  microphone: true,
                  camera: false,
                  screenShare: false,
                  leave: true,
                }}
              />
            </div>
          </RoomContext.Provider>
        </div>
      </div>
    </>
  );
}
