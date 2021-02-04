import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getTeamsets from "app/teamsets/queries/getTeamsets"

const ITEMS_PER_PAGE = 100

export const TeamsetsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ teamsets, hasMore }] = usePaginatedQuery(getTeamsets, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {teamsets.map((teamset) => (
          <li key={teamset.id}>
            <Link href={`/teamsets/${teamset.id}`}>
              <a>{teamset.name}</a>
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
}

const TeamsetsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/teamsets/new">
          <a>Create Teamset</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <TeamsetsList />
      </Suspense>
    </div>
  )
}

TeamsetsPage.getLayout = (page) => <Layout title={"Teamsets"}>{page}</Layout>

export default TeamsetsPage
