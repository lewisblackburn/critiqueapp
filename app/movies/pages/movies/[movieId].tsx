import { ActorList } from "app/actors/components/ActorList"
import { Loading } from "app/components/Loading"
import createOrDeleteFavourite from "app/favourites/mutations/createOrDeleteFavourite"
import getFavourite from "app/favourites/queries/getFavourite"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import Layout from "app/layouts/Layout"
import updateMovie from "app/movies/mutations/updateMovie"
import getMovie from "app/movies/queries/getMovie"
import createOrUpdateRating from "app/ratings/mutations/createOrUpdateRating"
import getAverageRating from "app/ratings/queries/getAverageRating"
import getRating from "app/ratings/queries/getRating"
import ReviewForm from "app/reviews/components/ReviewForm"
import { ReviewList } from "app/reviews/components/ReviewList"
import createReview from "app/reviews/mutations/createReview"
import { BlitzPage, Link, useMutation, useParam, useQuery } from "blitz"
import { Suspense, useEffect, useState } from "react"
import { RiEditCircleLine, RiHeartFill, RiPlayFill, RiShareBoxFill } from "react-icons/ri"
import Rating from "react-simple-star-rating"
import { formatMoney } from "utils/formatMoney"

export const Movie = () => {
  const currentUser = useCurrentUser()
  const movieId = useParam("movieId", "number")
  const [movie, { refetch: refetchMovie }] = useQuery(getMovie, { where: { id: movieId } })
  const [createReviewMutation] = useMutation(createReview)
  const [createOrDeleteFavouriteMutation] = useMutation(createOrDeleteFavourite)
  const [createOrUpdateRatingMutation] = useMutation(createOrUpdateRating)
  const [favourite, { refetch: favouriteRefetch }] = useQuery(getFavourite, {
    where: { userId: currentUser?.id || 0, movieId: movie?.id },
  })
  const [rating, { refetch: refetchRating }] = useQuery(getRating, {
    where: { userId: currentUser?.id || 0, movieId: movie?.id },
  })
  const [averageRating, { refetch: averageRatingRefetch }] = useQuery(getAverageRating, {
    where: { movieId },
  })

  const [updateMovieMutation] = useMutation(updateMovie)
  useEffect(() => {
    updateMovieMutation({
      where: {
        id: movie.id,
      },
      data: {
        views: movie.views + 1,
      },
    })
  }, [movieId])

  const ages = {
    U: "text-green-500 border-green-500",
    PG: "text-green-300 border-green-300",
    12: "text-orange-500 border-orange-100",
    "12A": "text-orange-500 border-orange-500",
    15: "text-orange-500 border-orange-500",
    16: "text-red-300 border-red-300",
    18: "text-red-500 border-red-500",
  }

  const [starRating, setStarRating] = useState(0)

  const handleRating = async (rate) => {
    rate = rate * 2 * 10
    setStarRating(rate)
    try {
      await createOrUpdateRatingMutation({
        where: {
          userId_movieId: { userId: currentUser!.id, movieId: movie.id },
        },
        data: {
          movie: { connect: { id: movie.id } },
          user: {
            connect: {
              id: currentUser?.id,
            },
          },
          value: rate,
        },
      })
      refetchRating()
      averageRatingRefetch()
    } catch (error) {
      alert("You must be logged in to perform this action"!)
    }
  }

  if (movie) {
    return (
      <div className="pb-10">
        <div className="banner">
          <div className="overlay">
            <div className="container mx-auto flex py-10">
              <img className="rounded image" src={movie.art} alt={movie.title} />
              <div className="flex flex-col p-10">
                <h1 className="font-bold text-3xl">
                  {movie.title} ({movie.release.slice(-4)})
                </h1>
                <div className="flex items-center font-semibold my-2">
                  <span className={`border px-2 py-1 font-bold ${ages[movie.age]}`}>
                    {movie.age}
                  </span>
                  <span className="ml-3">{movie.release}</span>
                  <span className="mx-2">&bull;</span>
                  <div>
                    {movie.genres.map((genre, i) => (
                      <span key={i}>
                        {genre.genre.name}
                        <span className="mx-2">&bull;</span>
                      </span>
                    ))}
                  </div>
                  <span>
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                </div>
                <div className="pt-5">
                  <p className="text-gray-500">{movie.tagline}</p>
                  <h1 className="font-bold text-lg pt-5">Overview</h1>
                  <p>{movie.overview}</p>
                </div>
                <div className="grid grid-flow-row gap-5 pt-5">
                  <p>
                    <span className="font-bold">Status:</span> {movie.status}
                  </p>
                  <p>
                    <span className="font-bold">Budget:</span> {formatMoney(movie.budget || 0)}
                  </p>

                  <p>
                    <span className="font-bold">Revenue:</span> {formatMoney(movie.revenue || 0)}
                  </p>
                  <p>
                    <span className="font-bold">Lanuage:</span> {movie.language}
                  </p>
                  <p>
                    <span className="font-bold">Rating:</span>
                    {(averageRating && averageRating.avg.value) || 0}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-10 font-bold text-xl">
                  <div className="flex items-center">
                    <div>
                      <a>
                        <RiHeartFill
                          className={`${favourite ? "text-red-500" : ""} cursor-pointer`}
                          onClick={async () => {
                            try {
                              await createOrDeleteFavouriteMutation({
                                data: {
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
                                },
                                where: {
                                  userId_movieId: { userId: currentUser!.id, movieId: movie.id },
                                },
                              })
                              favouriteRefetch()
                            } catch (error) {
                              alert("You must be logged in to perform this action"!)
                            }
                          }}
                        />
                      </a>
                    </div>

                    <Link href="/">
                      <a className="ml-6">
                        <RiShareBoxFill />
                      </a>
                    </Link>
                    <Link href={`/movies/${movie.id}/edit`}>
                      <a className="ml-6">
                        <RiEditCircleLine />
                      </a>
                    </Link>
                    <a className="ml-5">
                      <Rating
                        className="flex"
                        onClick={handleRating}
                        ratingValue={rating ? rating.value / 2 / 10 : starRating}
                        size={20}
                        transition
                        fillColor="orange"
                        emptyColor="gray"
                      />
                      {/* defaultValue={rating.value / 2 / 10} */}
                    </a>
                  </div>
                  <a href={movie.trailer} target="_blank" className="flex items-center">
                    <RiPlayFill className="mr-2" />
                    <span className="text-sm">Play Trailer</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto">
          <h1 className="font-bold text-3xl py-10">The Cast</h1>
          <ActorList movie={movie} />

          <h1 className="font-bold text-3xl pb-10">Reviews</h1>
          <ReviewList reviews={movie.reivews} />
          <ReviewForm
            initialValues={{}}
            onSubmit={async (event) => {
              const { title, content }: any = event
              await createReviewMutation({
                data: {
                  title,
                  content,
                  by: currentUser!.name || "",
                  rating: {
                    connectOrCreate: {
                      where: {
                        userId_movieId: { userId: currentUser!.id, movieId: movie.id },
                      },
                      create: {
                        movie: {
                          connect: {
                            id: movieId,
                          },
                        },
                        user: {
                          connect: {
                            id: currentUser!.id,
                          },
                        },
                        value: 0,
                      },
                    },
                  },
                  movie: {
                    connect: {
                      id: movieId,
                    },
                  },
                  user: {
                    connect: {
                      id: currentUser!.id,
                    },
                  },
                },
              })
              refetchMovie()
            }}
          />
        </div>
        <style jsx>{`
          .banner {
            background-image: linear-gradient(
                to bottom,
                rgba(0, 0, 1, 1) 150px,
                rgba(1, 1, 1, 0.84) 100%
              ),
              url(${movie.banner});
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }
          .image {
            height: 37rem !important;
          }
        `}</style>
      </div>
    )
  } else return null
}

const ShowMoviePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Movie />
      </Suspense>
    </div>
  )
}

ShowMoviePage.getLayout = (page) => <Layout title={"Movie"}>{page}</Layout>

export default ShowMoviePage
