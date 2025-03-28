export interface SessionData {
    user: {
      username: string;
      userId: string;
    };
    expires: string | number | Date;
  }