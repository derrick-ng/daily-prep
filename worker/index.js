self.addEventListener("install", (event) => {
  console.log("installed");
});

self.addEventListener("activate", (event) => {
  console.log("activated");
});

self.addEventListener("push", async (event) => {
  const payload = event.data ? event.data.json() : {};

  const { weather, traffic, tasks, emails } = payload.data;
  const tasksFormatted = tasks.taskList.join("\n");
  const emailList = emails.map((email) => `From: ${email.sender}\nSubject: ${email.subject}\nDate: ${email.date}\n`).join("\n");

  const title = payload.title;
  const message = `Weather: ${weather.temp}°F, ${weather.tempMin}-${weather.tempMax}°F\nTraffic: ${traffic.duration} mins to travel ${traffic.distance} miles\nUnread Emails:\n\n${emailList}\n\nTasks for the day:\n${tasksFormatted}`;

  const options = {
    body: message,
    data: payload.data,
  };

  try {
    event.waitUntil(self.registration.showNotification(title, options));
  } catch (error) {
    console.error(error);
  }
});

self.addEventListener("notificationclick", (event) => {
  const data = event.notification.data;
  event.notification.close();

  const newDate = new Date();
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  const baseUrl = self.location.origin
  const date = `${year}/${month}/${day}`;
  const url = `${baseUrl}/summary/${date}`

  // set a 1 second delay before sending the message to allow time for summary page to be ready to receive data
  clients.openWindow(url).then((windowClient) => {
    setTimeout(() => {
      windowClient?.postMessage(data);
    }, 3000);
  });
});
