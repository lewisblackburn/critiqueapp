import { Ctx } from "blitz"
import db, { FavouriteUpdateArgs } from "db"

type UpdateFavouriteInput = Pick<FavouriteUpdateArgs, "where" | "data">

export default async function updateFavourite({ where, data }: UpdateFavouriteInput, ctx: Ctx) {
  ctx.session.authorize()

  const favourite = await db.favourite.update({ where, data })

  return favourite
}
