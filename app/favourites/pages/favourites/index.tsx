import { Loading } from "app/components/Loading"
import { FavouriteList } from "app/favourites/components/FavouriteList"
import getFavourites from "app/favourites/queries/getFavourites"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import Layout from "app/layouts/Layout"
import { BlitzPage, usePaginatedQuery, useRouter } from "blitz"
import { Suspense } from "react"

const ITEMS_PER_PAGE = 8

export const FavouritesList = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const page = Number(router.query.page) || 0
  const [{ favourites, hasMore }] = usePaginatedQuery(getFavourites, {
    where: { userId: currentUser?.id },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  if (favourites) {
    return (
      <div>
        <FavouriteList favourites={favourites} />
        <button disabled={page === 0} onClick={goToPreviousPage}>
          Previous
        </button>
        <button disabled={!hasMore} onClick={goToNextPage}>
          Next
        </button>
      </div>
    )
  }
  return null
}

const FavouritesPage: BlitzPage = () => {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<Loading />}>
        <FavouritesList />
      </Suspense>
    </div>
  )
}

FavouritesPage.getLayout = (page) => <Layout title={"Favourites"}>{page}</Layout>

export default FavouritesPage
