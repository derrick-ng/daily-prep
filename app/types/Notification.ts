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
}
