import { Movie } from "@prisma/client"
import { Loading } from "app/components/Loading"
import Layout from "app/layouts/Layout"
import getRatings from "app/ratings/queries/getRatings"
import { BlitzPage, Link, useInfiniteQuery, useRouter } from "blitz"
import { Suspense } from "react"
import { Img } from "react-image"

export const RatingsList = () => {
  const router = useRouter()
  const [ratings, { isFetchingMore, fetchMore, canFetchMore }] = useInfiniteQuery(
    getRatings,
    (
      page = {
        take: 12,
        skip: 0,
        include: { movie: {} },
      }
    ) => page,
    {
      getFetchMore: (lastGroup) => lastGroup.nextPage,
    }
  )

  let newRatings: Movie[] = []

  ratings.forEach((group) => {
    group.ratings.forEach((rating) => {
      // @ts-ignore
      newRatings.push(rating.movie)
    })
  })

  console.log(newRatings)

  if (ratings) {
    return (
      <div>
        <div className="grid grid-flow-row grid-cols-4 gap-5 py-5">
          {newRatings.map((movie: Movie, i) => (
            <Link key={i} href={`movies/${movie.id}`}>
              <a>
                <Img className="rounded" alt={movie.art} src={movie.art} />
              </a>
            </Link>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            className="bg-gray-900 text-white py-2"
            onClick={() => fetchMore()}
            disabled={!canFetchMore || !!isFetchingMore}
          >
            {isFetchingMore
              ? "Loading more..."
              : canFetchMore
              ? "Load More"
              : "Nothing more to load"}
          </button>
        </div>
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
