import { useCurrentUser } from "app/hooks/useCurrentUser"
import Layout from "app/layouts/Layout"
import ReviewForm from "app/reviews/components/ReviewForm"
import createReview from "app/reviews/mutations/createReview"
import { BlitzPage, Link, useMutation, useParam, useRouter } from "blitz"

const NewReviewPage: BlitzPage = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const movieId = useParam("movieId", "number")
  const [createReviewMutation] = useMutation(createReview)

  return (
    <div>
      <h1>Create New Review</h1>

      <ReviewForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const review = await createReviewMutation({
              data: {
                content: "very good",
                title: "here is my review",
                by: currentUser!.name,
                movie: {
                  connect: {
                    id: movieId,
                  },
                },
                user: {
                  connect: {
                    id: currentUser?.id,
                  },
                },
                rating: {},
              },
            })
            router.push(`/reviews/${review.id}`)
          } catch (error) {
            alert("Error creating review " + JSON.stringify(error, null, 2))
          }
        }}
      />
      <p>
        <Link href="/reviews">
          <a>Reviews</a>
        </Link>
      </p>
    </div>
  )
}

NewReviewPage.getLayout = (page) => <Layout title={"Create New Review"}>{page}</Layout>

export default NewReviewPage
