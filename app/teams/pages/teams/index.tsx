import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getTeams from "app/teams/queries/getTeams"

const ITEMS_PER_PAGE = 100

export const TeamsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ teams, hasMore }] = usePaginatedQuery(getTeams, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            <Link href={`/teams/${team.id}`}>
              <a>{team.name}</a>
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

const TeamsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/teams/new">
          <a>Create Team</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <TeamsList />
      </Suspense>
    </div>
  )
}

TeamsPage.getLayout = (page) => <Layout title={"Teams"}>{page}</Layout>

export default TeamsPage
