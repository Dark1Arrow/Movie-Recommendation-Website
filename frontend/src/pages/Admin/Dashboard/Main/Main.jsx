import SecondaryCard from "./SecondaryCard"
import RealTimeCard from "./RealTimeCard"
import VideoCard from "./VideoCard"
import { useGetAllMoviesQuery, useGetTopMoviesQuery } from "../../../../redux/api/movie"
import { useGetUsersQuery } from "../../../../redux/api/users"

const Main = () => {
    const { data: topMovies } = useGetTopMoviesQuery()
    const { data: allMovies } = useGetAllMoviesQuery()
    const { data: visitor } = useGetUsersQuery()

    const totalCommentLength = allMovies?.map((m) => m.numReviews)
    const sumOfCommentLength = totalCommentLength?.reduce((acc, length) => acc + length, 0)

    return (
    <div className="min-h-screen bg-black text-white font-mono p-8">
      {/* Container to offset the sidebar width if necessary */}
      <section className="max-w-7xl mx-auto lg:ml-64 transition-all duration-300">
        
        {/* Header Section */}
        <header className="mb-10 border-b border-emerald-500/20 pb-6">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-emerald-500">
            System <span className="text-white">Overview</span>
          </h1>
          <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">Real-time Analytics & Node Status</p>
        </header>

        <div className="flex flex-col xl:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <SecondaryCard 
                pill="Visitors" 
                content={visitor?.length || 0} 
                info="+30.3k vs previous" 
                gradient="from-teal-500 to-lime-400" 
              />
              <SecondaryCard 
                pill="Comments" 
                content={sumOfCommentLength || 0} 
                info="+742.8 vs previous" 
                gradient="from-[#CCC514] to-[#CDCBEE]" 
              />
              <SecondaryCard 
                pill="Records" 
                content={allMovies?.length || 0} 
                info="+372 new entries" 
                gradient="from-green-500 to-lime-400" 
              />
            </div>

            {/* Top Content Table Header */}
            <div className="bg-zinc-900/50 border-x border-t border-zinc-800 p-4 rounded-t-lg flex justify-between items-center">
              <span className="text-xs uppercase tracking-[0.2em] font-black text-emerald-500">Top Performing Content</span>
              <span className="text-xs uppercase tracking-[0.2em] font-black text-zinc-500 px-4">Interactions</span>
            </div>

            {/* Content Feed */}
            <div className="border border-zinc-800 rounded-b-lg divide-y divide-zinc-900 overflow-hidden">
              {topMovies?.map((movie) => (
                <div key={movie._id} className="hover:bg-emerald-500/[0.02] transition-colors">
                  <VideoCard 
                    image={movie.image} 
                    title={movie.name} 
                    date={movie.year} 
                    comment={movie.numReviews} 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar Widget */}
          <div className="xl:w-80">
            <div className="sticky top-8">
              <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-4 ml-1">Live Telemetry</h3>
              <div className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-lg shadow-2xl">
                <RealTimeCard />
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Main


// return (
//         <div>
//             <section className="flex justify-around">
//                 <div className="ml-[14rem] mt-10">
//                     <div className="-translate-x-4 flex">
//                         <SecondaryCard pill="Users" content={visitor?.length} info="30.3k more than usual" gradient="from-teal-500 to-lime-400" />

//                         <SecondaryCard pill="Comment" content={sumOfCommentLength} info="742.8 more than usual" gradient="from-[#CCC514] to-[#CDCBEE]" />

//                         <SecondaryCard pill="Movies" content={allMovies?.length} info="372+ more than usual" gradient="from-green-500 to-lime-400" />
//                     </div>

//                     <div className="flex justify-between w-[90%] text-white mt-10 font-bold">
//                         <div>Top Content</div>
//                         <div>Comment</div>
//                     </div>

//                     {topMovies?.map((movie) => (
//                     <VideoCard key={movie._id} image={movie.image} title={movie.name} date={movie.year} comment={movie.numReviews} />
//                 ))}

//                 </div>

//                 <div>
//                     <RealTimeCard /> 
//                 </div>

//             </section>
//         </div>
//     )