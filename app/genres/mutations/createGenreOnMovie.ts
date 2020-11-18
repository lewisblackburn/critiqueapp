import { Ctx } from "blitz"
import db, { GenresOnMoivesCreateArgs } from "db"

type CreateGenresOnMoviesInput = Pick<GenresOnMoivesCreateArgs, "data">
export default async function createGenreOnMovie({ data }: CreateGenresOnMoviesInput, ctx: Ctx) {
  ctx.session.authorize()

  const actorsOnMovies = await db.genresOnMoives.create({ data })
  return actorsOnMovies
}
