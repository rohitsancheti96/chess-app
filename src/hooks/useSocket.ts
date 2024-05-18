import { useEffect, useState } from "react";

const WS_URL = "ws://localhost:8080";

export const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>();

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    ws.onopen = () => {
      console.log("Connected to socket");
      setSocket(ws);
    };
    ws.onclose = () => {
      console.log("Disconnected from socket");
      setSocket(null);
    };
    return () => {
      ws.close();
    };
  }, []);

  return socket;
};
