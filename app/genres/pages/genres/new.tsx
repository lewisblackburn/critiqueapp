import GenreForm from "app/genres/components/GenreForm"
import createGenre from "app/genres/mutations/createGenre"
import Layout from "app/layouts/Layout"
import { BlitzPage, Link, useMutation, useRouter } from "blitz"

const NewGenrePage: BlitzPage = () => {
  const router = useRouter()
  const [createGenreMutation] = useMutation(createGenre)

  return (
    <div>
      <h1>Create New Genre</h1>

      <GenreForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const genre = await createGenreMutation({ data: { name: "Action" } })
            alert("Success!" + JSON.stringify(genre))
            router.push(`/genres/${genre.id}`)
          } catch (error) {
            alert("Error creating genre " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/genres">
          <a>Genres</a>
        </Link>
      </p>
    </div>
  )
}

NewGenrePage.getLayout = (page) => <Layout title={"Create New Genre"}>{page}</Layout>

export default NewGenrePage
