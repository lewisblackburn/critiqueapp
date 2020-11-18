import { Ctx } from "blitz"
import db, { GenreUpdateArgs } from "db"

type UpdateGenreInput = Pick<GenreUpdateArgs, "where" | "data">

export default async function updateGenre({ where, data }: UpdateGenreInput, ctx: Ctx) {
  ctx.session.authorize()
  ctx.session.roles.includes("admin")

  const genre = await db.genre.update({ where, data })

  return genre
}
