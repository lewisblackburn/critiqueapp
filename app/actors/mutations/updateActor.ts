import { Ctx } from "blitz"
import db, { ActorUpdateArgs } from "db"

type UpdateActorInput = Pick<ActorUpdateArgs, "where" | "data">

export default async function updateActor({ where, data }: UpdateActorInput, ctx: Ctx) {
  ctx.session.authorize()

  const actor = await db.actor.update({ where, data })

  return actor
}
