import { useCallback, useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SERVER_URI, TOKEN, USER_INFO} from "../constants";
import { CreateMessageParams, Message, UserInfo } from "../types";
import { storage } from "../utils";

let socket: Socket;

export const useChat = () => {
  const userInfo = storage.get<UserInfo>(USER_INFO) as UserInfo;
  const accessToken = storage.get<UserInfo>(TOKEN)
  
  if (!socket) {
    socket = io(SERVER_URI, {
      query: {
        username: userInfo.username
      },
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  const [messages, setMessages] = useState<Message[]>();
  const [log, setLog] = useState<string>();

  useEffect(() => {
    socket.on("log", (log: string) => {
      setLog(log);
    });

    socket.on("messages", (messages: Message[]) => {
      setMessages(messages);
      setTimeout(() => {
        var scroll = document.getElementById("scroll");
        scroll!.scrollTop = scroll!.scrollHeight;
      }, 50);
    });

    socket.emit("messages:get");
  }, []);

  const send = useCallback((payload: CreateMessageParams) => {
    socket.emit("message:post", payload);
  }, []);

  const chatActions = useMemo(
    () => ({
      send
    }),
    []
  );

  return { messages, log, chatActions };
};