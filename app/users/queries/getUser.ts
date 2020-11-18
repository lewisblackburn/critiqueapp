import db, { FindFirstUserArgs } from "db"

type GetUserInput = Pick<FindFirstUserArgs, "where">

export default async function getUser({ where }: GetUserInput) {
  const user = await db.user.findFirst({ where })
  // if (!user) throw new NotFoundError()

  return user
}
