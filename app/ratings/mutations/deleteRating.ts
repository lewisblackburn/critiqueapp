import { Ctx } from "blitz"
import db, { RatingDeleteArgs } from "db"

type DeleteRatingInput = Pick<RatingDeleteArgs, "where">

export default async function deleteRating({ where }: DeleteRatingInput, ctx: Ctx) {
  ctx.session.authorize()

  const rating = await db.rating.delete({ where })

  return rating
}
