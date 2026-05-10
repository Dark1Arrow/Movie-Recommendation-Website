import { Link } from "react-router-dom"
import { useGetAllMoviesQuery } from "../../redux/api/movie"

const AdminMovieList = () => {
    const { data: movies } = useGetAllMoviesQuery()
      return (
    <div className="min-h-screen bg-black text-white font-mono  p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-12 border-b border-emerald-500/20 pb-6">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-emerald-500">
              System <span className="text-white">Archive</span>
            </h1>
            <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">
              Database Query: All Records
            </p>
          </div>
          <div className="bg-emerald-500 text-black px-4 py-1 text-sm font-bold rounded-sm">
            {movies?.length} ENTRIES FOUND
          </div>
        </header>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {movies?.map((movie) => (
            <div 
              key={movie._id} 
              className="bg-zinc-900/40 border border-zinc-800 rounded-lg overflow-hidden group hover:border-emerald-500/50 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={movie.image} 
                  alt={movie.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2 truncate group-hover:text-emerald-400 transition-colors">
                  {movie.name}
                </h2>
                <p className="text-zinc-400 text-sm line-clamp-3 mb-6 h-12 leading-relaxed">
                  {movie.detail}
                </p>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
                  <Link 
                    to={`/admin/movies/update/${movie._id}`} 
                    className="inline-block bg-zinc-800 hover:bg-emerald-500 text-zinc-300 hover:text-black px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-sm border border-zinc-700 hover:border-emerald-500"
                  >
                    Edit Record 
                  </Link>
                  <span className="text-[10px] text-zinc-600 font-bold uppercase">
                    ID: {movie._id.substring(0, 8)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminMovieList


// return (
//         <div className="container px-[9rem]">
//             <div className="flex flex-col md:flex-row">
//                 <div className="p-3">
//                     <div className="ml-[2rem] text-xl font-bold h-12 ">
//                          All Movies ({movies?.length})
//                     </div>

//                     <div className="flex flex-wrap justify-around items-center p-[2rem]">
//                         {movies?.map((movie) => (
//                             <Link to={ `/admin/movies/update/${movie._id}`} className="bg-black mb-4 overflow-hidden">
//                                 <div className="flex flex-col">
//                                     <div className="max-w-sw m-[2rem] rounded overflow-hidden shadow-lg" key={movie._id}>
//                                         <img src={movie.image} alt={movie.name} className=" max-w-[40rem] max-h-[50rem] object-cover m-auto" />
//                                         <div className="px-6 py-4 border border-gray-400">
//                                         <div className="font-bold text-xl mb-2 max-w-70">{movie.name}</div>
//                                     </div>
//                                     <p className="text-gray-700 max-w-70 text-base">
//                                         {movie.detail}
//                                     </p>
//                                     <div className="mt-[2rem] mb-[1rem]">
//                                         <Link to={`/admin/movies/update/${movie._id}`} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
//                                         Update Movie
//                                          </Link>
//                                     </div>
                                    
//                                     </div>
//                                 </div>
//                             </Link>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )