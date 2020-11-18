import { Ctx } from "blitz"
import db, { MovieDeleteArgs } from "db"

type DeleteMovieInput = Pick<MovieDeleteArgs, "where">

export default async function deleteMovie({ where }: DeleteMovieInput, ctx: Ctx) {
  ctx.session.authorize()

  const movie = await db.movie.delete({ where })

  return movie
}
