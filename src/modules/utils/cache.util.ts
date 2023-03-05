import { FastifyRedis } from "@fastify/redis";
import { RedisRefreshDto } from "../dto/redis.refresh.dto";

export async function refreshRedis(
  redis: FastifyRedis,
  dto: RedisRefreshDto
): Promise<number> {
  try {
    if ((await redis.exists(dto.key)) == 1) {
      redis.del(dto.key);
    }

    redis.setex(dto.key, dto.expire, JSON.stringify(dto.value));
    return 0;
  } catch (error) {
    console.error(error);
    return 1;
  }
}
