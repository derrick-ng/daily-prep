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

self.addEventListener("notificationclick", (event) => {
  // event.preventDefault();
  // window.open("http://localhost:3000/", "_blank");
  event.notification.close();

  const newDate = new Date();
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  const date = `${year}/${month}/${day}`;

  // clients.openWindow(`http://localhost:3000/summary/${date}`);
  clients.openWindow(`http://localhost:3000/summary`);
});
