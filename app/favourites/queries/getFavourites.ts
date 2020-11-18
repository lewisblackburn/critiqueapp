import { Ctx } from "blitz"
import db, { FindManyFavouriteArgs } from "db"

type GetFavouritesInput = Pick<FindManyFavouriteArgs, "where" | "orderBy" | "skip" | "take">

export default async function getFavourites(
  { where, orderBy, skip = 0, take }: GetFavouritesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const favourites = await db.favourite.findMany({
    where,
    orderBy,
    take,
    skip,
    include: { movie: {} },
  })

  const count = await db.favourite.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    favourites,
    nextPage,
    hasMore,
    count,
  }
}
