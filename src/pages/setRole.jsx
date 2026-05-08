import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const SetRole = () => {
  const { user } = useUser()
  const navigate = useNavigate()
 
  const chooseRole = async (role) => {
   await user.update({
    unsafeMetadata: { role }
  })

    if (role === 'organizer') {
      navigate('/organizer/dashboard')
    } else {
      navigate('attendee/events')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-950 to-blue-950 px-4">

      <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl text-center">

        <h1 className="text-2xl font-bold text-white mb-2">
          Choose Your Role
        </h1>

        <p className="text-sm text-white/60 mb-8">
          Select how you want to use Eventatk
        </p>

        <div className="flex flex-col gap-4">

         
          <button
            onClick={() => chooseRole('organizer')}
            className="group relative w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
          >
            Organizer

            <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition" />
          </button>

          <button
            onClick={() => chooseRole('attendee')}
            className="group relative w-full py-3 rounded-xl border border-white/10 text-white/80 hover:text-white hover:border-blue-500/50 hover:bg-white/5 transition"
          >
            Attendee

            <span className="absolute inset-0 rounded-xl bg-blue-500/10 opacity-0 group-hover:opacity-100 transition" />
          </button>

        </div>

        <p className="text-xs text-white/40 mt-6">
          You can change this later from settings
        </p>

      </div>
    </div>
  )
}

export default SetRole