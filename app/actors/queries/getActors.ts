import { Ctx } from "blitz"
import db, { FindManyActorArgs } from "db"

type GetActorsInput = Pick<FindManyActorArgs, "where" | "orderBy" | "skip" | "take">

export default async function getActors(
  { where, orderBy, skip = 0, take }: GetActorsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const actors = await db.actor.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.actor.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    actors,
    nextPage,
    hasMore,
    count,
  }
}
