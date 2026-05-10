import { useGetAllMoviesQuery, useGetRandomMoviesQuery, useGetNewMoviesQuery, useGetTopMoviesQuery } from "../../redux/api/movie"
import { useFetchGenreQuery } from "../../redux/api/genre"
import MovieCard from "./MovieCard"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import banner from "../../asstes/banner.jpg"
import { setFilterdMovie, setMoviesFilter, setMoviesYears, setUniqueYears } from "../../redux/features/movies/movieSlice"

const AllMovies = () => {
    const dispatch = useDispatch()
    const { data } = useGetAllMoviesQuery()
    const { data: newMovies } = useGetNewMoviesQuery()
    const { data: genres } = useFetchGenreQuery()
    const { data: randomMovies } = useGetRandomMoviesQuery()
    const { data: topMovies } = useGetTopMoviesQuery()

    const { moviesFilter, filterdMovies } = useSelector((state) => state.movies)
    console.log(moviesFilter)

    const movieYears = data?.map((movie) => movie.year)
    const uniqueYear = Array.from(new Set(movieYears))

    useEffect(() => {
        dispatch(setFilterdMovie(data || []));
        dispatch(setMoviesYears(movieYears))
        dispatch(setUniqueYears(uniqueYear))
    }, [data, dispatch])

    const handleGenreClick = (genreId) => {
        const filterByGenre = data.filter((movie) => movie.genre === genreId)
        dispatch(setFilterdMovie(filterByGenre))
    }

    const handleSarchChange = (e) => {
        dispatch(setMoviesFilter({ searchTerm: e.target.value }));

        const filterdMovies = data.filter((movie) => movie.name.toLowerCase().includes(e.target.value.toLowerCase()))

        dispatch(setFilterdMovie(filterdMovies))
    }
    const handleYearChange = (year) => {
        const filterByYear = data.filter(movie => movie.year === +year)
        dispatch(setFilterdMovie(filterByYear))
    }
    const handleSortChange = (sortOption) => {
        switch (sortOption) {
            case "newMovies":
                dispatch(setFilterdMovie(newMovies))
                break;
            case "topMovies":
                dispatch(setFilterdMovie(topMovies))
                break;
            case "randomMovies":
                dispatch(setFilterdMovie(randomMovies))
                break;

            default:
                dispatch(setFilterdMovie([]))
                break;
        }
    }
    return (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -translate-y-[5rem]">
            <section>
                <div className="relative h-[43rem] w-[99vw] mb-10 flex items-center justify-center bg-cover"
                    style={{ backgroundImage: `url(${banner})` }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>

                    <div className="relative z-10 text-center px-4">
                        <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter text-white">
                            THE <span className="text-emerald-500">MOVIES</span> HUB
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-light tracking-wide">
                            Cinematic Odyssey: Unveiling the Magic of Movies
                        </p>
                    </div>
                    
                    <section className="absolute bottom-[1rem]">
                        <input type="text" className="w-full h-[4rem] bg-zinc-950 border border-zinc-800 focus:border-emerald-500 text-white px-6 outline-none rounded-xl transition-all duration-300 placeholder:text-zinc-600" placeholder="Search Movie" value={moviesFilter.searchTerm} onChange={handleSarchChange} />

                        <section className="sorts-container mt-[2rem] ml-[10rem] w-[30rem]">
                            <select className="border text-black bg-white border-zinc-800 p-3 rounded-lg outline-none cursor-pointer " value={moviesFilter.selectedGenre} onChange={(e) => handleGenreClick(e.target.value)}>
                                <option value="">Genres</option>
                                {genres?.map((genre) => (
                                    <option value={genre._id} key={genre._id}>{genre.name}</option>
                                ))}
                            </select>

                            <select className="border ml-5 text-black bg-white border-zinc-800 p-3 rounded-lg outline-none cursor-pointer " value={moviesFilter.selectedYear} onChange={(e) => handleYearChange(e.target.value)}>
                                <option value="">Year</option>
                                {uniqueYear?.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>

                            <select className="border ml-5 text-black bg-white border-zinc-800 p-3 rounded-lg outline-none cursor-pointer" value={moviesFilter.selectedSorts} onChange={(e) => handleSortChange(e.target.value)}>
                                <option value="">Sort By</option>
                                <option value="newMovies">New Movies</option>
                                <option value="topMovies">Top Movies</option>
                                <option value="randomMovies">Random Movies</option>
                            </select>
                        </section>
                    </section>
                </div>
                <section className="mt-[10rem] w-screen flex justify-center items-center flex-wrap">
                    {filterdMovies?.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </section>
            </section>
        </div>
    )
}

export default AllMovies





// return (
//   <div className="bg-zinc-950 min-h-screen text-white">
//     <section>
//       {/* Hero Banner Section */}
//       <div
//         className="relative h-[45rem] w-full flex items-center justify-center bg-cover bg-center"
//         style={{ backgroundImage: `url(${banner})` }}
//       >
//         {/* Darker, more cinematic overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/60 to-zinc-950"></div>

//         <div className="relative z-10 text-center px-4">
//           <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter text-white">
//             THE <span className="text-emerald-500">MOVIES</span> HUB
//           </h1>
//           <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-light tracking-wide">
//             Cinematic Odyssey: Unveiling the Magic of Movies
//           </p>
//         </div>

//         {/* Floating Search & Filter Bar */}
//         <section className="absolute bottom-[-2rem] z-20 w-full max-w-[60rem] px-4">
//           <div className="bg-zinc-900/80 backdrop-blur-xl p-6 rounded-2xl border border-zinc-800 shadow-2xl">
//             {/* Search Input */}
//             <div className="relative group mb-4">
//               <input
//                 type="text"
//                 className="w-full h-[4rem] bg-zinc-950 border border-zinc-800 focus:border-emerald-500 text-white px-6 outline-none rounded-xl transition-all duration-300 placeholder:text-zinc-600"
//                 placeholder="Search for a cinematic masterpiece..."
//                 value={moviesFilter.searchTerm}
//                 onChange={handleSarchChange}
//               />
//               <div className="absolute right-6 top-1/2 -translate-y-1/2 text-emerald-500/50 group-focus-within:text-emerald-500">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//             </div>

//             {/* Dropdown Filters */}
//             <div className="flex flex-wrap gap-4 justify-center md:justify-start">
//               <select
//                 className="bg-zinc-950 border border-zinc-800 text-zinc-300 p-3 rounded-lg outline-none focus:border-emerald-500 transition-colors cursor-pointer text-sm"
//                 value={moviesFilter.selectedGenre}
//                 onChange={(e) => handleGenreClick(e.target.value)}
//               >
//                 <option value="">All Genres</option>
//                 {genres?.map((genre) => (
//                   <option value={genre._id} key={genre._id}>{genre.name}</option>
//                 ))}
//               </select>

//               <select
//                 className="bg-zinc-950 border border-zinc-800 text-zinc-300 p-3 rounded-lg outline-none focus:border-emerald-500 transition-colors cursor-pointer text-sm"
//                 value={moviesFilter.selectedYear}
//                 onChange={(e) => handleYearChange(e.target.value)}
//               >
//                 <option value="">Release Year</option>
//                 {uniqueYear?.map((year) => (
//                   <option key={year} value={year}>{year}</option>
//                 ))}
//               </select>

//               <select
//                 className="bg-zinc-950 border border-zinc-800 text-zinc-300 p-3 rounded-lg outline-none focus:border-emerald-500 transition-colors cursor-pointer text-sm"
//                 value={moviesFilter.selectedSorts}
//                 onChange={(e) => handleSortChange(e.target.value)}
//               >
//                 <option value="">Sort By</option>
//                 <option value="newMovies">Newest First</option>
//                 <option value="topMovies">Top Rated</option>
//                 <option value="randomMovies">Discover Random</option>
//               </select>
//             </div>
//           </div>
//         </section>
//       </div>

//       {/* Movies Grid */}
//       <section className="mt-[8rem] pb-20 container mx-auto px-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {filterdMovies?.map((movie) => (
//             <MovieCard key={movie._id} movie={movie} />
//           ))}
//         </div>
//       </section>
//     </section>
//   </div>
// );