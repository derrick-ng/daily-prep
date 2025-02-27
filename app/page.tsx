import Form from "./components/Form";
import { getSession, logout } from "@/lib/session";

export default async function Home() {
  const session = await getSession();
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
    </div>
  );
}
