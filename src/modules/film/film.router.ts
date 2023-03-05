import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyRedis } from "@fastify/redis";
import { findByTitle } from "./film.service";
import AppStore from "../utils/app.store";
import { refreshRedis } from "../utils/cache.util";
import { RedisRefreshDto } from "../dto/redis.refresh.dto";
import { AppStoreInstance } from "../../main";

async function filmRoutes(server: FastifyInstance) {
  server.get("/:title", async (req: any, res: FastifyReply) => {
    const { redis } = server;
    const title = req.params.title;
    const appCachedData = AppStoreInstance.get(title);
    let film;

    if (appCachedData) {
      res.header("from-app-cache", true);
      film = appCachedData;
    } else if ((await redis.exists(title)) == 1) {
      res.header("from-redis", true);
      film = await redis.get(title);

      if (film != null) {
        film = JSON.parse(film);
      } else {
        film = { Error: "There isn`t enough info about this film in our DB." };
      }
    } else {
      res.header("from-db", true);
      film = await findByTitle(title);
    }

    await refresher(redis, AppStoreInstance, {
      key: title,
      expire: 30,
      value: film,
    });
    return film;
  });
}

async function refresher(
  redis: FastifyRedis,
  store: AppStore<object>,
  args: RedisRefreshDto
) {
  const { key, value } = args;
  refreshRedis(redis, {
    key,
    expire: 30,
    value,
  });
  store.refresh(key, value);
}

export default filmRoutes;
