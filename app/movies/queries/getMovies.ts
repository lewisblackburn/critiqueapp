import db, { FindManyMovieArgs } from "db"

type GetMoviesInput = Pick<FindManyMovieArgs, "where" | "orderBy" | "skip" | "take" | "include">

export default async function getMovies({
  where,
  orderBy,
  skip = 0,
  take,
  include,
}: GetMoviesInput) {
  const movies = await db.movie.findMany({
    where,
    orderBy,
    take,
    skip,
    include,
  })

  const count = await db.movie.count({ where })
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { where, orderBy, take, skip: skip + take! } : null

  return {
    movies,
    nextPage,
    hasMore,
    count,
  }
}
