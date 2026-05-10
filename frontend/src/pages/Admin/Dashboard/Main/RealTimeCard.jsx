import { useGetUsersQuery } from "../../../../redux/api/users"
import PrimaryCard from "./PrimaryCard"

const RealTimeCard = () => {
  const {data: visitor} = useGetUsersQuery()
 return (
    <div className="w-full mt-10 bg-zinc-900/40 border border-zinc-800 text-white rounded-xl p-6 shadow-2xl backdrop-blur-sm font-mono relative overflow-hidden">
      
      {/* Top Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xs uppercase tracking-[0.3em] font-black text-emerald-500">
            Telemetry
          </h2>
          <p className="text-[10px] text-zinc-500 uppercase mt-1">Status: Live Sync</p>
        </div>
        <div className="flex gap-1">
          <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="w-1 h-1 bg-emerald-500/50 rounded-full"></span>
          <span className="w-1 h-1 bg-emerald-500/20 rounded-full"></span>
        </div>
      </div>

      {/* Main Metric Section */}
      <div className="py-4">
        <div className="flex items-baseline gap-2">
          <h2 className="text-5xl font-black tracking-tighter text-white">
            {visitor?.length || "00"}
          </h2>
          <span className="text-emerald-500 text-sm font-bold animate-bounce">↑</span>
        </div>
        <p className="text-xs uppercase tracking-widest text-zinc-400 mt-2 font-bold">
          Active Subscribers
        </p>
      </div>

      {/* Decorative Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-800"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-zinc-900 px-2 text-[10px] text-zinc-600 uppercase tracking-tighter">
            Data Stream
          </span>
        </div>
      </div>

      {/* Primary Action Card Slot */}
      <div className="group transition-all duration-300">
        <PrimaryCard />
      </div>

      {/* Scanline Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
    </div>
  );
}

export default RealTimeCard


// return (
//     <div className="w-[25rem] mt-10 bg-[#282828] text-[#fff] rounded-lg shadow-lg p-4">
//       <h2 className="text-2xl font-bold mb-2">Realtime</h2>
//       <p className="text-gray-500 mb-4">Update Live</p>
//       <div className="border-t border-[#666] my-7"></div>
//       <h2 className="text-2xl font-bold mb-2">{visitor?.length}</h2>
//       <p className="text-gray-500 mb-2">Subscribe</p>

//       <hr />

//       <PrimaryCard/>
//     </div>
//   )