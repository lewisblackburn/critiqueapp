import { Loading } from "app/components/Loading"
import Layout from "app/layouts/Layout"
import { MovieList } from "app/movies/components/MovieList"
import getMovies from "app/movies/queries/getMovies"
import getRatings from "app/ratings/queries/getRatings"
import { BlitzPage, Link, useQuery } from "blitz"
import { Suspense } from "react"
import { Img } from "react-image"

const Banner = () => {
  const [{ ratings }] = useQuery(getRatings, {
    orderBy: { value: "desc" },
    take: 1,
    include: { movie: {} },
  })
  if (ratings[0]) {
    return (
      <div className="mb-20">
        <Link href={`/movies/${ratings[0].movieId}`}>
          <a>
            <Img
              className="w-full h-64 rounded object-cover"
              src={(ratings[0] as any).movie.banner}
              alt="movie banner"
            />
          </a>
        </Link>
      </div>
    )
  } else return null
}

const Movies = () => {
  const [{ movies }] = useQuery(getMovies, { take: 10 })
  if (movies) {
    return <MovieList movies={movies} />
  } else return null
}

const Home: BlitzPage = () => {
  return (
    <div className="container mx-auto">
      <Banner />
      <div>
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-3xl">Popular Movies</h1>
          <Link href="/movies">
            <a>View All</a>
          </Link>
        </div>

        <Suspense fallback={<Loading />}>
          <Movies />
        </Suspense>
      </div>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
