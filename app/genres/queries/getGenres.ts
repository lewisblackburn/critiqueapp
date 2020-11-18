import { Ctx } from "blitz"
import db, { FindManyGenreArgs } from "db"

type GetGenresInput = Pick<FindManyGenreArgs, "where" | "orderBy" | "skip" | "take">

export default async function getGenres(
  { where, orderBy, skip = 0, take }: GetGenresInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const genres = await db.genre.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.genre.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    genres,
    nextPage,
    hasMore,
    count,
  }
}
