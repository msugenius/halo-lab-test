export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DATABASE_URL: string;
      REDIS_PORT: number;
      REDIS_HOST: string;
    }
  }
}
