import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Loader from "../../component/Loader"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { useProfileMutation } from "../../redux/api/users"

const profile = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const { userInfo } = useSelector((state) => state.auth)

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation()

    useEffect(() => {
        setUsername(userInfo.username)
        setEmail(userInfo.email)
    }, [userInfo.username, userInfo.email])

    const dispatch = useDispatch()

    const submitHandler = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Password do not match")
        } else {
            try {
                const res = await updateProfile({
                      _id: userInfo._id,
                      username, 
                      email,
                      password,
                }).unwrap()
                dispatch(setCredentials({...res}))
                toast.success("Profile updated successfully")
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    return (
    <div className="min-h-screen bg-black text-emerald-500  flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900/50 border border-emerald-500/20 p-8 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        
        <header className="mb-8 border-b border-emerald-500/10 pb-4">
          <h2 className="text-3xl font-black uppercase tracking-tighter">
            Update <span className="text-white">Profile</span>
          </h2>
          <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">User Configuration Settings</p>
        </header>

        <form onSubmit={submitHandler} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2 ml-1">Username</label>
            <input 
              type="text" 
              placeholder="Enter name" 
              className="w-full bg-black border border-zinc-800 p-4 rounded text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-zinc-700" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="Enter email" 
              className="w-full bg-black border border-zinc-800 p-4 rounded text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-zinc-700" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2 ml-1">New Password</label>
            <input 
              type="password" 
              placeholder="Enter Password" 
              className="w-full bg-black border border-zinc-800 p-4 rounded text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-zinc-700" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2 ml-1">Verify Password</label>
            <input 
              type="password" 
              placeholder="Enter Password" 
              className="w-full bg-black border border-zinc-800 p-4 rounded text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-zinc-700" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
          </div>

          {/* Action Area */}
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loadingUpdateProfile}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loadingUpdateProfile ? "Processing..." : "Commit Changes"}
            </button>
            
            {loadingUpdateProfile && (
              <div className="flex justify-center mt-4">
                <Loader />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};


export default profile
