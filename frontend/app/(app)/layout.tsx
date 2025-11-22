import React from "react";
import LiveKitUIProvider from "@/components/modals/LiveKItUIProvider";

const AgentLayout = ({ children }: { children: React.ReactNode }) => {
  return <LiveKitUIProvider>{children}</LiveKitUIProvider>;
};

export default AgentLayout;
