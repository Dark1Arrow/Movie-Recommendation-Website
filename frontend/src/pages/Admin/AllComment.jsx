import { useDeleteCommentMutation, useGetAllMoviesQuery,  } from "../../redux/api/movie"
import { toast } from "react-toastify"
import Sidebar from "./Dashboard/Sidebar/Sidebar"
const AllComment = () => {
    const {data: movie, refetch} = useGetAllMoviesQuery()
    const [deleteComment] = useDeleteCommentMutation()

    const handleDeleteComment = async (movieId , reviewId) =>{
        try {
            await deleteComment({movieId,reviewId})
            console.log("hey")
            toast.success("Comment deleted successfully ")
            refetch()
        } catch (error) {
            toast.error("Error in Deleteing comment : " , error)
        }
    }

  return (
    <div className="bg-black text-white font-mono  py-10">
      <Sidebar/>
      {movie?.map((m) => (
        <section key={m._id} className="flex flex-col items-center px-4">
          <div className="w-full max-w-2xl mb-6 border-b border-emerald-500/10 pb-2">
            <span className="text-[#c2c2c2] text-lg uppercase font-semibold">
             {m?.name}
            </span>
          </div>

          {m?.reviews.length === 0 && (
            <p className="text-zinc-600 italic text-sm">No transmissions found for this record.</p>
          )}

          {m?.reviews.map((review) => (
            <div 
              key={review._id} 
              className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-6 w-full max-w-2xl mb-6 group hover:border-emerald-500/30 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <strong className="text-emerald-500 uppercase tracking-tighter text-lg">
                    {review.name}
                  </strong>
                  <p className="text-zinc-600 text-[10px] mt-1 tracking-widest uppercase">
                    Timestamp: {review.createdAt.substring(0, 10)}
                  </p>
                </div>
                
                <button 
                  onClick={() => handleDeleteComment(m._id, review._id)} 
                  className="text-zinc-700 hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors border border-zinc-800 hover:border-red-500/50 px-3 py-1 rounded"
                >
                Delete
                </button>
              </div>

              <div className="relative">
                <p className="text-zinc-300 leading-relaxed pl-4 border-l border-emerald-500/50">
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

export default AllComment
