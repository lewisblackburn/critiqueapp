import { Loading } from "app/components/Loading"
import deleteGenreOnMovie from "app/genres/mutations/deleteGenreOnMovie"
import Layout from "app/layouts/Layout"
import MovieForm from "app/movies/components/MovieForm"
import deleteActorOnMovie from "app/movies/mutations/deleteActorOnMovie"
import updateMovie from "app/movies/mutations/updateMovie"
import getMovie from "app/movies/queries/getMovie"
import { BlitzPage, Link, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"
import { Img } from "react-image"

export const EditMovie = () => {
  const router = useRouter()
  const movieId = useParam("movieId", "number")
  const [movie, { refetch, setQueryData }] = useQuery(getMovie, { where: { id: movieId } })
  const [updateMovieMutation] = useMutation(updateMovie)
  const [deleteActorOnMovieMutation] = useMutation(deleteActorOnMovie)
  const [deleteGenreOnMovieMutation] = useMutation(deleteGenreOnMovie)

  if (movie) {
    return (
      <div>
        <MovieForm
          initialValues={movie}
          onSubmit={async (event: any) => {
            const {
              banner,
              art,
              title,
              age,
              release,
              rating,
              trailer,
              tagline,
              overview,
              runtime,
              status,
              language,
              budget,
              revenue,
            }: any = event
            try {
              const updated = await updateMovieMutation({
                where: { id: movie.id },
                data: {
                  banner: event.banner,
                  art: event.art,
                  title: event.title,
                  age: event.age,
                  release: event.release,
                  trailer: event.trailer,
                  tagline: event.tagline,
                  overview: event.overview,
                  runtime: parseInt(event.runtime),
                  status: event.status,
                  language: event.language,
                  budget: parseInt(event.budget),
                  revenue: parseInt(event.revenue),
                  actors: {},
                  genres: {},
                  reivews: {},
                },
              })
              await setQueryData(updated as any)
              router.push(`/movies/${updated.id}`)
            } catch (error) {
              console.log(error)
              alert("Error creating movie " + JSON.stringify(error, null, 2))
            }
          }}
        />
        <div className="grid grid-flow-row grid-cols-6 gap-5 mt-10">
          {movie.actors?.map((actor, i) => (
            <div key={i} className="flex flex-col shadow-lg bg-woodsmoke-500 rounded">
              <Img className="h-64" src={actor.actor.image} alt="" />
              <div className="flex flex-col p-2">
                <span className="font-bold">{actor.actor.name}</span>
                <span>{actor.role}</span>
              </div>
              <button
                className="button w-full"
                onClick={async () => {
                  await deleteActorOnMovieMutation({
                    where: { movieId_actorId: { movieId: movie.id, actorId: actor.actorId } },
                  })
                  refetch()
                }}
              >
                remove
              </button>
            </div>
          ))}
        </div>
        <div className="flex py-20 item-center justify-center">
          <Link href={`/movies/${movieId}/actors/add`}>
            <a className="button mx-auto">add actors</a>
          </Link>
        </div>
        <div className="grid grid-flow-row grid-cols-4 gap-5 mt-10">
          {movie.genres?.map((genre, i) => (
            <div key={i} className="flex flex-col shadow-lg bg-woodsmoke-500 rounded mb-10">
              <a className="flex flex-col cursor-pointer">
                <span className="m-4 font-bold">{genre.genre.name}</span>
              </a>
              <button
                className="button w-full"
                onClick={async () => {
                  await deleteGenreOnMovieMutation({
                    where: { movieId_genreId: { movieId: movie.id, genreId: genre.genreId } },
                  })
                  refetch()
                }}
              >
                remove
              </button>
            </div>
          ))}
        </div>
        <div className="flex py-20 item-center justify-center">
          <Link href={`/movies/${movieId}/genres/add`}>
            <a className="button mx-auto">add genres</a>
          </Link>
        </div>
      </div>
    )
  } else return null
}

const EditMoviePage: BlitzPage = () => {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<Loading />}>
        <EditMovie />
      </Suspense>
    </div>
  )
}

EditMoviePage.getLayout = (page) => <Layout title={"Edit Movie"}>{page}</Layout>

export default EditMoviePage
