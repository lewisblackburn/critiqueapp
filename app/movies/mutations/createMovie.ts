import { Ctx } from "blitz"
import db, { MovieCreateArgs } from "db"

type CreateMovieInput = Pick<MovieCreateArgs, "data">
export default async function createMovie({ data }: CreateMovieInput, ctx: Ctx) {
  ctx.session.authorize()

  const movie = await db.movie.create({ data })

  return movie
}
