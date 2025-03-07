import Form from "./components/Form";
import { getSession } from "@/lib/session";
import ToDoArea from "./components/todo/ToDoArea";
import SampleButton from "./components/sample/SampleButton";

interface SessionData {
  user: {
    username: string;
    userId: string;
  };
  expires: string | number | Date;
}


export default async function Home() {
  // const session = await getSession();
  const session = await getSession() as SessionData[] | undefined;
  const username = session ? session[0].user.username : null
  const userId = session ? session[0].user.userId : null

  return (
    <div>
      {session && (
        <div>
          <p>
            user: {username}, id: {userId}
          </p>
        </div>
      )}

      <div>
        <Form userId={userId}/>
      </div>
      <div>
        <ToDoArea userId={userId ? Number(userId) : null} />
      </div>
      <div>
        <SampleButton userId={userId ? Number(userId) : null}/>
      </div>
    </div>
  );
}
