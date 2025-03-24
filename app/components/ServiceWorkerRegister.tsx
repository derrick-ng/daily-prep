"use client";

import { useEffect } from "react";

const ServiceWorkerRegister = () => {
  const vapidPublicKey = "BMkhm6OeZ9YvaDJF6o807Ms2x8yl65cgcGJwvX5BfTQ75j_qcErzZRgyJwypKjPH9hC5iSMxf56hWQc1joUgs_Y";
  //   const vapidPrivateKey = "I8baGRzte4DjxjHd_G73qXCY5vW_LkEm5zRRMYrbvNo";

  useEffect(() => {
    async function registerPushSubscription() {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/sw.js", {
            scope: "/",
          })
          .then((registration) => {
            return registration.pushManager.getSubscription().then((subscription) => {
              if (subscription) {
                // console.log(subscription);
                return subscription;
              }
              return registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: vapidPublicKey,
              });
            });
          })
          .then((subscription) => {
            console.log("user subscribed", subscription);
            //create new model userSubscription to save data in database
            //body: JSON.stringify(subscription)
          });
      }
    }
    registerPushSubscription();
  }, []);

  navigator.serviceWorker.oncontrollerchange = () => {
    console.log("new service worker activated");
  };

  return null;
};

export default ServiceWorkerRegister;
