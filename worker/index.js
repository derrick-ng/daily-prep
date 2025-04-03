// import axios from "axios";
// import { getSession } from "@/lib/session";

self.addEventListener("install", (event) => {
    console.log("installed");
  });
  
  self.addEventListener("activate", (event) => {
    console.log("activated");
  });
  
  self.addEventListener("push", async (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title;
    const options = {
      body: data.body,
      data: data,
    };
    self.registration
      .showNotification(title, options)
      .then(() => {
        console.log("notif displayed");
      })
      .catch((err) => {
        console.error(err);
      });
  
    try {
      event.waitUntil(self.registration.showNotification(title, options));
    } catch (error) {
      console.error(error);
    }
  });
  
  // self.addEventListener("fetch", async (event) => {
  //   // console.log("intercepted https request", event.request);
  
  //   const { url, method } = event.request;
  //   if (url === "http://localhost:3000/api/email") {
  //     event.respondWith(
  //       (async () => {
  //         try {
  //           const response = await fetch(`/api/form?userId=28`);
  //           const data = await response.json();
  //           console.log(data);
  //         } catch (error) {
  //           return new Response("Internal Server Error", { status: 500 });
  //         }
  //       })()
  //     );
  //   }
  //   //my logic
  //   //if event is a post request with a specific url,
  //   //send push notification to user
  // });
  
  // self.addEventListener("message", (event) => {
  //   console.log("message");
  // });
  