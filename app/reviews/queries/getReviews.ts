import { Ctx } from "blitz"
import db, { FindManyReviewArgs } from "db"

type GetReviewsInput = Pick<FindManyReviewArgs, "where" | "orderBy" | "skip" | "take">

export default async function getReviews(
  { where, orderBy, skip = 0, take }: GetReviewsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const reviews = await db.review.findMany({
    where,
    orderBy,
    take,
    skip,
    include: { rating: {} },
  })

  const count = await db.review.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    reviews,
    nextPage,
    hasMore,
    count,
  }
}
