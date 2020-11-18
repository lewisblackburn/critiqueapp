import { Link } from "blitz"

export const ReviewList = ({ reviews }) => {
  return (
    <>
      {reviews.map((review, i) => (
        <Link key={i} href={`/reviews/${review.id}`}>
          <a>
            <div className="flex mb-10 bg-woodsmoke-500 rounded">
              <div className="m-5">
                <div className="flex items-center">
                  <h1 className="font-semibold text-xl">{review.title}</h1>
                  <span className="ml-1">by {review.by}</span>
                  <span className="bg-woodsmoke-900 font-bold text-xs self-center px-3 py-1 mx-3 rounded">
                    {review.rating.value}
                  </span>
                </div>
                <p className="mt-2">{review.content}</p>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </>
  )
}
