import db, { FavouriteDeleteArgs } from "db"

type DeleteFavouriteInput = Pick<FavouriteDeleteArgs, "where">

export default async function deleteFavourite({ where }: DeleteFavouriteInput) {
  const favourite = await db.favourite.delete({ where })

  return favourite
}
