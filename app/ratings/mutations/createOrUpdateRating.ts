import db, { RatingCreateArgs, RatingUpdateArgs } from "db"

type UpdateRatingInput = Pick<RatingUpdateArgs, "where" | "data">
type CreateRatingInput = Pick<RatingCreateArgs, "data">

export default async function createOrUpdateRating({ where, data }: UpdateRatingInput) {
  try {
    const rating = await db.rating.create({ data } as CreateRatingInput)
    return rating
  } catch (error) {
    const rating = await db.rating.update({ where, data })
    return rating
  }
}
