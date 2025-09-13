export interface NotificationDataProp {
  tasks: {
    taskList: string[];
  };

  weather: {
    temp: number;
    tempMin: number;
    tempMax: number;
    cityName: string;
  };

  traffic: {
    duration: number;
    distance: number;
    origin: string;
    destination: string;
    mode: string;
  };

  emails: {
    id: string;
    subject: string;
    sender: string;
    date: string;
  }[];
}
