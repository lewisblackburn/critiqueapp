import { Loading } from "app/components/Loading"
import Layout from "app/layouts/Layout"
import getMovies from "app/movies/queries/getMovies"
import { BlitzPage, Link, useParam, useQuery } from "blitz"
import { Suspense } from "react"
import { Img } from "react-image"

export const MovieList = ({}) => {
  let term = useParam("term", "string")
  term = term?.replace("%20", " ")
  const [movies] = useQuery(getMovies, {
    where: { title: { contains: term, mode: "insensitive" } },
    take: 10,
  })

  if (movies) {
    if (movies?.count > 0) {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
          {movies.movies.map((movie, i) => (
            <div key={i}>
              <Link href={`../movies/${movie.id}`}>
                <a>
                  <div>
                    <Img className="rounded" src={movie.art} alt="" />
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      )
    } else {
      return <div className="h-screen">nothing found</div>
    }
  } else return null
}

const SearchPage: BlitzPage = () => {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<Loading />}>
        <MovieList />
      </Suspense>
    </div>
  )
}

SearchPage.getLayout = (page) => <Layout title={"Movie"}>{page}</Layout>

export default SearchPage
