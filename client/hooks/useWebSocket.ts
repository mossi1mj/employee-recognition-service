import { useState, useEffect, useCallback, useRef } from "react";

import { RecognitionResponse } from "@/openapi";
import { addToast } from "@heroui/react";

export const useWebSocket = (url: string) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastRecognition, setLastRecognition] =
    useState<RecognitionResponse | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    if (socketRef.current?.readyState !== WebSocket.OPEN) {
      socketRef.current = new WebSocket(url);

      socketRef.current.onopen = () => {
        setIsConnected(true);
      };

      socketRef.current.onclose = () => {
        setIsConnected(false);
      };

      socketRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setLastRecognition(message);
      };
    }
  }, [url]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connect]);

  const sendRecognition = useCallback(
    (recognition: RecognitionResponse) => {
      if (socketRef.current && isConnected) {
        socketRef.current.send(JSON.stringify(recognition));
      }
    },
    [isConnected]
  );

  return { isConnected, lastRecognition, sendRecognition, disconnect };
};
