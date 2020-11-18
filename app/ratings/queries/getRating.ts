import db, { FindFirstRatingArgs } from "db"

type GetRatingInput = Pick<FindFirstRatingArgs, "where">

export default async function getRating({ where }: GetRatingInput) {
  const rating = await db.rating.findFirst({ where })

  if (!rating) return 0

  return rating
}
