self.addEventListener("install", (event) => {
  console.log("installed");
});

self.addEventListener("activate", (event) => {
  console.log("activated");
});

self.addEventListener("push", async (event) => {
  const payload = event.data ? event.data.json() : {};

  const { weather, traffic, tasks } = payload.data;
  const tasksFormatted = tasks.taskList.join("\n");

  const title = payload.title;
  const message = `Weather: ${weather.temp}°F, ${weather.tempMin}-${weather.tempMax}°F\nTraffic: ${traffic.duration} mins to travel ${traffic.distance} miles\nTasks for the day:\n${tasksFormatted}`;

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

  const date = `${year}/${month}/${day}`;

  // set a 1 second delay before sending the message to allow time for summary page to be ready to receive data
  clients.openWindow(`http://localhost:3000/summary/${date}`).then((windowClient) => {
    setTimeout(() => {
      windowClient?.postMessage(data);
    }, 2500);
  });
});
