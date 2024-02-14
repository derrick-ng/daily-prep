import Image from "next/image";
import Header from "./components/Header";
import Link from "next/link";
import TaskList from "./components/TaskList"
import AdditionalFeatures from "./components/AdditionalFeatures";

export default function Home() {
  return (
    <div>
      <div id="main-content-container">
        <AdditionalFeatures />
        <TaskList />
      </div>
    </div>
  );
}
