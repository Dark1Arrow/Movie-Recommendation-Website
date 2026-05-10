import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../component/Loader"
import { useRegisterMutation } from "../../redux/api/users"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"

const Register = () => {

    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()
    const { userInfo } = useSelector((state) => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("password not match ")
        } else {
            try {
                console.log(username, email, password)

                const res = await register({ username, email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate(redirect);
                toast.success("User successfully registerd.")
            } catch (err) {
                console.log(err)
                toast.error(err.data.message)
            }
        }
    }

    return (
    <div className="min-h-screen font-mono bg-black text-white  flex items-center">
      <section className="container mx-auto flex flex-wrap justify-center lg:justify-between items-center px-6 lg:px-20">
        
        {/* Registration Form Container */}
        <div className="w-full lg:w-1/2 max-w-[500px] py-10">
          <header className="mb-8">
            <h1 className="text-5xl font-black uppercase tracking-tighter text-emerald-500">
              New <span className="text-white">Entity</span>
            </h1>
            <p className="text-zinc-500 mt-2 uppercase tracking-widest text-xs">Create system credentials</p>
          </header>

          <form onSubmit={submitHandler} className="space-y-5">
            {/* Name Input */}
            <div className="space-y-1">
              <label htmlFor="name" className="block text-xs uppercase tracking-widest text-emerald-500/80 ml-1">Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Full Name" 
                className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-700" 
                value={username} 
                onChange={(e) => setUserName(e.target.value)} 
                required
              />
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-xs uppercase tracking-widest text-emerald-500/80 ml-1">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter Email" 
                className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-700" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-xs uppercase tracking-widest text-emerald-500/80 ml-1">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter Password" 
                className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-700" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-xs uppercase tracking-widest text-emerald-500/80 ml-1">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                placeholder="Enter Confirm Password" 
                className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-700" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required
              />
            </div>

            {/* Register Button */}
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isLoading} 
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? "Synchronizing..." : "Registration"}
              </button>
              
              {isLoading && (
                <div className="mt-4 flex justify-center">
                  <Loader />
                </div>
              )}
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-900 text-sm">
            <p className="text-zinc-400">
              Existing member? {" "}
              <Link 
                to={redirect ? `/login?redirect=${redirect}` : "/login"} 
                className="text-emerald-500 hover:text-emerald-300 font-bold underline underline-offset-4 decoration-emerald-500/30 transition-all"
              >
                Login Account
              </Link>
            </p>
          </div>
        </div>

        {/* Cinematic Side Image */}
        <div className="hidden lg:block w-[45%] h-[85vh] relative group">
            <div className="absolute inset-0 bg-emerald-500/10 mix-blend-color z-10 rounded-2xl"></div>
            <img
                src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"
                alt="Cinema vibe"
                className="h-full w-full object-cover rounded-2xl border border-zinc-800"
            />
        </div>

      </section>
    </div>
  );
}

export default Register
