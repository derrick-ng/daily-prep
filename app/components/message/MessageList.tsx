import { ListGroup } from "react-bootstrap";
import MessageItem from "./MessageItem";

interface MessageListProps {
  messages: any[];
  openMessage: (messageId: number) => void;
}

function MessageList({ messages, openMessage }: MessageListProps): any {
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
