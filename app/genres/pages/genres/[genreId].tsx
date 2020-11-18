import { Loading } from "app/components/Loading"
import deleteGenre from "app/genres/mutations/deleteGenre"
import getGenre from "app/genres/queries/getGenre"
import Layout from "app/layouts/Layout"
import { BlitzPage, Link, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const Genre = () => {
  const router = useRouter()
  const genreId = useParam("genreId", "number")
  const [genre] = useQuery(getGenre, { where: { id: genreId } })
  const [deleteGenreMutation] = useMutation(deleteGenre)

  if (genre) {
    return (
      <div>
        <h1>Genre {genre.id}</h1>
        <pre>{JSON.stringify(genre, null, 2)}</pre>

        <Link href={`/genres/${genre.id}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteGenreMutation({ where: { id: genre.id } })
              router.push("/genres")
            }
          }}
        >
          Delete
        </button>
      </div>
    )
  } else return null
}

const ShowGenrePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/genres">
          <a>Genres</a>
        </Link>
      </p>

      <Suspense fallback={<Loading />}>
        <Genre />
      </Suspense>
    </div>
  )
}

ShowGenrePage.getLayout = (page) => <Layout title={"Genre"}>{page}</Layout>

export default ShowGenrePage
