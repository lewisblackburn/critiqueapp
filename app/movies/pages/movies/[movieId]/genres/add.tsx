import createGenreOnMovie from "app/genres/mutations/createGenreOnMovie"
import getGenres from "app/genres/queries/getGenres"
import Layout from "app/layouts/Layout"
import { BlitzPage, useMutation, useParam, useQuery } from "blitz"

const NewGenrePage: BlitzPage = () => {
  const movieId = useParam("movieId", "number")
  const [createGenreOnMovieMutation] = useMutation(createGenreOnMovie)
  const [genres, { refetch }] = useQuery(getGenres, {
    where: { movies: { none: { movieId } } },
  })

  if (genres) {
    return (
      <div className="container mx-auto">
        <div className="grid grid-flow-row grid-cols-4 gap-5 mt-10">
          {genres.genres.map((genre, i) => (
            <div key={i} className="flex flex-col shadow-lg bg-woodsmoke-500 rounded mb-10">
              <a className="flex flex-col cursor-pointer">
                <span className="m-4 font-bold">{genre.name}</span>
              </a>
              <button
                className="button"
                onClick={async () => {
                  await createGenreOnMovieMutation({
                    data: {
                      genre: {
                        connect: {
                          id: genre.id,
                        },
                      },
                      movie: {
                        connect: {
                          id: movieId,
                        },
                      },
                    },
                  })
                  refetch()
                }}
              >
                add
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  } else return null
}

NewGenrePage.getLayout = (page) => <Layout title={"Create New Actor"}>{page}</Layout>

export default NewGenrePage
