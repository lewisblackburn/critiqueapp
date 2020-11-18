import { Ctx } from "blitz"
import db, { RatingUpdateArgs } from "db"

type UpdateRatingInput = Pick<RatingUpdateArgs, "where" | "data">

export default async function updateRating({ where, data }: UpdateRatingInput, ctx: Ctx) {
  ctx.session.authorize()

  const rating = await db.rating.update({ where, data })

  return rating
}
