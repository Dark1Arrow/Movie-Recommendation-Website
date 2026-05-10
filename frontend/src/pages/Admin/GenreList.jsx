import { useState } from "react"
import { useCreateGenreMutation, useDeleteGenreMutation, useFetchGenreQuery, useUpdateGenreMutation } from "../../redux/api/genre.js"

import { toast } from "react-toastify"
import GenreForm from "../../component/GenreForm.jsx"
import Model from "../../component/Model.jsx"
import Sidebar from "./Dashboard/Sidebar/Sidebar.jsx"

const GenreList = () => {

  const { data: genres, refetch } = useFetchGenreQuery()
  const [name, setName] = useState("")
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [updatingName, setUpdatingName] = useState("")
  const [modelVisisble, setModelVisisble] = useState(false)

  const [createGenre] = useCreateGenreMutation()
  const [updateGenre] = useUpdateGenreMutation()
  const [deleteGenre] = useDeleteGenreMutation()

  const handleCreateGenre = async (e) => {
    e.preventDefault()

    if (!name) {
      toast.error("Name is required")
      return;
    }

    try {
      const result = await createGenre({ name }).unwrap()

      if (result.error) {
        toast.error("We get some Error")
      } else {
        setName("")
        toast.success(`${result.name} is created`)
        refetch()
      }

    } catch (error) {
      console.log(error)
      toast.error("Creating genre failed try agian")
    }
  }

  const handleUpdateGenre = async (e) => {
    e.preventDefault()

    if (!updateGenre) {
      toast.error("Genre name is required")
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: {
          name: updatingName
        }
      }).unwrap()

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(`${result.name} is updated`)
        refetch()
        setModelVisisble(false)
        setSelectedGenre(null)
        setUpdatingName("")
      }
    } catch (error) {
      console.log(error)
      toast.error("Creating genre failed try agian")
    }
  }

  const handleDeleteGenre = async() => {
    try {
        const result = await deleteGenre(selectedGenre._id).unwrap()
        if(result.error){
          toast.error(result.error)
        }else{
          toast.success(`${result.name} is deleted`)
          refetch()
          setModelVisisble(false)
          setSelectedGenre(null)
        }
    } catch (error) {
      console.log(error)
      toast.error("Creating genre failed try agian")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono  p-8 pl-60">
      <Sidebar/>
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 border-b border-emerald-500/20 pb-4">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-emerald-500">
            Genre <span className="text-white">Classification</span>
          </h1>
          <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">Manage category metadata</p>
        </header>

        {/* Input Section */}
        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-lg mb-10">
          <h2 className="text-sm uppercase tracking-widest text-zinc-400 mb-4 ml-1">Add New Category</h2>
          <GenreForm 
            value={name} 
            setValue={setName} 
            handleSubmit={handleCreateGenre} 
          />
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-4">
          {genres?.map((genre) => (
            <div key={genre._id}>
              <button 
                className="
                  bg-black border border-emerald-500/50 text-emerald-500 
                  py-2 px-6 rounded-sm uppercase text-sm font-bold tracking-widest
                  hover:bg-emerald-500 font-bold hover:text-black hover:border-emerald-500
                  transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0.1)]
                  focus:outline-none focus:ring-1 focus:ring-emerald-500
                " 
                onClick={() => {
                  setModelVisisble(true);
                  setSelectedGenre(genre);
                  setUpdatingName(genre.name);
                }}
              >
                {genre.name}
              </button>
            </div>
          ))}
        </div>

        {/* Update Modal */}
        <Model isOpen={modelVisisble} onClose={() => setModelVisisble(false)}>
          <div className="p-2">
            <h3 className="text-emerald-500 uppercase tracking-widest font-black mb-6 text-xl">
              Modify Record
            </h3>
            <GenreForm 
              value={updatingName} 
              setValue={(value) => setUpdatingName(value)} 
              handleSubmit={handleUpdateGenre} 
              button="Update" 
              handleDelete={handleDeleteGenre} 
            />
          </div>
        </Model>
      </div>
    </div>
  );
}

export default GenreList

// return (
//     <div className="ml-[10rem] flex flex-col md:flex-row">
//       <div className="md:w-3/4 p-3">
//         <h1 className="h-12">
//           Manage Genre
//         </h1>

//         <GenreForm value={name} setValue={setName} handleSubmit={handleCreateGenre} />

//         <br />

//         <div className="flex flex-wrap">
//           {genres?.map((genre) => (
//             <div key={genre._id}>
//               <button className="bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50" onClick={() => {
//                 {
//                   setModelVisisble(true)
//                   setSelectedGenre(genre)
//                   setUpdatingName(genre.name)
//                 }
//               }}>{genre.name}</button>
//             </div>
//           ))}
//         </div>

//         <Model isOpen={modelVisisble} onClose={() => setModelVisisble(false)}>
//           <GenreForm value={updatingName} setValue={(value) => setUpdatingName(value)} handleSubmit={handleUpdateGenre} button="Update" handleDelete={handleDeleteGenre} />
//         </Model>
//       </div>
//     </div>
//   )