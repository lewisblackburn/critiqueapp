import { Link } from "blitz"
import { Img } from "react-image"

export const MovieList = ({ movies }) => {
  if (movies) {
    return (
      <div className="grid grid-flow-row grid-cols-5 gap-5 py-5">
        {movies.map((movie, i) => (
          <Link key={i} href={`movies/${movie.id}`}>
            <a>
              <Img className="rounded" alt={movie.title} src={movie.art} />
            </a>
          </Link>
        ))}
      </div>
    )
  } else return null
}
