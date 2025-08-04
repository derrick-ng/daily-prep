export interface NotificationDataProp {
  tasks?: string[];
  weather: { temp: number; tempMin: number; tempMax: number };
  traffic: { duration: number; distance: number };
}
