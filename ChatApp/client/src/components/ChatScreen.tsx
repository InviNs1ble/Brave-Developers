import React, { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import TimeAgo from "react-timeago";
import { Slide, toast, ToastContainer } from "react-toastify";
import { USER_INFO } from "../constants";
import { useChat } from "../hooks/useChat";
import { UserInfo } from "../types";
import { storage } from "../utils";

const notify = (message: string) =>
  toast.info(message, {
    position: "top-left",
    autoClose: 1000,
    hideProgressBar: true,
    transition: Slide
  });

export const ChatScreen = () => {
    const userInfo = storage.get<UserInfo>(USER_INFO) as UserInfo;
    const { id } = userInfo;
    const { messages, log, chatActions } = useChat();
    const [text, setText] = useState("");

    const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmed = text.trim();
        if (!trimmed) return;

        const message = {
            authorId: id,
            text
        };

        chatActions.send(message);

        setText("");
    };

    useEffect(() => {
        if (!log) return;

        notify(log);
    }, [log]);

    return (
    <>
        <h1 className="title">Чат</h1>
        <div id="scroll" className="overflow-y-auto flex-1 flex flex-col">
            {messages &&
                messages.length > 0 &&
                messages.map((message) => {
                const isMsgBelongsToUser = message.author.id === userInfo.id;

                return (
                    <div
                        key={message.id}
                        className={[
                            "my-2 p-2 rounded-md text-white w-1/2 bg-blue-500",
                            isMsgBelongsToUser
                              ? "self-end"
                              : "self-start"
                          ].join(" ")}
                    >
                        <div className="flex justify-between text-sm mb-1">
                            <span>{isMsgBelongsToUser ? 'вы' : message.author.username}</span>
                            <TimeAgo date={message.createdAt} />
                        </div>
                        <p>{message.text}</p>
                    </div>
                );
            })}
        </div>
        <form onSubmit={sendMessage} className="flex items-stretch sticky bottom-0 left-0 right-0">
            <div className="flex-1 flex">
                <input
                    type="text"
                    id="message"
                    name="message"
                    value={text}
                    onChange={changeText}
                    autoFocus
                    required
                    autoComplete="off"
                    className="input flex-1"
                />
            </div>
            <button className="btn-primary">
                <FiSend fontSize={18} />
            </button>
        </form>
        <ToastContainer />
        </>
    );
};