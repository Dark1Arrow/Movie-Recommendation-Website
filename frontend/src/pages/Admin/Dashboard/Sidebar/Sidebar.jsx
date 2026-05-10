import { Link } from "react-router"
import { useLocation } from "react-router";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/movie/dashboard" },
    { name: "Create Movie", path: "/admin/movie/create" },
    { name: "Create Genre", path: "/admin/movie/genre" },
    { name: "Update Movie", path: "/admin/movies-list" },
    { name: "Comments", path: "/admin/movies/comment" },
  ];
  return (
    <div className="h-screen fixed left-0 top-0 w-64 bg-black border-r border-zinc-900 flex flex-col font-mono">
      {/* Sidebar Header */}
      <div className="p-8 border-b border-zinc-900">
        <h2 className="text-emerald-500 text-xl uppercase font-black">
          Admin <span className="text-white">Panel</span>
        </h2>
      </div>

      <aside className="flex-1 py-6">
        <nav>
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      block px-4 py-3 rounded text-sm uppercase tracking-widest transition-all duration-200
                      ${isActive 
                        ? "bg-emerald-500 text-black font-black translate-x-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                        : "text-zinc-500 hover:text-emerald-400 hover:bg-zinc-900"
                      }
                    `}
                  >
                    {isActive ? `> ${item.name}` : item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Sidebar Footer */}
      <div className="p-6 border-t border-zinc-900">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">System Online</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar


// return (
//     <div className="-translate-y-10 flex h-screen fixed mt-10 border-r-2 border-[#242424]">
//       <aside className="text-white w-64 flex-shrink-0">
//         <ul className="py-4">
//             <li  className="text-lg  bg-gradient-to-b from-green-500 to-lime-400 rounded-full -translate-x-6" >
//                 <Link to="/admin/movie/dashboard" className=" block p-2 ml-20 mb-10">Dashboard</Link>
//             </li>
//             <li  className="text-lg -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full" >
//                 <Link to="/admin/movie/create" className=" block p-2 ml-20 mb-10">Create Movie</Link>
//             </li>
//             <li  className="text-lg -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full" >
//                 <Link to="/admin/movie/genre" className=" block p-2 ml-20 mb-10">Create Genre</Link>
//             </li>
//             <li  className="text-lg -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full" >
//                 <Link to="/admin/movies-list" className=" block p-2 ml-20 mb-10">Update Movie</Link>
//             </li>
//             <li  className="text-lg -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full" >
//                 <Link to="/admin/movies/comment" className=" block p-2 ml-20 mb-10">Comments</Link>
//             </li>
//         </ul>
//       </aside>
//     </div>
//   )