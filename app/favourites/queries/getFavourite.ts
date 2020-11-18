import db, { FindFirstFavouriteArgs } from "db"

type GetFavouriteInput = Pick<FindFirstFavouriteArgs, "where">

export default async function getFavourite({ where }: GetFavouriteInput) {
  const favourite = await db.favourite.findFirst({ where })

  // if (!favourite) throw new NotFoundError()

  return favourite
}
