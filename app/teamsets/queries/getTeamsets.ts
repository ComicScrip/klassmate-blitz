import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetTeamsetsInput = Pick<Prisma.FindManyTeamsetArgs, "where" | "orderBy" | "skip" | "take">

export default async function getTeamsets(
  { where, orderBy, skip = 0, take }: GetTeamsetsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const teamsets = await db.teamset.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.teamset.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    teamsets,
    nextPage,
    hasMore,
    count,
  }
}
