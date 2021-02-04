import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getTeamset from "app/teamsets/queries/getTeamset"
import deleteTeamset from "app/teamsets/mutations/deleteTeamset"
import TeamCard from "app/teams/components/TeamCard"

export const Teamset = () => {
  const router = useRouter()
  const teamsetId = useParam("teamsetId", "number")
  const [teamset] = useQuery(getTeamset, { where: { id: teamsetId } })
  const [deleteTeamsetMutation] = useMutation(deleteTeamset)

  return (
    <div>
      <h1>Teamset {teamset.id}</h1>
      <div className="flex space-x-3">
        {teamset.teams.map((t) => {
          return <TeamCard name={t.name} members={t.members} />
        })}
      </div>

      <Link href={`/teamsets/${teamset.id}/edit`}>
        <a className="bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6">
          Edit
        </a>
      </Link>

      <button
        className="bg-red-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-red-600 mr-6"
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteTeamsetMutation({ where: { id: teamset.id } })
            router.push("/teamsets")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowTeamsetPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/teamsets">
          <a>Teamsets</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Teamset />
      </Suspense>
    </div>
  )
}

ShowTeamsetPage.getLayout = (page) => <Layout title={"Teamset"}>{page}</Layout>

export default ShowTeamsetPage
