export interface NotificationDataProp {
  tasks: {
    taskList: string[];
  };

  weather: {
    temp: number;
    tempMin: number;
    tempMax: number;
  };

  traffic: {
    duration: number;
    distance: number;
  };

  emails: {
    id: string;
    subject: string;
    sender: string;
    date: string;
  };
}
