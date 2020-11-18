import { Loading } from "app/components/Loading"
import getGenres from "app/genres/queries/getGenres"
import Layout from "app/layouts/Layout"
import { BlitzPage, Link, usePaginatedQuery, useRouter } from "blitz"
import { Suspense } from "react"

const ITEMS_PER_PAGE = 100

export const GenresList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ genres, hasMore }] = usePaginatedQuery(getGenres, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  if (genres) {
    return (
      <div>
        <ul>
          {genres.map((genre) => (
            <li key={genre.id}>
              <Link href={`/genres/${genre.id}`}>
                <a>{genre.name}</a>
              </Link>
            </li>
          ))}
        </ul>

        <button disabled={page === 0} onClick={goToPreviousPage}>
          Previous
        </button>
        <button disabled={!hasMore} onClick={goToNextPage}>
          Next
        </button>
      </div>
    )
  } else return null
}

const GenresPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/genres/new">
          <a>Create Genre</a>
        </Link>
      </p>

      <Suspense fallback={<Loading />}>
        <GenresList />
      </Suspense>
    </div>
  )
}

GenresPage.getLayout = (page) => <Layout title={"Genres"}>{page}</Layout>

export default GenresPage
