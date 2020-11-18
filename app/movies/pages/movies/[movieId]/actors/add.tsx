import ActorSearchForm from "app/actors/components/ActorSearchForm"
import getActorsFromSearch from "app/actors/queries/getActorsFromSearch"
import Layout from "app/layouts/Layout"
import createActorOnMovie from "app/movies/mutations/createActorOnMovie"
import { BlitzPage, Link, useMutation, useParam, useQuery } from "blitz"
import { useState } from "react"
import { Img } from "react-image"

const NewActorPage: BlitzPage = () => {
  const movieId = useParam("movieId", "number")
  const [createActorOnMovieMutation] = useMutation(createActorOnMovie)
  const [search, setSearch] = useState()
  const [role, setRole] = useState()
  const [actors] = useQuery(getActorsFromSearch, {
    search: search || "Null",
    take: 10,
  })

  if (actors) {
    return (
      <div className="container mx-auto">
        <ActorSearchForm
          initialValues={{}}
          onSubmit={async (event) => {
            const { search }: any = event
            setSearch(search)
          }}
        />
        {actors.actors.length > 0 ? (
          <div className="grid grid-flow-row grid-cols-4 gap-5 mt-10">
            {actors.actors.map((actor, i) => (
              <div key={i} className="flex flex-col shadow-lg bg-woodsmoke-500 rounded mb-10">
                <a className="flex flex-col cursor-pointer">
                  <Img className="h-64" src={actor.image || "null"} alt="" />
                  <span className="m-4 font-bold">{actor.name}</span>
                </a>
                <input
                  className="w-full bg-woodsmoke-700 appearance-none p-4 font-light leading-tight focus:outline-none my-3"
                  onChange={(e: any) => setRole(e.target.value)}
                  name="role"
                  placeholder="role"
                />
                <button
                  className="button"
                  onClick={async () => {
                    await createActorOnMovieMutation({
                      data: {
                        actor: {
                          connect: {
                            id: actor.id,
                          },
                        },
                        movie: {
                          connect: {
                            id: movieId,
                          },
                        },
                        role: role || "null",
                      },
                    })
                  }}
                >
                  add
                </button>
              </div>
            ))}
          </div>
        ) : (
          <Link href="/actors/new">
            <a>There are no actors with that name, create one?</a>
          </Link>
        )}
      </div>
    )
  } else return null
}

NewActorPage.getLayout = (page) => <Layout title={"Create New Actor"}>{page}</Layout>

export default NewActorPage
