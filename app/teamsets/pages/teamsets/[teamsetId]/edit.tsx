import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getTeamset from "app/teamsets/queries/getTeamset"
import updateTeamset from "app/teamsets/mutations/updateTeamset"
import TeamsetForm from "app/teamsets/components/TeamsetForm"

export const EditTeamset = () => {
  const router = useRouter()
  const teamsetId = useParam("teamsetId", "number")
  const [teamset, { setQueryData }] = useQuery(getTeamset, { where: { id: teamsetId } })
  const [updateTeamsetMutation] = useMutation(updateTeamset)

  return (
    <div>
      <h1>Edit Teamset {teamset.id}</h1>
      <pre>{JSON.stringify(teamset)}</pre>

      <TeamsetForm
        initialValues={teamset}
        onSubmit={async () => {
          try {
            const updated = await updateTeamsetMutation({
              where: { id: teamset.id },
              data: { name: "MyNewName" },
            })
            await setQueryData(updated as any)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/teamsets/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error editing teamset " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditTeamsetPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTeamset />
      </Suspense>

      <p>
        <Link href="/teamsets">
          <a>Teamsets</a>
        </Link>
      </p>
    </div>
  )
}

EditTeamsetPage.getLayout = (page) => <Layout title={"Edit Teamset"}>{page}</Layout>

export default EditTeamsetPage
