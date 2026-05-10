import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFetchGenreQuery } from "../../redux/api/genre.js"
import { toast } from "react-toastify"
import { useCreateMovieMutation, useUploadImageMutation } from "../../redux/api/movie.js"
import Sidebar from "./Dashboard/Sidebar/Sidebar.jsx"

const CreateMovie = () => {

    const navigate = useNavigate()

    const [movieData, setMovieData] = useState({
        name: "",
        year: 0,
        detail: '',
        cast: [],
        rating: 0,
        image: null,
        genre: ""
    })

    const [selectedImage, setSelectedImage] = useState(null)

    const [createMovie, { isLoading: isCreatingMovie, error: createMovieErrorDetails }] = useCreateMovieMutation()

    const [uploadingImage, { isLoading: isUploadingMovie, error: uploadingImageErrorDetails }] = useUploadImageMutation()

    const { data: genres, isLoading: isLoadingGenres } = useFetchGenreQuery()

    useEffect(() => {
        if (genres) {
            setMovieData((prevData) => ({
                ...prevData, genre: genres[0]?._id || ""
            }))
        }
    }, [genres])

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === "genre") {
            const selectGenre = genres.find((genre) => genre.name === value)
            setMovieData((prevData) => ({
                ...prevData,
                genre: selectGenre ? selectGenre._id : " "
            }))
        } else {
            setMovieData((prevData) => ({
                ...prevData,
                [name]: value
            }))
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setSelectedImage(file)
    }

    const handleCreateMovie = async () => {
        try {
            if (
                !movieData.name ||
                !movieData.year ||
                !movieData.detail ||
                !movieData.cast ||
                !selectedImage
            ) {
                toast.error("Plese fill all required fields")
                return
            }

            let uploadImagePath = null

            if (selectedImage) {
                const formData = new FormData()
                formData.append("image", selectedImage)

                const uploadImageResponse = await uploadingImage(formData)

                if (uploadImageResponse.data) {
                    uploadImagePath = uploadImageResponse.data.image
                } else {
                    console.log("Failed to upload image", uploadingImageErrorDetails)
                    toast.error("Failed to upload image")
                    return;
                }
                const data  = await createMovie({
                    ...movieData,
                    image: uploadImagePath,
                })
                
                navigate("/admin/movies-list")

                setMovieData({
                    name: "",
                    year: 0,
                    detail: '',
                    cast: [],
                    rating: 0,
                    image: null,
                    genre: ""
                })
                toast.success("Movie added to database")
            }
        } catch (error) {
           console.error("Failed to create movie : ",createMovieErrorDetails)
           toast.error(`Failed to create movie : ${createMovieErrorDetails?.message}`);
        }
    }

    return (
    <div className="min-h-screen bg-black text-white  flex flex-col items-center font-mono pt-20 pl-50 pb-10">
        <Sidebar/>
      <div className="w-full max-w-2xl px-6">
        <header className="mb-10 border-b border-emerald-500/20 pb-4">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-emerald-500">
            Create <span className="text-white">Record</span>
          </h1>
          <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">Database Injection: New Entry</p>
        </header>

        <form className="space-y-6">
          {/* Movie Name */}
          <div>
            <label className="block uppercase font-bold tracking-widest text-emerald-500/80 mb-2 ml-1">Title</label>
            <input 
              type="text" 
              name="name" 
              value={movieData.name} 
              placeholder="Movie Name" 
              onChange={handleChange} 
              className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-700" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Release Year */}
            <div>
              <label className="block uppercase font-bold tracking-widest text-emerald-500/80 mb-2 ml-1">Year</label>
              <input 
                type="number" 
                name="year" 
                value={movieData.year} 
                placeholder="YYYY" 
                onChange={handleChange} 
                className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-700" 
              />
            </div>

            {/* Genre Select */}
            <div>
              <label className="block uppercase font-bold tracking-widest text-emerald-500/80 mb-2 ml-1">Category</label>
              <select 
                name="genre" 
                value={movieData.genre} 
                onChange={handleChange} 
                className="w-full bg-white border border-zinc-800 p-3 rounded text-black focus:outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer"
              >
                <option value="">Select Genre</option>
                {isLoadingGenres ? (
                  <option>Loading...</option>
                ) : (
                  genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* Details / Textarea */}
          <div>
            <label className="block uppercase font-bold tracking-widest text-emerald-500/80 mb-2 ml-1">Description</label>
            <textarea 
              name="detail" 
              value={movieData.detail} 
              onChange={handleChange} 
              rows="4"
              className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-700 resize-none" 
              placeholder="Enter record description..."
            ></textarea>
          </div>

          {/* Cast */}
          <div>
            <label className="block uppercase font-bold tracking-widest text-emerald-500/80 mb-2 ml-1">Cast (Comma-Separated)</label>
            <input 
              type="text" 
              name="cast" 
              value={movieData.cast.join(", ")} 
              placeholder="Actor 1, Actor 2..." 
              onChange={(e) => setMovieData({ ...movieData, cast: e.target.value.split(", ") })} 
              className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-700" 
            />
          </div>

          {/* File Upload Area */}
          <div className="pt-2">
            <label className={`
              flex flex-col items-center justify-center w-full h-32 
              border-2 border-dashed rounded-lg cursor-pointer
              transition-all duration-300
              ${!selectedImage 
                ? "border-zinc-800 bg-zinc-900/50 hover:border-emerald-500/50 hover:bg-zinc-900" 
                : "border-emerald-500 bg-emerald-500/10"}
            `}>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="text-sm text-emerald-500 uppercase tracking-widest font-bold">
                  {selectedImage ? "✓ Image Uploaded" : "Upload Visual Asset"}
                </p>
                {!selectedImage && <p className="text-xs text-zinc-500 mt-1">PNG, JPG or WEBP</p>}
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="hidden" 
              />
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button 
              type="button" 
              onClick={handleCreateMovie} 
              disabled={isCreatingMovie || isUploadingMovie}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isCreatingMovie || isUploadingMovie ? "Executing..." : "Upload movie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateMovie


// return (
//         <div className="container flex justify-center items-center mt-4">
//             <form action="">
//                 <p className="text-green-200 w-[50rem] text-2xl mb-4">Create Movie</p>
//                 <div className="mb-4">
//                     <label className="block">
//                         Name:
//                         <input type="text" name="name" value={movieData.name} placeholder="Enter movie name" onChange={handleChange} className="border w-full px-2 py-1" />
//                     </label>
//                 </div>

//                 <div className="mb-4">
//                     <label className="block">
//                         Year:
//                         <input type="number" name="year" value={movieData.year} placeholder="Enter movie year" onChange={handleChange} className="border w-full px-2 py-1" />
//                     </label>
//                 </div>

//                 <div className="mb-4">
//                     <label className="block">
//                         Detail:
//                         <textarea name="detail" value={movieData.detail} onChange={handleChange} className="border w-full px-2 py-1" placeholder="Enter movie details"></textarea>
//                     </label>
//                 </div>

//                 <div className="mb-4">
//                     <label className="block">
//                         Cast (coma-separated):
//                         <input type="text" name="cast" value={movieData.cast.join(", ")} placeholder="Enter movie cast" onChange={(e) => setMovieData({ ...movieData, cast: e.target.value.split((", ")) })} className="border w-full px-2 py-1" />
//                     </label>
//                 </div>  

//                 <div className="mb-4">
//                     <label className="block">
//                         Genre:
//                         <select name="genre" value={movieData.genre} onChange={handleChange} className="border bg-white text-black w-full px-2 py-1">
//                             {isLoadingGenres ? (<option>Loading genres...</option>) : (genres.map((genre) => (
//                                 <option key={genre.id} value={genre.id}>{genre.name}</option>
//                             )))}
//                         </select>
//                     </label>
//                 </div>

//                 <div className="mb-4">
//                     <label style={!selectedImage ? { border: "1px solid #888", borderRadius: "5px", padding: "8px" } : {
//                         border: 0,
//                         borderRadius: 0,
//                         padding: 0
//                     }}>
//                         {!selectedImage && "Upload Image"}
//                         <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: !selectedImage ? "none" : "block" }} />
//                     </label>
//                 </div>
//                 <button type="button" onClick={handleCreateMovie} className="bg-teal-500 text-white px-4 py-2 rounded" disabled={isCreatingMovie || isUploadingMovie}>
//                     {isCreatingMovie || isUploadingMovie ? "Creating..." : "Create Movie "}
//                 </button>
//             </form>
//         </div>
//     )