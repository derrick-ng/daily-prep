import Form from "./components/Form";
import { getSession } from "@/lib/session";
import ToDoArea from "./components/todo/ToDoArea";

interface SessionData {
  user: {
    username: string;
    userId: string;
  };
  expires: string | number | Date;
}

export default async function Home() {
  // const session = await getSession();
  const session = (await getSession()) as SessionData[] | undefined;
  const username = session ? session[0].user.username : null;
  const userId = session ? session[0].user.userId : null;

  return (
    <div className="max-w-5xl mx-auto p-4">
      {session && (
        <div className="mb-4">
          <p>
            user: {username}, id: {userId}
          </p>
        </div>
      )}

      <div className="flex gap-8 border border-black">
        <div className="w-1/2 p-2">
          <Form userId={userId} />
        </div>
        <div className="w-1/2 p-2">
          <strong>Task List:</strong>
          <ToDoArea userId={userId ? Number(userId) : null} />
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}
