import db, { FavouriteDeleteArgs, RatingCreateArgs } from "db"

type CreateFavouriteInput = Pick<RatingCreateArgs, "data">
type DeleteFavouriteInput = Pick<FavouriteDeleteArgs, "where">

export default async function createOrDeleteFavourite({ where, data }: any) {
  try {
    const favourite = await db.favourite.create({ data })
    return favourite
  } catch (error) {
    const favrourite = await db.favourite.delete({ where })
    return favrourite
  }
}
