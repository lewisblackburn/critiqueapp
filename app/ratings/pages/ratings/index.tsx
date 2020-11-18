import { Movie } from "@prisma/client"
import { Loading } from "app/components/Loading"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import Layout from "app/layouts/Layout"
import { MovieList } from "app/movies/components/MovieList"
import getUserRatings from "app/ratings/queries/getUserRatings"
import { BlitzPage, useQuery } from "blitz"
import { Suspense } from "react"

export const RatingsList = () => {
  const currentUser = useCurrentUser()
  const [user] = useQuery(getUserRatings, { where: { id: currentUser?.id } })

  let movies: Movie[] = []

  user?.ratings.forEach((rating) => {
    movies.push(rating.movie)
  })

  if (movies.length > 0) {
    return (
      <div>
        <MovieList movies={movies} />{" "}
      </div>
    )
  }
  return null
}

const RatingsPage: BlitzPage = () => {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<Loading />}>
        <RatingsList />
      </Suspense>
    </div>
  )
}

RatingsPage.getLayout = (page) => <Layout title={"Favourites"}>{page}</Layout>

export default RatingsPage
