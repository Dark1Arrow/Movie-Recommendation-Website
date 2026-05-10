import { useGetNewMoviesQuery } from "../../redux/api/movie"
import { Link } from "react-router"
import SliderUtils from "../../component/SliderUtils"

const Header = () => {
    const {data} = useGetNewMoviesQuery()
  return (
    <div className="flex flex-col mt-[2rem] ml-[2rem] bg-zinc-950 text-white md:flex-row justify-around items-center md:items-start">
      <nav className="w-full md:w-[10rem] ml-0 md:ml-2 mb-4 md:mb-0">
        <Link to={"/"}  className="group relative transition duration-300 ease-in-out block p-3 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900/50">Home</Link>
        <Link to={"/movies"}  className="group relative transition duration-300 ease-in-out block p-3 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900/50">Browse Movie</Link>
      </nav>
      <div className="w-full md:w-[70rem] mr-0 md:mr-2">
            <SliderUtils data={data} /> 
      </div>
    </div>
  )
}

export default Header



// return (
//   <div className="flex flex-col md:flex-row min-h-screen bg-zinc-950 text-white pt-8 px-6 lg:px-12">
//     {/* Left Navigation Sidebar */}
//     <nav className="w-full md:w-[12rem] flex flex-row md:flex-col gap-2 mb-8 md:mb-0 border-b md:border-b-0 md:border-r border-zinc-800 pb-4 md:pb-0 md:pr-4">
//       <Link 
//         to={"/"}  
//         className="group relative transition duration-300 ease-in-out block p-3 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900/50"
//       >
//         <span className="relative z-10 font-medium tracking-wide">Home</span>
//         {/* Hover Accent Line */}
//         <div className="absolute left-0 top-1/4 w-1 h-1/2 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-r-full hidden md:block" />
//       </Link>

//       <Link 
//         to={"/movies"}  
//         className="group relative transition duration-300 ease-in-out block p-3 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900/50"
//       >
//         <span className="relative z-10 font-medium tracking-wide">Browse Movie</span>
//         {/* Hover Accent Line */}
//         <div className="absolute left-0 top-1/4 w-1 h-1/2 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-r-full hidden md:block" />
//       </Link>
//     </nav>

//     {/* Main Slider Content */}
//     <div className="flex-1 w-full md:pl-10">
//       <div className="w-full max-w-[75rem] mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/10">
//         <SliderUtils data={data} /> 
//       </div>
//     </div>
//   </div>
// );