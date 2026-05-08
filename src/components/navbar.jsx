import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Menu,
  PlusCircle,

} from 'lucide-react'
import { SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
 
  const [navLinks, setNavLinks] = useState([])
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

const { user, isSignedIn } = useUser()
  
useEffect(() => {
  if (!isSignedIn || !user) {
    setNavLinks([
      { name: 'Home', path: '/' },
      { name: 'Browse Events', path: '/attendee/events' },
    ])
    return
  }

  const role = user?.unsafeMetadata?.role

  if (role === 'organizer') {
    setNavLinks([
      { name: 'Dashboard', path: '/organizer/dashboard' },
      { name: 'My Events', path: '/organizer/events' },
    ])
  } else if (role === 'attendee') {
    setNavLinks([
      { name: 'Home', path: '/' },
      { name: 'Browse Events', path: '/attendee/events' },
      { name: 'My Tickets', path: '/attendee/tickets' },
    ])
  } else {
    setNavLinks([])
  }
}, [isSignedIn, user])

  const isActive = (path) => location.pathname === path

  

  return (
<nav
  className={`fixed top-0 w-full z-50 transition-all duration-300 ${
    isScrolled
      ? "bg-black/40 backdrop-blur-md border-b border-white/10"
      : "bg-transparent"
  }`}
>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">


        <Link to="/" className="flex items-center gap-2">
          <img src="tent-png-35660.png" width={40} height={35}/>

          <span className="font-bold text-xl text-blue-600">
            Eventatk
          </span>
        </Link>

        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-2">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${
                      isActive(link.path)
                        ? 'bg-sky-500/10 text-white'
                        : 'hover:bg-accent'
                    }`}
                  >
                    {link.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-3">

          <div className="hidden md:flex gap-2">
  {!user ? (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="ghost">
            Login
          </Button>
        </SignInButton>

        <SignUpButton mode="modal">
          <Button className="bg-blue-600 text-white">
            Sign Up <PlusCircle className="w-4 h-4 ml-2" />
          </Button>
        </SignUpButton>
      </SignedOut>
    </>
  ) : (
    <div className="hidden md:flex items-center gap-3">

      
      <UserButton afterSignOutUrl="/" />


    </div>
  )}
</div>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <div className="flex flex-col gap-3 mt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex gap-2 p-2 rounded hover:bg-accent"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </nav>
  )
}

export default Navbar