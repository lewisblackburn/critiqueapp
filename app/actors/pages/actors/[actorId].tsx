import deleteActor from "app/actors/mutations/deleteActor"
import getActor from "app/actors/queries/getActor"
import { Loading } from "app/components/Loading"
import Layout from "app/layouts/Layout"
import { BlitzPage, Link, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const Actor = () => {
  const router = useRouter()
  const actorId = useParam("actorId", "number")
  const [actor] = useQuery(getActor, { where: { id: actorId } })
  const [deleteActorMutation] = useMutation(deleteActor)

  if (actor) {
    return (
      <div>
        <h1>Actor {actor.id}</h1>
        <pre>{JSON.stringify(actor, null, 2)}</pre>

        <Link href={`/actors/${actor.id}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteActorMutation({ where: { id: actor.id } })
              router.push("/actors")
            }
          }}
        >
          Delete
        </button>
      </div>
    )
  } else return null
}

const ShowActorPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/actors">
          <a>Actors</a>
        </Link>
      </p>

      <Suspense fallback={<Loading />}>
        <Actor />
      </Suspense>
    </div>
  )
}

ShowActorPage.getLayout = (page) => <Layout title={"Actor"}>{page}</Layout>

export default ShowActorPage
