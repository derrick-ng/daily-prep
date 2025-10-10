import Image from "next/image";

export default function Welcome() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-2 mt-10">Daily Prep is a tool that helps users get ready faster by automating their morning routine</div>
      <div className="text-center mb-8">
        It delivers a daily notification with real time weather data, traffic updates, unread emails, and personal notes
      </div>

      <div className="mb-6 w-full max-w-2xl text-center">
        <div className="font-semibold mb-2">Sample Summary</div>
        <div className="justify-center bg-white p-2 shadow-md rounded">
          <Image className="" src="/images/DailyPrepSummary1.png" alt="Image not loading" width={700} height={400} />
        </div>
      </div>

      <div className="mb-6 w-full max-w-md text-center">
        <div className="font-semibold mb-2">Sample Notification</div>
        <div className="bg-white p-2 shadow-md rounded">
          <Image className="mx-auto" src="/images/DailyPrepNoti1.png" alt="Image not Loading" width={400} height={250} />
        </div>
      </div>
    </div>
  );
}
