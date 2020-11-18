import { Loading } from "app/components/Loading"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import Layout from "app/layouts/Layout"
import deleteReview from "app/reviews/mutations/deleteReview"
import getReview from "app/reviews/queries/getReview"
import { BlitzPage, Link, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const Review = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const reviewId = useParam("reviewId", "number")
  const [review] = useQuery(getReview, { where: { id: reviewId } })
  const [deleteReviewMutation] = useMutation(deleteReview)

  if (review) {
    return (
      <div>
        <div className="flex mb-10 bg-woodsmoke-500 rounded">
          <div className="m-5">
            <div className="flex items-center">
              <h1 className="font-semibold text-xl">{review.title}</h1>
              <span className="ml-1">by {review.by}</span>
              <span className="bg-woodsmoke-900 font-bold text-xs self-center px-3 py-1 mx-3 rounded">
                {review.rating.value}
              </span>
            </div>
            <p className="mt-2">{review.content}</p>
          </div>
        </div>

        {review.userId === currentUser?.id && (
          <div>
            <Link href={`/reviews/${review.id}/edit`}>
              <a>Edit</a>
            </Link>

            <button
              type="button"
              onClick={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteReviewMutation({ where: { id: review.id } })
                  router.push("/reviews")
                }
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    )
  } else return null
}

const ShowReviewPage: BlitzPage = () => {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<Loading />}>
        <Review />
      </Suspense>
    </div>
  )
}

ShowReviewPage.getLayout = (page) => <Layout title={"Review"}>{page}</Layout>

export default ShowReviewPage
