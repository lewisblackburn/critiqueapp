import { Movie } from "@prisma/client"
import { Filters } from "app/components/Filters"
import { Loading } from "app/components/Loading"
import Layout from "app/layouts/Layout"
import { MovieList } from "app/movies/components/MovieList"
import getMovies from "app/movies/queries/getMovies"
import { BlitzPage, useInfiniteQuery } from "blitz"
import { Suspense, useState } from "react"

export const Movies = () => {
  const [age, setAge] = useState({})
  const [orderBy, setOrderBy] = useState({})

  const [movies, { isFetchingMore, fetchMore, canFetchMore }] = useInfiniteQuery(
    getMovies,
    (
      page = {
        where: { age: age },
        orderBy: orderBy,

        take: 12,
        skip: 0,
      }
    ) => page,
    {
      getFetchMore: (lastGroup) => lastGroup.nextPage,
    }
  )

  let newMovies: Movie[] = []

  movies.forEach((group) => {
    group.movies.forEach((movie) => {
      newMovies.push(movie)
    })
  })

  if (movies) {
    return (
      <div className="container mx-auto flex flex-col">
        <div className="pb-10 flex items-center justify-between">
          <Filters setAge={(age) => setAge(age)} setOrderBy={(orderBy) => setOrderBy(orderBy)} />
        </div>
        <div className="container mx-auto">
          <MovieList movies={newMovies} />
          <div className="flex justify-center">
            <button
              className="bg-gray-900 text-white py-2"
              onClick={() => fetchMore()}
              disabled={!canFetchMore || !!isFetchingMore}
            >
              {isFetchingMore
                ? "Loading more..."
                : canFetchMore
                ? "Load More"
                : "Nothing more to load"}
            </button>
          </div>
        </div>
      </div>
    )
  } else return null
}

const MoviesPage: BlitzPage = () => {
  return (
    <div className="">
      <Suspense fallback={<Loading />}>
        <Movies />
      </Suspense>
    </div>
  )
}

MoviesPage.getLayout = (page) => <Layout title={"Movies"}>{page}</Layout>

export default MoviesPage
