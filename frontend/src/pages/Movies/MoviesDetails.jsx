import { useState } from "react"
import { Link, parsePath, useParams } from "react-router"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useGetSpecificMovieQuery, useAddMovieReviewsMutation } from "../../redux/api/movie"
import MovieTabs from "./MovieTabs"

const MoviesDetails = () => {
  const { id: movieId } = useParams()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId)
  const { userInfo } = useSelector((state) => state.auth)
  const [createReview, { isLoading: loadingMovieReview }] = useAddMovieReviewsMutation()

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      await createReview({
        id: movieId,
        rating,
        comment
      }).unwrap()

      refetch()

      toast.success("Review created successfully")

    } catch (error) {
      console.log(error.data.mes)
      toast.error(error.data.message || error.data)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 ">

      <nav className="max-w-6xl mx-auto mb-10">
        <Link
          to='/'
          className="text-emerald-500 hover:text-emerald-400 border border-emerald-500 px-4 py-2 rounded transition-all"
        >
          &larr; Back to Library
        </Link>
      </nav>

      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          <div className="flex justify-center bg-zinc-900 p-4 border border-zinc-800 rounded-lg">
            <img
              src={movie?.image}
              alt={movie?.name}
              className="rounded shadow-2xl max-h-[500px] object-cover"
            />
          </div>

          {/* Info Section */}
          <section>
            <div className="border-b border-emerald-500/30 pb-4 mb-6">
              <h1 className="text-6xl font-black uppercase tracking-tighter text-emerald-500">
                {movie?.name}
              </h1>
              <p className="text-xl text-zinc-500 mt-2">{movie?.year}</p>
            </div>

            <p className="text-zinc-400 leading-relaxed text-lg mb-8">
              {movie?.detail}
            </p>

            {/* Cast List */}
            <div className="bg-zinc-900/50 p-6 border-l-4 border-emerald-500">
              <h3 className="text-sm uppercase tracking-widest text-emerald-500 mb-4">Top Cast</h3>
              <div className="flex flex-wrap gap-4">
                {movie?.cast.map((member, index) => (
                  <span
                    key={index}
                    className="bg-zinc-800 px-3 py-1 text-sm border border-zinc-700 text-zinc-300"
                  >
                    {member}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Tabs Section */}
        <div className="mt-16 pt-10 border-t border-zinc-900">
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
          />
        </div>
      </main>
    </div>
  );

}

export default MoviesDetails
