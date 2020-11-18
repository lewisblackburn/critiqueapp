import { Img } from "react-image"

export const ActorList = ({ movie }) => {
  return (
    <div className="grid grid-flow-row grid-cols-6 gap-5">
      {movie.actors?.map((actor, i) => (
        <div key={i} className="flex flex-col shadow-lg bg-woodsmoke-500 rounded mb-10">
          <Img className="h-64" src={actor.actor.image || "null"} alt="" />
          <div className="flex flex-col p-2">
            <span className="font-bold">{actor.actor.name}</span>
            <span>{actor.role}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
