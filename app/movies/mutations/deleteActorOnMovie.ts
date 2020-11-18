import { Ctx } from "blitz"
import db, { ActorsOnMoviesDeleteArgs } from "db"

type DeleteActorsOnMoviesInput = Pick<ActorsOnMoviesDeleteArgs, "where">
export default async function deleteActorOnMovie({ where }: DeleteActorsOnMoviesInput, ctx: Ctx) {
  ctx.session.authorize()

  const actorsOnMovies = await db.actorsOnMovies.delete({ where })
  return actorsOnMovies
}
