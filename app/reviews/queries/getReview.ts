import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstReviewArgs } from "db"

type GetReviewInput = Pick<FindFirstReviewArgs, "where">

export default async function getReview({ where }: GetReviewInput, ctx: Ctx) {
  ctx.session.authorize()

  const review = await db.review.findFirst({ where, include: { rating: {} } })

  if (!review) throw new NotFoundError()

  return review
}
