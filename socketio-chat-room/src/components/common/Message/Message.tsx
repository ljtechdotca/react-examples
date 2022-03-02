import { MessageState } from "@types";
import styles from "./Message.module.scss";

interface MessageProps extends MessageState {}

export const Message = ({ id, user, content }: MessageProps) => {
  return (
    <div className={styles.root}>
      <span style={{ color: user.color }}>{user.name}:</span>
      <span>{content}</span>
    </div>
  );
};

export default Message;
