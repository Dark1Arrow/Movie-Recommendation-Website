import { useState } from "react"
import { AiOutlineHome, AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai"
import { MdOutlineLocalMovies } from "react-icons/md"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useLogoutMutation } from "../../redux/api/users.js"
import { logout } from "../../redux/features/auth/authSlice"


const Navigation = () => {

    const { userInfo } = useSelector((state) => state.auth)
    const [dropdownOpen, setDropDownOpen] = useState(false)

    const toggleDropDown = () => {
        setDropDownOpen(!dropdownOpen)
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            console.log("hey")
            dispatch(logout())
            navigate("/login") 
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-[400px] px-4">
      <div className="bg-black/90 backdrop-blur-md border border-emerald-500/50 rounded-2xl p-4">
        <section className="flex justify-between items-center">
          
          {/* Section 1: Main Nav */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-white hover:text-emerald-400 transition-all hover:scale-110">
              <AiOutlineHome size={26} />
              <span className="sr-only">Home</span>
            </Link>
            
            <Link to="/movies" className="text-white hover:text-emerald-400 transition-all hover:scale-110">
              <MdOutlineLocalMovies size={26} />
              <span className="sr-only">Movies</span>
            </Link>
          </div>

          {/* Section 2: User / Auth */}
          <div className="relative">
            <button 
              onClick={toggleDropDown} 
              className="flex items-center gap-2 group focus:outline-none"
            >
              {userInfo ? (
                <span className="text-white  text-sm uppercase tracking-wider group-hover:text-emerald-400 transition-colors">
                  {userInfo.username}
                </span>
              ) : null}

              {userInfo && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-300 text-white ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && userInfo && (
              <div className={`absolute right-0 bottom-full mb-4 w-48 bg-zinc-900 border border-emerald-500/30 rounded-lg overflow-hidden shadow-xl`}>
                <ul className="py-2 text-sm ">
                  {userInfo.isAdmin && (
                    <li>
                      <Link to="/admin/movie/dashboard" className="block px-4 py-2 hover:bg-emerald-500 hover:text-black transition-colors">
                        DASHBOARD
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to="/profile" className="block px-4 py-2 text-zinc-300 hover:bg-emerald-500 hover:text-black transition-colors">
                      PROFILE
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={logoutHandler} 
                      className="w-full text-left px-4 py-2 text-zinc-300 hover:bg-red-500 hover:text-white transition-colors"
                    >
                      LOGOUT
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {/* Auth Links (If no user) */}
            {!userInfo && (
              <div className="flex gap-4">
                <Link to="/login" className="text-emerald-500 hover:text-emerald-400 transition-transform hover:scale-110">
                  <AiOutlineLogin size={26} />
                </Link>

                <Link to="/register" className="text-emerald-500 hover:text-emerald-400 transition-transform hover:scale-110">
                  <AiOutlineUserAdd size={26} />
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Navigation
