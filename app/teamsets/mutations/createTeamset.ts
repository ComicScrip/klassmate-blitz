import { Ctx } from "blitz"
import db, { Prisma } from "db"
import lodash from "lodash"

export default async function createTeamset(_, ctx: Ctx) {
  // ctx.session.authorize()

  const users = lodash.shuffle(await db.user.findMany())

  const usersPerGroup = 2
  const groups: Array<Array<Prisma.UserMaxAggregateInputType>> = []
  const nbGroups = Math.floor(users.length / usersPerGroup)
  let currentGroupIndex = 0

  for (let i = 0; i < users.length; i += 1) {
    const currentUser = users[i]
    if (!groups[currentGroupIndex]) {
      groups[currentGroupIndex] = []
    }

    groups[currentGroupIndex].push(currentUser)
    if (currentGroupIndex < nbGroups - 1) {
      currentGroupIndex += 1
    } else {
      currentGroupIndex = 0
    }
  }
  const teams: any[] = []
  for (let group of groups) {
    teams.push(
      await db.team.create({
        data: {
          name: `team`,
          members: {
            connect: group.map((u) => {
              return { id: u.id } as any
            }),
          },
        },
      })
    )
  }

  const teamset = await db.teamset.create({
    data: { name: "teamset", teams: { connect: teams.map((t) => ({ id: t.id })) as any } },
  })

  return teamset
}
