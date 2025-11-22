"use client";

import {
  ControlBar,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
  RoomContext,
  Chat,
  BarVisualizer,
} from "@livekit/components-react";
import { Room, Track } from "livekit-client";
import "@livekit/components-styles";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import LiveKitModal from "@/components/modals/LiveKitModal";

export default function RoomPage() {
  const { user } = useAppContext();
  const [token, setToken] = useState();
  // TODO: get user input for room and name
  const room = `session-${Date.now()}`;
  const name = `quickstart-user`;
  const [roomInstance, setRoomInstance] = useState<Room | undefined>(undefined);

  useEffect(() => {
    const room = new Room({
      adaptiveStream: true,
      dynacast: true,
    });
    setRoomInstance(room);

    return () => {
      console.log("Disconnecting room on unmount…");
      room.disconnect();
    };
  }, []);
  const [open, setOpen] = useState(true);

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

  if (!roomInstance) {
    return <div>Loading room instance…</div>;
  }

  if (!token) {
    return <div>Loading connection…</div>;
  }

  return (
    <RoomContext.Provider value={roomInstance}>
      <div data-lk-theme="default" style={{ height: "100dvh" }}>
        {/* <MyVideoConference /> */}
        {/* <RoomAudioRenderer />
        <ControlBar
          variation="minimal"
          controls={{
            microphone: true,
            camera: false,
            screenShare: false,
            leave: true,
          }}
        />
        <Chat />
        <BarVisualizer /> */}
        <div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => setOpen(true)}
          >
            Open Voice Assistant
          </button>

          <LiveKitModal onClose={() => setOpen(false)} />
        </div>
      </div>
    </RoomContext.Provider>
  );
}
