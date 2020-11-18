import { Header } from "app/components/Header"
import { Loading } from "app/components/Loading"
import { Head } from "blitz"
import { ReactNode, Suspense } from "react"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <div className="bg-woodsmoke-900 text-woodsmoke-50 h-screen overflow-scroll">
      <Head>
        <title>{title || "critique"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<Loading />}>
        <Header />
        {children}
      </Suspense>
    </div>
  )
}

export default Layout
