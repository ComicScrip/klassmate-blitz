import { ReactNode } from "react"
import { Head } from "blitz"
import Header from "./Header"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "Klassmate"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="p-6">{children}</main>
    </>
  )
}

export default Layout
