import { useGetUsersQuery } from "../../../../redux/api/users"

const PrimaryCard = () => {
  const {data: visitor} = useGetUsersQuery()
  return (
    <div className="w-full bg-zinc-900/50 border border-emerald-500/20 text-white rounded-lg p-6 relative overflow-hidden group">
      {/* Decorative background element for terminal feel */}
      {/* <div className="absolute top-0 right-0 p-2 opacity-10">
        <span className="text-4xl font-black italic">LIVE</span>
      </div> */}

      <div className="relative z-10">
        <h2 className="text-xl font-black uppercase tracking-tighter text-emerald-500 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
          Congratulations!
        </h2>
        
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white leading-none">
            {visitor?.length || 0}
          </span>
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
            Active Nodes
          </p>
        </div>
        
        <p className="mt-2 text-sm text-zinc-400 font-mono italic">
          Currently synchronizing with your content stream.
        </p>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-emerald-500/50 to-transparent"></div>
    </div>
  );
}

export default PrimaryCard


// return (
//     <div className="w-[100%] h-[10%]  bg-[#282828] text-white rounded-lg p-6">
//       <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
//       <p>You have {visitor?.length} new users, watching your content.</p>
//     </div>
//   )