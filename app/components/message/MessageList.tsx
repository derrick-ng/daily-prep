import { ListGroup } from "react-bootstrap";
import MessageItem from "./MessageItem";
import { JSX } from "react";

interface MessageListProps {
  messages: {
    id: number;
    payload: {
      headers: { name: string; value: string }[];
    };
    [key: string]: unknown;
  }[];
  openMessage: (messageId: number) => void;
}

function MessageList({ messages, openMessage }: MessageListProps): JSX.Element {
  return (
    <div>
      <p>messages list:</p>
      <ListGroup>
        {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              openMessage={openMessage}
            />
        ))}
      </ListGroup>
    </div>
  );
}

export default MessageList;
