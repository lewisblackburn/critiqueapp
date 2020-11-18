import { Ctx } from "blitz"
import db, { ActorCreateArgs } from "db"

type CreateActorInput = Pick<ActorCreateArgs, "data">
export default async function createActor({ data }: CreateActorInput, ctx: Ctx) {
  ctx.session.authorize()

  const actor = await db.actor.create({ data })

  return actor
}
