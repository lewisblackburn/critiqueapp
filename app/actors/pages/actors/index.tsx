import getActors from "app/actors/queries/getActors"
import { Loading } from "app/components/Loading"
import Layout from "app/layouts/Layout"
import { BlitzPage, Link, usePaginatedQuery, useRouter } from "blitz"
import { Suspense } from "react"

const ITEMS_PER_PAGE = 100

export const ActorsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ actors, hasMore }] = usePaginatedQuery(getActors, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  if (actors) {
    return (
      <div>
        <ul>
          {actors.map((actor) => (
            <li key={actor.id}>
              <Link href={`/actors/${actor.id}`}>
                <a>{actor.name}</a>
              </Link>
            </li>
          ))}
        </ul>

        <button disabled={page === 0} onClick={goToPreviousPage}>
          Previous
        </button>
        <button disabled={!hasMore} onClick={goToNextPage}>
          Next
        </button>
      </div>
    )
  } else return null
}

const ActorsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/actors/new">
          <a>Create Actor</a>
        </Link>
      </p>

      <Suspense fallback={<Loading />}>
        <ActorsList />
      </Suspense>
    </div>
  )
}

ActorsPage.getLayout = (page) => <Layout title={"Actors"}>{page}</Layout>

export default ActorsPage
