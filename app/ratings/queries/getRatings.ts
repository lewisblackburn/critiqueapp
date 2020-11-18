import db, { FindManyRatingArgs } from "db"

type GetRatingsInput = Pick<FindManyRatingArgs, "where" | "orderBy" | "skip" | "take" | "include">

export default async function getRatings({
  where,
  orderBy,
  skip = 0,
  take,
  include,
}: GetRatingsInput) {
  const ratings = await db.rating.findMany({
    where,
    orderBy,
    take,
    skip,
    include,
  })

  const count = await db.rating.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    ratings,
    nextPage,
    hasMore,
    count,
  }
}
