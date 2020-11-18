import { Loading } from "app/components/Loading"
import Layout from "app/layouts/Layout"
import ReviewForm from "app/reviews/components/ReviewForm"
import updateReview from "app/reviews/mutations/updateReview"
import getReview from "app/reviews/queries/getReview"
import { BlitzPage, Link, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const EditReview = () => {
  const router = useRouter()
  const reviewId = useParam("reviewId", "number")
  const [review, { setQueryData }] = useQuery(getReview, { where: { id: reviewId } })
  const [updateReviewMutation] = useMutation(updateReview)

  if (review) {
    return (
      <div>
        <h1>Edit Review {review.id}</h1>
        <pre>{JSON.stringify(review)}</pre>

        <ReviewForm
          initialValues={review}
          onSubmit={async (event) => {
            const { title, content }: any = event
            try {
              const updated: any = await updateReviewMutation({
                where: { id: review.id },
                data: {
                  title,
                  content,
                  by: review.by,
                  movie: { connect: { id: review.ratingMovieId } },
                  user: { connect: { id: review.ratingUserId } },
                  rating: {
                    connect: {
                      userId_movieId: {
                        userId: review.ratingUserId,
                        movieId: review.ratingMovieId,
                      },
                    },
                  },
                },
              })
              await setQueryData(updated)
              alert("Success!" + JSON.stringify(updated))
              router.push(`/reviews/${updated.id}`)
            } catch (error) {
              console.log(error)
              alert("Error creating review " + JSON.stringify(error, null, 2))
            }
          }}
        />
      </div>
    )
  } else return null
}

const EditReviewPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <EditReview />
      </Suspense>

      <p>
        <Link href="/reviews">
          <a>Reviews</a>
        </Link>
      </p>
    </div>
  )
}

EditReviewPage.getLayout = (page) => <Layout title={"Edit Review"}>{page}</Layout>

export default EditReviewPage
