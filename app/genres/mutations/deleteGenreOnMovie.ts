import { Ctx } from "blitz"
import db, { GenresOnMoivesDeleteArgs } from "db"

type DeleteGenreOnMoviesInput = Pick<GenresOnMoivesDeleteArgs, "where">
export default async function deleteGenreOnMovie({ where }: DeleteGenreOnMoviesInput, ctx: Ctx) {
  ctx.session.authorize()

  const genresOnMovies = await db.genresOnMoives.delete({ where })
  return genresOnMovies
}
