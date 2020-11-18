import { Ctx } from "blitz"
import db, { ReviewCreateArgs } from "db"

type CreateReviewInput = Pick<ReviewCreateArgs, "data">
export default async function createReview({ data }: CreateReviewInput, ctx: Ctx) {
  ctx.session.authorize()

  const review = await db.review.create({ data })

  return review
}
