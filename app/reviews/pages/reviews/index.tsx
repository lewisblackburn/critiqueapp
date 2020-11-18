import { Loading } from "app/components/Loading"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import Layout from "app/layouts/Layout"
import { ReviewList } from "app/reviews/components/ReviewList"
import getReviews from "app/reviews/queries/getReviews"
import { BlitzPage, usePaginatedQuery, useRouter } from "blitz"
import { Suspense } from "react"

const ITEMS_PER_PAGE = 10

export const ReviewsList = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const page = Number(router.query.page) || 0
  const [{ reviews, hasMore }] = usePaginatedQuery(getReviews, {
    where: { userId: currentUser?.id || 0 },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  if (reviews) {
    return (
      <div>
        <ReviewList reviews={reviews} />
        <div className="flex items-center justify-between">
          <button
            className={`button ${!hasMore && "bg-woodsmoke-800 text-woodsmoke-400"}`}
            disabled={page === 0}
            onClick={goToPreviousPage}
          >
            Previous
          </button>
          <button
            className={`button ${!hasMore && "bg-woodsmoke-800 text-woodsmoke-400"}`}
            disabled={!hasMore}
            onClick={goToNextPage}
          >
            Next
          </button>
        </div>
      </div>
    )
  } else return null
}

const ReviewsPage: BlitzPage = () => {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<Loading />}>
        <ReviewsList />
      </Suspense>
    </div>
  )
}

ReviewsPage.getLayout = (page) => <Layout title={"Reviews"}>{page}</Layout>

export default ReviewsPage
