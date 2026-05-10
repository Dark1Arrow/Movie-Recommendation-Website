import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation, redirect } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../component/Loader"
import { useLoginMutation } from "../../redux/api/users"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [redirect, navigate, userInfo])

  const submitHandler = async(e) =>{
     e.preventDefault()
        console.log("shkfd")
     try {
      const res = await login({email,password}).unwrap()
      dispatch(setCredentials({...res}))
      navigate(redirect)

     } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || err.error)
     }
  }

  return (
    <div className="min-h-screen bg-black text-white  font-mono flex items-center">
      <section className="container mx-auto flex flex-wrap justify-center lg:justify-between items-center px-6 lg:px-20">
        
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 max-w-[500px] py-10">
          <header className="mb-10">
            <h1 className="text-5xl font-black uppercase tracking-tighter text-emerald-500">
              Access <span className="text-white">Granted</span>
            </h1>
            <p className="text-zinc-500 mt-2 uppercase tracking-widest text-xs">Secure User Authentication</p>
          </header>

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs uppercase tracking-widest text-emerald-500/80 ml-1">
                Identity (Email)
              </label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter Email" 
                className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-700" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-xs uppercase tracking-widest text-emerald-500/80 ml-1">
                Access Key
              </label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter Password" 
                className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-700" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isLoading} 
                className="group relative w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded uppercase tracking-widest transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-pulse">Authorizing...</span>
                  </span>
                ) : (
                  "Initiate Session"
                )}
              </button>
              
              {isLoading && (
                <div className="mt-4 flex justify-center">
                  <Loader />
                </div>
              )}
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-900">
            <p className="text-zinc-400 text-sm">
              New to the Website?{" "}
              <Link 
                to={redirect ? `/register?redirect=${redirect}` : "/register"} 
                className="text-emerald-500 hover:text-emerald-300 font-bold underline underline-offset-4 decoration-emerald-500/30 transition-all"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Image (Hidden on small screens) */}
        <div className="hidden lg:block w-[45%] h-[80vh] relative group">
            <div className="absolute inset-0 bg-emerald-500/10 mix-blend-color group-hover:bg-transparent transition-all duration-700"></div>
            <img
                src="https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=2070&auto=format&fit=crop"
                alt="System interface"
                className="h-full w-full object-cover rounded-2xl  border border-zinc-800 shadow-2xl"
            />
        </div>

      </section>
    </div>
  );
}

export default Login
