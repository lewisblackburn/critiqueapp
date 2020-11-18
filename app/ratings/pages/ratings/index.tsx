import { Loading } from "app/components/Loading"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import Layout from "app/layouts/Layout"
import getRatings from "app/ratings/queries/getRatings"
import { BlitzPage, Link, usePaginatedQuery, useRouter } from "blitz"
import { Suspense } from "react"
import { Img } from "react-image"

const ITEMS_PER_PAGE = 8

export const RatingsList = () => {
  const router = useRouter()

  const currentUser = useCurrentUser()
  const page = Number(router.query.page) || 0
  const [{ ratings, hasMore }] = usePaginatedQuery(getRatings, {
    where: { userId: currentUser?.id },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
    include: { movie: {} },
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  if (ratings) {
    return (
      <div>
        <div className="grid grid-flow-row grid-cols-4 gap-5 py-5">
          {ratings.map((rating: any, i) => (
            <Link key={i} href={`movies/${rating.movieId}`}>
              <a>
                <Img className="rounded" alt={rating.movie.art} src={rating.movie.art} />
              </a>
            </Link>
          ))}
        </div>

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

const RatingsPage: BlitzPage = () => {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<Loading />}>
        <RatingsList />
      </Suspense>
    </div>
  )
}

RatingsPage.getLayout = (page) => <Layout title={"Ratings"}>{page}</Layout>

export default RatingsPage
