import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createTeamset from "app/teamsets/mutations/createTeamset"
import TeamsetForm from "app/teamsets/components/TeamsetForm"

const NewTeamsetPage: BlitzPage = () => {
  const router = useRouter()
  const [createTeamsetMutation] = useMutation(createTeamset)

  return (
    <div>
      <h1>Create New Teamset</h1>

      <TeamsetForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const teamset = await createTeamsetMutation()
            alert("Success!" + JSON.stringify(teamset))
            router.push(`/teamsets/${teamset.id}`)
          } catch (error) {
            alert("Error creating teamset " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/teamsets">
          <a>Teamsets</a>
        </Link>
      </p>
    </div>
  )
}

NewTeamsetPage.getLayout = (page) => <Layout title={"Create New Teamset"}>{page}</Layout>

export default NewTeamsetPage
