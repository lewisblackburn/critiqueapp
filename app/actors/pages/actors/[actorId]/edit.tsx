import ActorForm from "app/actors/components/ActorSearchForm"
import updateActor from "app/actors/mutations/updateActor"
import getActor from "app/actors/queries/getActor"
import { Loading } from "app/components/Loading"
import Layout from "app/layouts/Layout"
import { BlitzPage, Link, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const EditActor = () => {
  const router = useRouter()
  const actorId = useParam("actorId", "number")
  const [actor, { setQueryData }] = useQuery(getActor, { where: { id: actorId } })
  const [updateActorMutation] = useMutation(updateActor)

  if (actor) {
    return (
      <div>
        <h1>Edit Actor {actor.id}</h1>
        <pre>{JSON.stringify(actor)}</pre>

        <ActorForm
          initialValues={actor}
          onSubmit={async () => {
            try {
              const updated = await updateActorMutation({
                where: { id: actor.id },
                data: { name: "MyNewName" },
              })
              await setQueryData(updated)
              alert("Success!" + JSON.stringify(updated))
              router.push(`/actors/${updated.id}`)
            } catch (error) {
              console.log(error)
              alert("Error creating actor " + JSON.stringify(error, null, 2))
            }
          }}
        />
      </div>
    )
  } else return null
}

const EditActorPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <EditActor />
      </Suspense>

      <p>
        <Link href="/actors">
          <a>Actors</a>
        </Link>
      </p>
    </div>
  )
}

EditActorPage.getLayout = (page) => <Layout title={"Edit Actor"}>{page}</Layout>

export default EditActorPage
