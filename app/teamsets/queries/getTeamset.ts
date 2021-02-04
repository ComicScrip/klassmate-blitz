import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetTeamsetInput = Pick<Prisma.FindFirstTeamsetArgs, "where">

export default async function getTeamset({ where }: GetTeamsetInput, ctx: Ctx) {
  ctx.session.authorize()

  const teamset = await db.teamset.findFirst({
    where,
    include: { teams: { include: { members: true } } },
  })

  if (!teamset) throw new NotFoundError()

  return teamset
}
