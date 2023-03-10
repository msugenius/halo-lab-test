import fastify from "fastify";
import fastifyRedis from "@fastify/redis";
import "dotenv/config";
import filmRoutes from "./modules/film/film.router";
import AppStore from "./modules/utils/app.store";

const server = fastify();
export const AppStoreInstance = new AppStore<object>();

server.get("/healthcheck", async () => {
  return { status: "OK" };
});

server.register(fastifyRedis, {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
});
server.register(filmRoutes, { prefix: "film" });

async function main() {
  try {
    server.listen({ port: Number(process.env.PORT), host: "0.0.0.0" });
    console.log(`Server is up on port ${process.env.PORT}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
main();
