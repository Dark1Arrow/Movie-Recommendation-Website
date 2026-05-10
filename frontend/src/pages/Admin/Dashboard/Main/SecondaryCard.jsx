import React from 'react'

const SecondaryCard = ({ pill, content, info, gradient }) => {
    
  return (
    <div className={`w-[15rem] h-[13rem] relative mt-12 bg-gradient-to-b ${gradient}  border border-zinc-800 rounded-lg shadow-2xl ml-5 font-mono group hover:border-emerald-500/40 transition-all duration-500`}>
      
      {/* Header Pill - Transformed into a Terminal Label */}
      <div className={`absolute -top-3 left-6 border border-zinc-800 bg-black py-1 px-4 text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-black rounded-sm shadow-xl`}>
        {pill}
      </div>

      {/* Main Metric Section */}
      <div className="flex flex-col items-center justify-center h-full pt-4">
        <h2 className="text-6xl font-black text-white tracking-tighter group-hover:text-zinc-800 transition-colors">
          {content}
        </h2>
        
        {/* Progress / Info Indicator */}
        <div className="mt-4 flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
           <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
             Node_Active
           </span>
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="absolute bottom-0 left-0 w-full p-3 bg-zinc-900/80 border-t border-zinc-800 rounded-b-lg">
        <p className="text-[10px] text-zinc-400 text-center uppercase tracking-tighter leading-none">
          {info}
        </p>
      </div>

      {/* Subtle Corner Accent */}
      <div className="absolute top-2 right-2 w-1 h-1 bg-zinc-800 rounded-full"></div>
    </div>
  );
}

export default SecondaryCard

// return (
//         <div className={`w-[15rem] h-[13rem] relative mt-12 bg-gradient-to-b ${gradient} rounded-lg shadow-lg ml-5`}>

//             <div className={`absolute -top-4 left-[5rem] border bg-gradient-to-b ${gradient} rounded-full py-2 px-5 text-sm text-gray-800 font-semibold`}
//             >{pill}</div>

//             <div className='flex items-center justify-center h-full'>
//                 <h2 className='text-5xl font-bold text-white'>{content}</h2>
//             </div>

//             <div className='absolute bottom-4 left-12 text-white text-sm'>{info}</div>

//         </div>
//     )