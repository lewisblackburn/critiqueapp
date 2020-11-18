import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstActorArgs } from "db"

type GetActorInput = Pick<FindFirstActorArgs, "where">

export default async function getActor({ where }: GetActorInput, ctx: Ctx) {
  ctx.session.authorize()

  const actor = await db.actor.findFirst({ where })

  if (!actor) throw new NotFoundError()

  return actor
}
