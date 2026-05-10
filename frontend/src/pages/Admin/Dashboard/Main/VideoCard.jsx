import React from 'react'

const VideoCard = ({ image, title, date, comment }) => {
  return (
    <>
   <div className="flex items-center w-full px-4 py-3 bg-transparent border-b border-zinc-900 hover:bg-emerald-500/[0.03] transition-colors group">
      
      {/* Thumbnail with emerald border effect */}
      <div className="relative flex-shrink-0">
        <img 
          src={image} 
          alt={title} 
          className="h-12 w-20 object-cover rounded-sm transition-all duration-300 border border-zinc-800" 
        />
        <div className="absolute inset-0 border border-emerald-500/0 group-hover:border-emerald-500/30 transition-all pointer-events-none"></div>
      </div>

      {/* Meta Data */}
      <div className="ml-6 flex-grow">
        <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-tight group-hover:text-emerald-400 transition-colors">
          {title}
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono">
            Year - {date}
          </span>
        </div>
      </div>

      {/* Interaction Metric */}
      <div className="flex flex-col items-end">
        <div className="text-emerald-500 font-mono font-black text-lg leading-none">
          {comment}
        </div>
        <span className="text-[9px] text-zinc-600 uppercase tracking-tighter mt-1 font-bold">
          Transmissions
        </span>
      </div>
      
    </div>
</>
  )
}

export default VideoCard

//  <div className='flex items-center w-[90%] mt-5 '>
//       <div>
//       <img src={image} alt={title} className='h-[3rem]' />
//       </div>

//       <div className='ml-4'>
//         <h2 className='text-lg text-white '>{title}</h2>
//         <p className='text-gray-500 mb-3'>{date}</p>
//       </div>

//       <div className='flex-grow mb-5 flex justify-end items-center'>
//         <div className='text-white text-lg'>{comment}</div>
//       </div>
//     </div>