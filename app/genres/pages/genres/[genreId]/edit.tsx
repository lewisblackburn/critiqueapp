import { Loading } from "app/components/Loading"
import GenreForm from "app/genres/components/GenreForm"
import updateGenre from "app/genres/mutations/updateGenre"
import getGenre from "app/genres/queries/getGenre"
import Layout from "app/layouts/Layout"
import { BlitzPage, Link, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const EditGenre = () => {
  const router = useRouter()
  const genreId = useParam("genreId", "number")
  const [genre, { setQueryData }] = useQuery(getGenre, { where: { id: genreId } })
  const [updateGenreMutation] = useMutation(updateGenre)

  if (genre) {
    return (
      <div>
        <h1>Edit Genre {genre.id}</h1>
        <pre>{JSON.stringify(genre)}</pre>

        <GenreForm
          initialValues={genre}
          onSubmit={async () => {
            try {
              const updated = await updateGenreMutation({
                where: { id: genre.id },
                data: { name: "MyNewName" },
              })
              await setQueryData(updated)
              alert("Success!" + JSON.stringify(updated))
              router.push(`/genres/${updated.id}`)
            } catch (error) {
              console.log(error)
              alert("Error creating genre " + JSON.stringify(error, null, 2))
            }
          }}
        />
      </div>
    )
  } else return null
}

const EditGenrePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <EditGenre />
      </Suspense>

      <p>
        <Link href="/genres">
          <a>Genres</a>
        </Link>
      </p>
    </div>
  )
}

EditGenrePage.getLayout = (page) => <Layout title={"Edit Genre"}>{page}</Layout>

export default EditGenrePage
