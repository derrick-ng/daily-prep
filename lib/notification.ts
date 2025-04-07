// import prisma from "./prismaClient";

export function bufferToBase64(buffer: ArrayBuffer | null) {
  if (!buffer) return null;
  const bytes = new Uint8Array(buffer);
  return btoa(String.fromCharCode(...bytes));
}

export function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// async function getPushSubscription(endpoint: string) {
//   try {
//     const response = await prisma.pushSubscription.findUnique({
//       where: {
//         endpoint,
//       },
//     });
//     return response;
//   } catch (error) {}
// }

// export async function registerPushSubscription() {
//   try {
//     if (!("serviceWorker" in navigator)) {
//       console.error("service workers not supported in this browser");
//     }

//     const registration = await navigator.serviceWorker.register("/sw.js", {
//       scope: "/",
//     });

//     await navigator.serviceWorker.ready;

//     const subscription = await registration.pushManager.getSubscription();

//     if (!subscription) {
//       //check if in db
//       //yes registered = true
//       // no post
//     }

//     //if endpoint in there, registered = true
//     //if not in there, post request, registered = true

//     const pushSubscription = await registration.pushManager.subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: process.env.VAPID_PUBLIC_KEY,
//     });

//     const endpoint = pushSubscription.endpoint;
//     const p256dh = bufferToBase64(pushSubscription.getKey("p256dh"));
//     const auth = bufferToBase64(pushSubscription.getKey("auth"));
//   } catch (error) {
//     console.error();
//   }
// }

// //this function should not be possible to hit unless a user already has push subscription info in db
// export async function unregisterPushSubscription() {
//   //add registered boolean value to pushSubscription
//   //can use this value to display noti bell on or off
//   //can also use this to find who to send the mass notis to
// }
