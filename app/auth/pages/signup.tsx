import { SignupForm } from "app/auth/components/SignupForm"
import Layout from "app/layouts/Layout"
import { BlitzPage, useRouter } from "blitz"
import React from "react"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div className="page container mx-auto ">
      <div className="flex justify-center py-40">
        <SignupForm onSuccess={() => router.push("/")} />
      </div>
    </div>
  )
}

SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
