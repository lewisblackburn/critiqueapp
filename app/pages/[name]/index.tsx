import logout from "app/auth/mutations/logout"
import { Loading } from "app/components/Loading"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import Layout from "app/layouts/Layout"
import getUser from "app/users/queries/getUser"
import { BlitzPage, useMutation, useParam, useQuery } from "blitz"
import { Suspense } from "react"

export const User = ({}) => {
  const name = useParam("name", "string")
  const currentUser = useCurrentUser()
  const [user] = useQuery(getUser, { where: { name } })
  const [logoutMutation] = useMutation(logout)

  if (user) {
    return (
      <div className="container mx-auto">
        <div className="flex items-center pt-10 pb-20">
          <div className="grid gap-5">
            <span className="font-bold ">username: {user?.name}</span>
            <span className="font-bold ">role: {user?.role}</span>
            <span className="font-bold ">joined: {user?.createdAt.toDateString()}</span>
          </div>
        </div>
        {user?.id === currentUser?.id && (
          <button
            className="button bg-woodsmoke-500 px-10 py-4 rounded"
            onClick={async () => {
              await logoutMutation()
            }}
          >
            Logout
          </button>
        )}
      </div>
    )
  } else return null
}

const ProfilePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <User />
      </Suspense>
    </div>
  )
}

ProfilePage.getLayout = (page) => <Layout title={"Movie"}>{page}</Layout>

export default ProfilePage
