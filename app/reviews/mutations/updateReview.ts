import { Ctx } from "blitz"
import db, { ReviewUpdateArgs } from "db"

type UpdateReviewInput = Pick<ReviewUpdateArgs, "where" | "data">

export default async function updateReview({ where, data }: UpdateReviewInput, ctx: Ctx) {
  ctx.session.authorize()

  const review = await db.review.update({ where, data })

  return review
}
