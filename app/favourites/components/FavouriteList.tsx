import { Link } from "blitz"
import { Img } from "react-image"

export const FavouriteList = ({ favourites }) => {
  return (
    <div className="grid grid-flow-row grid-cols-4 gap-5 py-5">
      {favourites.map((favourite, i) => (
        <Link key={i} href={`movies/${favourite.movieId}`}>
          <a>
            <Img className="rounded" alt={favourite.movie.art} src={favourite.movie.art} />
          </a>
        </Link>
      ))}
    </div>
  )
}
