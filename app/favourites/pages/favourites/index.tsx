import { Movie } from "@prisma/client"
import { Loading } from "app/components/Loading"
import getUserFavourites from "app/favourites/queries/getUserFavourites"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import Layout from "app/layouts/Layout"
import { MovieList } from "app/movies/components/MovieList"
import { BlitzPage, useQuery } from "blitz"
import { Suspense } from "react"

export const FavouritesList = () => {
  const currentUser = useCurrentUser()
  const [user] = useQuery(getUserFavourites, { where: { id: currentUser?.id } })

  let movies: Movie[] = []

  user?.favourites.forEach((favourite) => {
    movies.push(favourite.movie)
  })

  console.log(movies)

  if (movies.length > 0) {
    return (
      <div>
        <MovieList movies={movies} />
      </div>
    )
  } else return null
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
