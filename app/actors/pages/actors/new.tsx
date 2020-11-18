import ActorForm from "app/actors/components/ActorForm"
import createActor from "app/actors/mutations/createActor"
import Layout from "app/layouts/Layout"
import { BlitzPage, useMutation, useRouter } from "blitz"

const NewActorPage: BlitzPage = () => {
  const router = useRouter()
  const [createActorMutation] = useMutation(createActor)

  return (
    <div className="container mx-auto">
      <ActorForm
        initialValues={{}}
        onSubmit={async (event) => {
          const { image, name, age }: any = event
          try {
            const actor = await createActorMutation({
              data: {
                name,
                age: parseInt(age),
                image,
              },
            })
            alert("Success!" + JSON.stringify(actor))
            router.push(`/actors/${actor.id}`)
          } catch (error) {
            alert("Error creating actor " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

NewActorPage.getLayout = (page) => <Layout title={"Create New Actor"}>{page}</Layout>

export default NewActorPage
