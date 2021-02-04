import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteTeamsetInput = Pick<Prisma.TeamsetDeleteArgs, "where">

export default async function deleteTeamset({ where }: DeleteTeamsetInput, ctx: Ctx) {
  ctx.session.authorize()

  const teamset = await db.teamset.delete({ where })

  return teamset
}
