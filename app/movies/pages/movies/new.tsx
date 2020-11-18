import Layout from "app/layouts/Layout"
import MovieForm from "app/movies/components/MovieForm"
import createMovie from "app/movies/mutations/createMovie"
import { BlitzPage, useMutation, useRouter } from "blitz"

const NewMoviePage: BlitzPage = () => {
  const router = useRouter()
  const [createMovieMutation] = useMutation(createMovie)

  return (
    <div className="container mx-auto">
      <MovieForm
        initialValues={{}}
        onSubmit={async (event) => {
          const {
            banner,
            art,
            title,
            age,
            release,
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
            const movie = await createMovieMutation({
              data: {
                banner,
                art,
                title,
                age,
                release,
                trailer,
                tagline,
                overview,
                runtime: parseInt(runtime),
                status,
                language,
                budget: parseInt(budget),
                revenue: parseInt(revenue),
                actors: {},
                genres: {},
                reivews: {},
              },
            })
            router.push(`/movies/${movie.id}`)
          } catch (error) {
            alert("Error creating movie " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

NewMoviePage.getLayout = (page) => <Layout title={"Create New Movie"}>{page}</Layout>

export default NewMoviePage
