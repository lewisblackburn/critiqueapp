import { NotFoundError } from "blitz"
import db, { FindFirstMovieArgs } from "db"

type GetMovieInput = Pick<FindFirstMovieArgs, "where">

export default async function getMovie({ where }: GetMovieInput) {
  const movie = await db.movie.findFirst({
    where,
    include: {
      actors: { include: { actor: {} } },
      genres: { include: { genre: {} } },
      reivews: { include: { rating: {} } },
    },
  })

  if (!movie) throw new NotFoundError()

  return movie
}
