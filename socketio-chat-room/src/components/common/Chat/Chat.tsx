import { MessageState } from "@types";
import React, { useEffect, useState } from "react";
import { Button, Input } from "src/components/ui";
import { useUser } from "src/hooks/use-user";
import { useSocket } from "../../../hooks/use-socket";
import { Message } from "../Message/Message";
import styles from "./Chat.module.scss";

interface ChatProps {}

export const Chat = ({}: ChatProps) => {
  const { socket } = useSocket();
  const { user } = useUser();
  const [form, setForm] = useState({ content: "" });
  const [messages, setMessages] = useState<MessageState[]>([]);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => setMessages(data));
    }
  }, [socket]);

  const postMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (socket && user) {
      let data: Partial<MessageState> = {
        user,
        content: form.content,
      };
      socket.emit("message", data);
      setForm({ content: "" });
    } else {
      setError("Please sign in!");
    }
  };
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
      </div>
      {error && <div>{error}</div>}
      <form onSubmit={postMessage}>
        <Input
          placeholder="Say something..."
          id="content"
          name="content"
          type="text"
          minLength={1}
          maxLength={200}
          value={form.content}
          onChange={(event) =>
            setForm((currentForm) => ({
              ...currentForm,
              content: event.target.value,
            }))
          }
        />
        <Button label="Chat" type="submit" />
      </form>
    </div>
  );
};

export default Chat;
