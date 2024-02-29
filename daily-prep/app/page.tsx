import TaskList from "./components/TaskList";
import AdditionalFeatures from "./components/AdditionalFeatures";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import HomePage from "./components/HomePage";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div>
      <div>
        {session?.user ? (
          <div className="flex">
            <AdditionalFeatures />
            <TaskList />
          </div>
        ) : (
          <HomePage />
        )}
      </div>
    </div>
  );
}
