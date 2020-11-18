import { Ctx } from "blitz"
import db, { RatingCreateArgs } from "db"

type CreateRatingInput = Pick<RatingCreateArgs, "data">
export default async function createRating({ data }: CreateRatingInput, ctx: Ctx) {
  ctx.session.authorize()

  const rating = await db.rating.create({ data })

  return rating
}
