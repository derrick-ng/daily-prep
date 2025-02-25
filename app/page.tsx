import Form from "./components/Form";
import { getSession, logout } from "@/lib/session";

export default async function Home() {
  const session = await getSession();

  return (
    <div>
      {session && (
        <div>
          <p>
            user: {session?.[0].user.username}, id: {session?.[0].user.userId}
          </p>
        </div>
      )}

      <div>
        <Form />
      </div>
    </div>
  );
}
