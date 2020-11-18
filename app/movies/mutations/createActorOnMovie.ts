import { Ctx } from "blitz"
import db, { ActorsOnMoviesCreateArgs } from "db"

type CreateActorsOnMoviesInput = Pick<ActorsOnMoviesCreateArgs, "data">
export default async function createActorOnMovie({ data }: CreateActorsOnMoviesInput, ctx: Ctx) {
  ctx.session.authorize()

  const actorsOnMovies = await db.actorsOnMovies.create({ data })
  return actorsOnMovies
}
