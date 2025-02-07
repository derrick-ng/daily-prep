import { ListGroupItem } from "react-bootstrap";

interface MessageItemProps {
  message: any;
  openMessage: () => void;
}

function MessageItem({ message, openMessage }: MessageItemProps): any {
  const subject = message.payload.headers.find((header: { name: string }) => header.name === "Subject")?.value || "No Subject Found";
  const from = message.payload.headers.find((header: { name: string }) => header.name === "From")?.value || "No Recipient Found";
  const date = message.payload.headers.find((header: { name: string }) => header.name === "Date")?.value || "No Date Found";

  return (
    <div>
      <ListGroupItem>
        <strong>Message:</strong>
        <p>{subject}</p>
        <p>{from}</p>
        <p>{date}</p>
        <br />
      </ListGroupItem>
    </div>
  );
}

export default MessageItem;
