import Image from "next/image";

export default function Instructions() {
  return (
    <div className="p-6">
      <p className="text-xl text-center">How to use Daily Prep </p>

      <div className="space-y-3">
        <p>1. After registering an account, please allow notifications</p>
        <p className="ml-8">a. if you clicked "Block", you can enable notifications again here</p>
        <Image className="ml-20" src="/images/DailyPrepEnableNoti.png" alt="if no image click on icon next to url" width={300} height={200} />

        <p>2. Fill out the form with relevant info and click "Save"</p>
        <p className="ml-8">a. If an input is invalid, attempting to save will show a "Failed to Save"</p>
        <p>3. Press the "Allow Notifications" button (this can be disabled by clicking again)</p>
        <p>4. (Optional) Write down any tasks</p>
        <p>5. (Optional) Sign into gmail account</p>
        <p>6. Press the Sample button to test it out</p>
      </div>
    </div>
  );
}
