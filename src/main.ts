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

async function main() {
  server.register(fastifyRedis, {
    port: 8081,
  });
  server.register(filmRoutes, { prefix: "film" });

  try {
    server.listen({ port: Number(process.env.PORT), host: "0.0.0.0" });
    console.log(`Server is up on port ${process.env.PORT}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
main();
