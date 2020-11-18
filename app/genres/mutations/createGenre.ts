import { Ctx } from "blitz"
import db, { GenreCreateArgs } from "db"

type CreateGenreInput = Pick<GenreCreateArgs, "data">
export default async function createGenre({ data }: CreateGenreInput, ctx: Ctx) {
  ctx.session.authorize()
  ctx.session.roles.includes("admin")

  const genre = await db.genre.create({ data })

  return genre
}
