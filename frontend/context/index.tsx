"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Room } from "livekit-client";

const AppContext = createContext<any>(null);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [mainState, setMainState] = useState(undefined);
  const [agentAudioTrack, setAgentAudioTrack] = useState(undefined);

  const [roomInstance, setRoomInstance] = useState<Room | null>(null);

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

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        mainState,
        setMainState,
        agentAudioTrack,
        setAgentAudioTrack,
        roomInstance,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
