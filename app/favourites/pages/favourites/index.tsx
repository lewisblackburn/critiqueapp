import { Movie } from "@prisma/client"
import { Loading } from "app/components/Loading"
import getFavourites from "app/favourites/queries/getFavourites"
import Layout from "app/layouts/Layout"
import { MovieList } from "app/movies/components/MovieList"
import { BlitzPage, useInfiniteQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const FavouritesList = () => {
  const router = useRouter()
  const [favourites, { isFetchingMore, fetchMore, canFetchMore }] = useInfiniteQuery(
    getFavourites,
    (
      page = {
        take: 12,
        skip: 0,
      }
    ) => page,
    {
      getFetchMore: (lastGroup) => lastGroup.nextPage,
    }
  )

  let newFavourites: Movie[] = []

  favourites.forEach((group) => {
    group.favourites.forEach((favourite) => {
      newFavourites.push(favourite.movie)
    })
  })

  if (favourites) {
    return (
      <div>
        <MovieList movies={newFavourites} />
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
    )
  }
  return null
}

const FavouritesPage: BlitzPage = () => {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<Loading />}>
        <FavouritesList />
      </Suspense>
    </div>
  )
}

FavouritesPage.getLayout = (page) => <Layout title={"Favourites"}>{page}</Layout>

export default FavouritesPage
