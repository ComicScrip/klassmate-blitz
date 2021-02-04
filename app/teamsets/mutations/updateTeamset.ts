import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateTeamsetInput = Pick<Prisma.TeamsetUpdateArgs, "where" | "data">

export default async function updateTeamset({ where, data }: UpdateTeamsetInput, ctx: Ctx) {
  ctx.session.authorize()

  const teamset = await db.teamset.update({ where, data })

  return teamset
}
