import { Ctx } from "blitz"
import db, { ReviewDeleteArgs } from "db"

type DeleteReviewInput = Pick<ReviewDeleteArgs, "where">

export default async function deleteReview({ where }: DeleteReviewInput, ctx: Ctx) {
  ctx.session.authorize()

  const review = await db.review.delete({ where })

  return review
}
