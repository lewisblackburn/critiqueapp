import { Ctx } from "blitz"
import db, { GenreDeleteArgs } from "db"

type DeleteGenreInput = Pick<GenreDeleteArgs, "where">

export default async function deleteGenre({ where }: DeleteGenreInput, ctx: Ctx) {
  ctx.session.authorize()
  ctx.session.roles.includes("admin")

  const genre = await db.genre.delete({ where })

  return genre
}
