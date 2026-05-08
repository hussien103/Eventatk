import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const AuthRedirect = () => {
  const { user, isSignedIn } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isSignedIn) return

    const role = user?.unsafeMetadata?.role

    if (!role) {
      navigate('/set-role')
    } 
  }, [isSignedIn, user])

  return null
}

export default AuthRedirect