import db, { ActorWhereInput, FindManyActorArgs } from "db"

type GetActorsInput = Pick<FindManyActorArgs, "where" | "orderBy" | "skip" | "take"> & {
  search?: string
}

export default async function getActorsFromSearch({
  orderBy,
  skip = 0,
  take,
  search,
}: GetActorsInput) {
  // @ts-ignore
  let where: ActorWhereInput = {}

  if (search) {
    where = {
      name: { contains: search },
    }
  }

  const actors = await db.actor.findMany({
    where: {},
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
