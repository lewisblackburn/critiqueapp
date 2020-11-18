import { LoginForm } from "app/auth/components/LoginForm"
import Layout from "app/layouts/Layout"
import { BlitzPage, useRouter } from "blitz"
import React from "react"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div className="page container mx-auto ">
      <div className="flex justify-center py-40">
        <LoginForm onSuccess={() => router.push("/")} />
      </div>
    </div>
  )
}

LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
