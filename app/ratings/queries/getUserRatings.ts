import db, { FindFirstUserArgs } from "db"

type GetUserInput = Pick<FindFirstUserArgs, "where">

export default async function getUserRatings({ where }: GetUserInput) {
  const user = await db.user.findFirst({
    where,
    include: { ratings: { include: { movie: {} } } },
  })
  // if (!user) throw new NotFoundError()

  return user
}
