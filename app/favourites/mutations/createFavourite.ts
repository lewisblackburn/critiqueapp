import db, { FavouriteCreateArgs } from "db"

type CreateFavouriteInput = Pick<FavouriteCreateArgs, "data">
export default async function createFavourite({ data }: CreateFavouriteInput) {
  const favourite = await db.favourite.create({ data })

  return favourite
}
