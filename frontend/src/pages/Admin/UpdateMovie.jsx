import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { useUpdatedMovieMutation, useGetSpecificMovieQuery, useUploadImageMutation, useDeleteMovieMutation } from "../../redux/api/movie.js"
import { toast } from "react-toastify"
import Sidebar from "./Dashboard/Sidebar/Sidebar.jsx"

const UpdateMovie = () => {
    const { id } = useParams()
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
    const { data: initialMovieData } = useGetSpecificMovieQuery(id)

    useEffect(() => {
        if (initialMovieData) {
            setMovieData(initialMovieData)
        }
    }, [initialMovieData])

    const [updateMovie, { isLoading: isUpdatingMovie }] = useUpdatedMovieMutation()
    const [uploadImage, { isLoading: isUploadingImage, error: uploadImageErrorDetails }] = useUploadImageMutation()

    const [deleteMovie] = useDeleteMovieMutation()

    const handleChange = (e) => {
        const { name, value } = e.target
        setMovieData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setSelectedImage(file)
    }
    const handleUpdateMovie = async () => {
        try {
            if (
                !movieData.name ||
                !movieData.year ||
                !movieData.detail ||
                !movieData.cast
            ) {
                toast.error("Please enter all required fields")
                return;
            }

            let uploadedImagePath = movieData.image

            if (selectedImage) {
                const formData = new FormData()
                formData.append('image', selectedImage)

                const uploadImageResponse = await uploadImage(formData)

                if (uploadImageResponse.data) {
                    uploadedImagePath = uploadImageResponse.data.image
                } else {
                    console.error("Failed to upload Image: ", uploadImageErrorDetails)
                    toast.error("Failed to upload image")
                    return
                }
            }

            await updateMovie({
                id: id,
                updatedMovie: {
                    ...movieData,
                    image: uploadedImagePath
                }
            })
            navigate("/movies")
        } catch (error) {
            console.error("Failed to update movie : ", error)
            toast.error("Failed to update movie ", error?.message)
        }
    }
    const handleDeleteMovie = async () => {
        try {
            await deleteMovie(id)
            toast.success("Movie deleted succesfully") 
            navigate("/movies")
        } catch (error) {
            console.error("Failed to update movie : ", error)
            toast.error("Failed to update movie ", error?.message)
        }
    }

    return (
    <div className="min-h-screen bg-black text-white  flex flex-col items-center pt-20 pb-10 font-mono">
      <div className="w-full max-w-2xl px-6">
        
        <header className="mb-10 border-b border-emerald-500/20 pb-4">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-emerald-500">
            Update <span className="text-white">Record</span>
          </h1>
          <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">
            Database Modification: ID_{movieData?._id?.substring(0, 8) || "NULL"}
          </p>
        </header>

        <form className="space-y-6">
          {/* Movie Name */}
          <div>
            <label className="block uppercase font-bold tracking-widest text-emerald-500/80 mb-2 ml-1">Title</label>
            <input
              type="text"
              name="name"
              value={movieData.name}
              placeholder="ENTRY_NAME"
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-700"
            />
          </div>

          {/* Year */}
          <div>
            <label className="block uppercase font-bold tracking-widest text-emerald-500/80 mb-2 ml-1">Release Year</label>
            <input
              type="number"
              name="year"
              value={movieData.year}
              placeholder="YYYY"
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-700"
            />
          </div>

          {/* Details */}
          <div>
            <label className="block uppercase font-bold tracking-widest text-emerald-500/80 mb-2 ml-1">Description</label>
            <textarea
              name="detail"
              value={movieData.detail}
              rows="4"
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-700 resize-none"
              placeholder="Enter record details..."
            />
          </div>

          {/* Cast */}
          <div>
            <label className="block uppercase font-bold tracking-widest text-emerald-500/80 mb-2 ml-1">Cast (Comma-Separated)</label>
            <input
              type="text"
              name="cast"
              value={movieData.cast.join(", ")}
              onChange={(e) => setMovieData({ ...movieData, cast: e.target.value.split(", ") })}
              className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-700"
            />
          </div>

          {/* Image Upload Area */}
          <div className="pt-2">
            <label
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ${
                !selectedImage
                  ? "border-zinc-800 bg-zinc-900/50 hover:border-emerald-500/50 hover:bg-zinc-900"
                  : "border-emerald-500 bg-emerald-500/10"
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="text-sm text-emerald-500 uppercase tracking-widest font-bold">
                  {selectedImage ? "✓ Asset Linked" : "Replace Visual Asset"}
                </p>
                {!selectedImage && <p className="text-xs text-zinc-500 mt-1">Leave blank to keep current image</p>}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 pt-6">
            <button
              type="button"
              onClick={handleUpdateMovie}
              disabled={isUpdatingMovie || isUploadingImage}
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isUpdatingMovie || isUploadingImage ? "Executing..." : "Apply Changes"}
            </button>

            <button
              type="button"
              onClick={handleDeleteMovie}
              disabled={isUpdatingMovie || isUploadingImage}
              className="flex-1 bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-black py-4 rounded uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isUpdatingMovie || isUploadingImage ? "Purging..." : "Delete Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
    
}

export default UpdateMovie


// return (
//         <div className="container flex justify-center item-center mt-4">
//             <form >
//                 <p className="text-gray-200 w-[50rem] text-2xl mb-4">Update Movie</p>
//                 <div className="mb-4">
//                     <label className="block">
//                         Label:
//                         <input type="text" name="name" value={movieData.name} onChange={handleChange} className="px-2 py-1 border w-full" />
//                     </label>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block">
//                         Year:
//                         <input type="number" name="year" value={movieData.year} onChange={handleChange} className="px-2 py-1 border w-full" />
//                     </label>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block">
//                         Detail:
//                         <textarea type="text" name="detail" value={movieData.detail} onChange={handleChange} className="px-2 py-1 border w-full" />
//                     </label>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block">
//                         Cast (coma-separated):
//                         <input type="text" name="cast" value={movieData.cast.join(", ")} onChange={(e) => setMovieData({ ...movieData, cast: e.target.value.split(", ") })} className="px-2 py-1 border w-full" />
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
//                 <button type="button" onClick={handleUpdateMovie} className="bg-teal-500 text-white px-4 py-2 rounded" disabled={isUpdatingMovie || isUploadingImage}>
//                     {isUpdatingMovie || isUploadingImage ? "Updating..." : "Update Movie"}
//                 </button>
//                 <button type="button" onClick={handleDeleteMovie} className="bg-red-500 text-white mx-4 px-4 py-2 rounded" disabled={isUpdatingMovie || isUploadingImage}>
//                     {isUpdatingMovie || isUploadingImage ? "Deleting..." : "Delete Movie"}
//                 </button>
//             </form>
//         </div>
//     )