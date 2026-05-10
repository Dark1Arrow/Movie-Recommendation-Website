import { Link } from "react-router-dom"

const MovieCard = ({movie}) => {
  return (
    <Link to={`/movies/${movie._id}`}>
    <div key={movie._id} className="relative group m-[2rem] overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 transition-all duration-500">
      
        <img src={movie.image} alt={movie.name}  className="w-[20rem] h-[15rem] object-cover transition duration-500 ease-in-out transform group-hover:scale-105 group-hover:opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 flex items-end p-6 opacity-0 translate-y-4 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
        <p className="text-emerald-400 text-lg font-semibold tracking-wide drop-shadow-md">
          {movie.name}
        </p>
      </div>
    </div>
      </Link>
  )
}

export default MovieCard

// return (
//   <div key={movie._id} className="relative group m-4 overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 transition-all duration-500">
//     <Link to={`/movies/${movie._id}`}>
//       {/* Image with a slight scale effect on hover */}
//       <img 
//         src={movie.image} 
//         alt={movie.name}  
//         className="w-[20rem] h-[15rem] object-cover transition duration-500 ease-in-out transform group-hover:scale-110 group-hover:opacity-40" 
//       />
      
//       {/* Overlay Gradient for better text readability */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//       {/* Movie Name */}
//       <div className="absolute inset-0 flex items-end p-6 opacity-0 translate-y-4 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
//         <p className="text-emerald-400 text-lg font-semibold tracking-wide drop-shadow-md">
//           {movie.name}
//         </p>
//       </div>
//     </Link>
//   </div>
// );