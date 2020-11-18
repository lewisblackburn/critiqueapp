import db, { FindFirstRatingArgs } from "db"

type GetRatingInput = Pick<FindFirstRatingArgs, "where">

export default async function getAverageRating({ where }: GetRatingInput) {
  const rating = await db.rating.aggregate({ where, avg: { value: true } })

  if (!rating) return 0

  return rating
}
