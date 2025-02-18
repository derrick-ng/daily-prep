import Link from "next/link";
import Form from "./components/Form";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="./auth/register">
        <button>register</button>
      </Link>
      <div>
        <Form />
      </div>
    </div>
  );
}
