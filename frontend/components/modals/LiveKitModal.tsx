"use client";

import {
  ControlBar,
  RoomAudioRenderer,
  RoomContext,
  Chat,
  BarVisualizer,
} from "@livekit/components-react";
import { Room } from "livekit-client";
import "@livekit/components-styles";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context";

export default function LiveKitModal({ onClose }: { onClose: () => void }) {
  const { user } = useAppContext();
  const [token, setToken] = useState();
  const room = `session-${Date.now()}`;
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
          `/api/token?room=${room}&username=${name}&userData=${encodeURIComponent(
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
  }, [roomInstance]);

  if (!roomInstance) return <div>Loading room instance…</div>;
  if (!token) return <div>Loading connection…</div>;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]" />

      {/* Modal container */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        <div
          className="
            w-[28rem] h-[38rem]
            bg-[#0f0f0f] 
            border border-white/10 
            rounded-2xl 
            shadow-2xl 
            p-4 
            flex flex-col 
            relative
            animate-[fadeIn_0.3s_ease]
          "
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="
              absolute top-3 right-3 
              px-3 py-1 
              rounded-lg 
              bg-white/10 hover:bg-white/20 
              text-sm
            "
          >
            ✕
          </button>

          <RoomContext.Provider value={roomInstance}>
            <RoomAudioRenderer />

            {/* Visualizer */}
            <div className="mb-3">
              <BarVisualizer />
            </div>

            {/* Chat Window */}
            <div className="flex-1 border border-white/10 rounded-lg overflow-hidden mb-3">
              <Chat />
            </div>

            {/* Controls */}
            <ControlBar
              variation="minimal"
              controls={{
                microphone: true,
                camera: false,
                screenShare: false,
                leave: true,
              }}
            />
          </RoomContext.Provider>
        </div>
      </div>
    </>
  );
}
