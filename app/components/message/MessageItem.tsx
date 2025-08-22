import { JSX } from "react";
import { ListGroupItem } from "react-bootstrap";

interface MessageItemProps {
  message: {
    id: string;
    subject: string;
    sender: string;
    date: string;
  };
  openMessage: (messageId: string) => void;
}

function MessageItem({ message, openMessage }: MessageItemProps): JSX.Element {
  // const subject = message.payload.headers.find((header: { name: string }) => header.name === "Subject")?.value || "No Subject Found";
  // const from = message.payload.headers.find((header: { name: string }) => header.name === "From")?.value || "No Recipient Found";
  // const date = message.payload.headers.find((header: { name: string }) => header.name === "Date")?.value || "No Date Found";

  return (
    <div>
      <ListGroupItem>
        <p>{message.subject}</p>
        <p>{message.sender}</p>
        <p>{message.date}</p>
        <button onClick={() => openMessage(message.id)}>Open Email</button>
      </ListGroupItem>
      <br />
    </div>
  );
}

export default MessageItem;
