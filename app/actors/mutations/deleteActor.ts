import { Ctx } from "blitz"
import db, { ActorDeleteArgs } from "db"

type DeleteActorInput = Pick<ActorDeleteArgs, "where">

export default async function deleteActor({ where }: DeleteActorInput, ctx: Ctx) {
  ctx.session.authorize()

  const actor = await db.actor.delete({ where })

  return actor
}
