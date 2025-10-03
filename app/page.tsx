import Form from "./components/Form";
import { getSession } from "@/lib/session";
import ToDoArea from "./components/todo/ToDoArea";
import SampleButton from "./components/sample/SampleButton";
import { SessionData } from "./types/Session";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";
import { redirect } from "next/navigation";

export default async function Home() {
  // const session = await getSession();
  const session = (await getSession()) as SessionData[] | undefined;
  const username = session ? session[0].user.username : null;
  const userId = session ? session[0].user.userId : null;

  if (!session) {
    redirect("/welcome");
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-4">
        <p>
          user: {username}
        </p>
        <ServiceWorkerRegister userId={userId} />
      </div>
      <div className="border border-black">
        <div className="flex gap-8">
          <div className="w-1/2 p-2">
            <Form userId={userId} />
          </div>
          <div className="w-1/2 p-2">
            <strong>Task List:</strong>
            <ToDoArea userId={userId ? Number(userId) : null} />
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <SampleButton userId={userId ? Number(userId) : null} />
        </div>
      </div>
    </div>
  );
}
