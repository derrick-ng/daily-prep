import webPush from "web-push";

const vapidPublicKey = "BMkhm6OeZ9YvaDJF6o807Ms2x8yl65cgcGJwvX5BfTQ75j_qcErzZRgyJwypKjPH9hC5iSMxf56hWQc1joUgs_Y";
const vapidPrivateKey = "I8baGRzte4DjxjHd_G73qXCY5vW_LkEm5zRRMYrbvNo";

webPush.setVapidDetails("mailto:testemail@gmail.com", vapidPublicKey, vapidPrivateKey);

const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/cGGpyZUID0w:APA91bG2Ql5O90Avv2ILVI-y7DHOZiHQKbD9Mt7j-sbZ2pllT6-gKMDQNdn5CBIM8T3_GrukrnUgGTqmTMjWcb_bdy1Rcg-oj8rWn917SItb9fiWQGcE48ourzTTKjLfvorh6_NzsRkf",
  keys: {
    p256dh: "BIno8M_U9REoDrCy0IU3U-Kf-p_NsoQ1b_R_DBRHlFKPNd8hAJHbvMlauYQH5DpSgUY7iIP0xCSR9ldKS4UNJq8",
    auth: "49TclcRucbELvqxqKWireQ",
  },
};

const payload = JSON.stringify({
  title: "Push",
  body: "Service",
});

webPush
  .sendNotification(pushSubscription, payload)
  .then(() => {
    console.log("Push sent succesffuly");
  })
  .catch((err) => console.error("push fail", err));
