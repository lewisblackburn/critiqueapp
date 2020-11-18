import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstGenreArgs } from "db"

type GetGenreInput = Pick<FindFirstGenreArgs, "where">

export default async function getGenre({ where }: GetGenreInput, ctx: Ctx) {
  ctx.session.authorize()

  const genre = await db.genre.findFirst({ where })

  if (!genre) throw new NotFoundError()

  return genre
}
