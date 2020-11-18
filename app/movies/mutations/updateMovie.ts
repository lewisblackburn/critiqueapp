import { Ctx } from "blitz"
import db, { MovieUpdateArgs } from "db"

type UpdateMovieInput = Pick<MovieUpdateArgs, "where" | "data">

export default async function updateMovie({ where, data }: UpdateMovieInput, ctx: Ctx) {
  ctx.session.authorize()

  const movie = await db.movie.update({ where, data })

  return movie
}
