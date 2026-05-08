import { useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {
  const{user} = useUser()
  const  role  = user?.unsafeMetadata.role
  const navigate = useNavigate()
  const isOrganizer = role === "organizer"
  const handleClick = async ()=>{
    navigate("/attendee/events")
  }
  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative text-center text-white max-w-3xl px-6">

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {isOrganizer ? (
            <>
              Manage & Create
              <span className="bg-gradient-to-r from-blue-400 via-white-400 to-green-300 bg-clip-text text-transparent">
                {" "}Events
              </span>
            </>
          ) : (
            <>
              Discover & Join
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
                {" "}Amazing Events
              </span>
            </>
          )}
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-10">
          {isOrganizer
            ? "Create and manage events with full control."
            : "Discover and join unforgettable experiences near you."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          {isOrganizer && (
            <>
              
              <button onClick={
                handleClick
              } className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur px-8 py-3 rounded-xl transition">
                Manage Events
              </button>
            </>
          )}

          {!isOrganizer && (
            <button onClick={
              handleClick
            } className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur px-8 py-3 rounded-xl transition">
              Explore Events
            </button>
          )}

        </div>

      </div>
    </div>
  )
}

export default LandingPage