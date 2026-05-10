import { useState } from "react"
import { useGetNewMoviesQuery, useGetTopMoviesQuery, useGetRandomMoviesQuery } from "../../redux/api/movie.js"
import { useFetchGenreQuery } from "../../redux/api/genre.js"
import SliderUtils from "../../component/SliderUtils"

const MoviesContainerPage = () => {
    const { data } = useGetRandomMoviesQuery()
    const { data: topMovies } = useGetTopMoviesQuery()
    const { data: randomMovies } = useGetRandomMoviesQuery()
    const { data: genres } = useFetchGenreQuery()

    console.log( "top movie: ",topMovies)
    console.log("random movie: ",randomMovies)
    console.log("genres : ",genres)
    console.log("data: ",data)

    const [selectedGenre, setSelectedGenre] = useState(null)

    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId)
    }

    const filterdMovies = data?.filter((movie) => selectedGenre === null || movie.genre === selectedGenre);

    return (
        <div className="flex flex-col lg:flex-row lg:justify-around items-center bg-zinc-950 text-white p-6 lg:p-10">
            <nav className=" flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible py-4 lg:pr-8 lg:border-r border-zinc-800 scrollbar-hide">
                {genres?.map((genre) => (
                    <button key={genre._id} className={`transition-all duration-300 px-6 py-2 rounded-full lg:rounded-lg  font-medium  ${selectedGenre === genre._id ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]" : "text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900"
              }`} onClick={() => handleGenreClick(genre._id)}>{genre.name}</button>
                ))}
            </nav>
            <section className=" flex flex-col justify-center items-center w-[full] lg:w-auto">
                <div className=" w-full lg:w-[70rem] mr-0 md:mr-2">
                    <h1 className="uppercase tracking-[0.2em] mb-4 text-emerald-500 transition-colors">Choose For You</h1>
                    <SliderUtils data={randomMovies} />
                </div>
                <div className=" w-full lg:w-[70rem] mr-0 md:mr-2">
                    <h1 className="uppercase tracking-[0.2em] mb-4 text-emerald-500 transition-colors">Top Movie</h1>
                    <SliderUtils data={topMovies} />
                </div>

                <div className=" w-full lg:w-[70rem] mr-0 md:mr-2 group">
                    <h1 className="text-zinc-500 uppercase tracking-[0.2em] mb-4 group-hover:text-emerald-500 transition-colors">Choose Movie</h1>
                    <SliderUtils data={filterdMovies} />
                </div>
            </section>
        </div>
    )
}

export default MoviesContainerPage




// return (
//   <div className="flex flex-col lg:flex-row min-h-screen bg-zinc-950 text-white p-6 lg:p-10">
//     {/* Sidebar Navigation */}
//     <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible py-4 lg:pr-8 lg:border-r border-zinc-800 scrollbar-hide">
//       <div className="flex flex-row lg:flex-col gap-2">
//         {genres?.map((genre) => (
//           <button
//             key={genre._id}
//             className={`transition-all duration-300 px-6 py-2 rounded-full lg:rounded-lg text-sm font-medium whitespace-nowrap
//               ${selectedGenre === genre._id 
//                 ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
//                 : "text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900"
//               }`}
//             onClick={() => handleGenreClick(genre._id)}
//           >
//             {genre.name}
//           </button>
//         ))}
//       </div>
//     </nav>

//     {/* Content Section */}
//     <section className="flex-1 lg:pl-12 mt-8 lg:mt-0">
//       <div className="max-w-[85rem] mx-auto space-y-12">
        
//         {/* Row 1: Personalized */}
//         <div className="group">
//           <h2 className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-4 group-hover:text-emerald-500 transition-colors">
//             Curated For You
//           </h2>
//           <div className="rounded-xl overflow-hidden">
//              <SliderUtils data={randomMovies} />
//           </div>
//         </div>

//         {/* Row 2: Charts */}
//         <div className="group">
//           <h2 className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-4 group-hover:text-emerald-500 transition-colors">
//             Trending Now
//           </h2>
//           <div className="rounded-xl overflow-hidden">
//             <SliderUtils data={topMovies} />
//           </div>
//         </div>

//         {/* Row 3: Filtered */}
//         <div className="group">
//           <h2 className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-4 group-hover:text-emerald-500 transition-colors">
//             Discover
//           </h2>
//           <div className="rounded-xl overflow-hidden">
//             <SliderUtils data={filterdMovies} />
//           </div>
//         </div>

//       </div>
//     </section>
//   </div>
// );