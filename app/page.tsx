import Link from "next/link";
import Form from "./components/Form";
import { getSession, logout } from "@/lib/session";

export default async function Home() {
  const session = await getSession()
  return (
    <div>
      <h1>Home Page</h1>
      {session && (
        <div>
          <p>{session.user} is logged in</p>
          <button onClick={logout}>logout</button>
        </div>
      )}
      <Link href="./auth/register">
        <button>register</button>
      </Link>
      <div>
        <Form />
      </div>
    </div>
  );
}
