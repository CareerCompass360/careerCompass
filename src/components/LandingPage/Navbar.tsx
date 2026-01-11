"use client"

import { Button } from "@/components/ui/button"
import { Compass, User as UserIcon, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useUser } from "@stackframe/stack"
import { useProfile } from "@/lib/useProfile"
import Link from "next/link"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = useUser()
  const { user: dbUser } = useProfile()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header 
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
          ${isScrolled 
            ? 'md:mt-4 md:w-[900px] md:left-1/2 md:-translate-x-1/2 md:rounded-2xl bg-stone-50/96 backdrop-blur-xl md:border-2 border-b md:border-amber-200/40 border-amber-100/50 md:shadow-2xl shadow-lg md:shadow-amber-200/30 animate-navbar-float' 
            : 'mt-0 mx-0 rounded-none bg-stone-50/95 backdrop-blur-md border-b border-amber-100/50 shadow-sm'
          }
        `}
      >
        <div 
          className={`
            mx-auto px-3 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out
            ${isScrolled ? 'md:max-w-6xl md:px-6' : 'max-w-7xl'}
          `}
        >
          <div 
            className={`
              flex items-center justify-between transition-all duration-500 ease-in-out
              ${isScrolled ? 'h-14' : 'h-16'}
            `}
          >
            <a
              href="/"
              className="flex items-center space-x-2 sm:space-x-3 group"
              onClick={e => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div 
                className={`
                  bg-linear-to-br from-amber-600 to-amber-500 rounded-xl flex items-center justify-center shadow-md transition-all duration-500 ease-in-out
                  ${isScrolled ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-8 h-8 sm:w-9 sm:h-9'}
                `}
              >
                <Compass className={`text-white transition-all duration-500 ease-in-out ${isScrolled ? 'h-3.5 w-3.5 sm:h-4 sm:w-4' : 'h-4 w-4 sm:h-5 sm:w-5'} group-hover:scale-110`} />
              </div>
              <span 
                className={`
                  font-bold text-amber-800 tracking-tight transition-all duration-500 ease-in-out whitespace-nowrap
                  ${isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}
                `}
              >
                Career Compass
              </span>
            </a>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-amber-800/80 hover:text-amber-700 font-medium transition-all duration-300 hover:scale-105" onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Services
              </a>
              <Link href="/careers" className="text-amber-800/80 hover:text-amber-700 font-medium transition-all duration-300 hover:scale-105">
                Careers
              </Link>
              <a href="#ai-test" className="text-amber-800/80 hover:text-amber-700 font-medium transition-all duration-300 hover:scale-105" onClick={e => { e.preventDefault(); document.getElementById('ai-test')?.scrollIntoView({ behavior: 'smooth' }); }}>
                AI Test
              </a>
              {/* <a href="#strategies" className="text-amber-800/80 hover:text-amber-700 font-medium transition-all duration-300 hover:scale-105" onClick={e => { e.preventDefault(); document.getElementById('strategies')?.scrollIntoView({ behavior: 'smooth' }); }}>Strategies</a> */}
              <a href="#counselling" className="text-amber-800/80 hover:text-amber-700 font-medium transition-all duration-300 hover:scale-105" onClick={e => { e.preventDefault(); document.getElementById('counselling')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Counselling
              </a>
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-3">
              {user ? (
                <div className="hidden md:flex items-center space-x-3">
                  {dbUser && (
                    <Link href={`/profile`}>
                      <Button 
                        variant="ghost"
                        className={`
                          text-amber-800/80 hover:text-amber-700 hover:bg-amber-100/50 cursor-pointer transition-all duration-300 flex items-center gap-2
                          ${isScrolled ? 'text-sm px-3 py-1.5' : 'text-sm px-4 py-2'}
                        `}
                      >
                        <UserIcon className="h-4 w-4" />
                        </Button>
                    </Link>
                  )}
                  <Button 
                    variant="ghost" 
                    onClick={() => user.signOut()}
                    className={`
                      text-amber-800/80 hover:text-amber-700 hover:bg-amber-100/50 cursor-pointer transition-all duration-300
                      ${isScrolled ? 'text-sm px-3 py-1.5' : 'text-sm px-4 py-2'}
                    `}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Link href="/handler/sign-in" className="hidden md:inline-flex">
                    <Button 
                      variant="ghost" 
                      className={`
                        text-amber-800/80 hover:text-amber-700 hover:bg-amber-100/50 cursor-pointer transition-all duration-300
                        ${isScrolled ? 'text-sm px-3 py-1.5' : 'text-sm px-4 py-2'}
                      `}
                    >
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
              
              {/* Mobile profile icon - only visible when user is logged in */}
              {user && dbUser && (
                <Link href={`/profile`} className="md:hidden">
                  <button
                    className="p-2 text-amber-800 hover:bg-amber-100/50 rounded-lg transition-all duration-300"
                    aria-label="Profile"
                  >
                    <UserIcon className="h-5 w-5" />
                  </button>
                </Link>
              )}
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-amber-800 hover:bg-amber-100/50 rounded-lg transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div 
        className={`
          md:hidden fixed top-16 left-0 right-0 z-40 bg-stone-50/98 backdrop-blur-xl border-b border-amber-100/50 shadow-lg transition-all duration-300 ease-in-out overflow-hidden
          ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <nav className="px-4 py-4 space-y-2">
          <a 
            href="#services" 
            className="block py-3 px-4 text-amber-800/80 hover:text-amber-700 hover:bg-amber-100/50 rounded-lg font-medium transition-all duration-300"
            onClick={e => { e.preventDefault(); setIsMenuOpen(false); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            Services
          </a>
          <Link 
            href="/careers" 
            className="block py-3 px-4 text-amber-800/80 hover:text-amber-700 hover:bg-amber-100/50 rounded-lg font-medium transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Careers
          </Link>
          <a 
            href="#ai-test" 
            className="block py-3 px-4 text-amber-800/80 hover:text-amber-700 hover:bg-amber-100/50 rounded-lg font-medium transition-all duration-300"
            onClick={e => { e.preventDefault(); setIsMenuOpen(false); document.getElementById('ai-test')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            AI Test
          </a>
          {/* <a 
            href="#strategies" 
            className="block py-3 px-4 text-amber-800/80 hover:text-amber-700 hover:bg-amber-100/50 rounded-lg font-medium transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Strategies
          </a> */}
          <a 
            href="#counselling" 
            className="block py-3 px-4 text-amber-800/80 hover:text-amber-700 hover:bg-amber-100/50 rounded-lg font-medium transition-all duration-300"
            onClick={e => { e.preventDefault(); setIsMenuOpen(false); document.getElementById('counselling')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            Counselling
          </a>
          
          {user ? (
            <>
              <button
                onClick={() => {
                  user.signOut()
                  setIsMenuOpen(false)
                }}
                className="w-full text-left py-3 px-4 text-amber-800/80 hover:text-amber-700 hover:bg-amber-100/50 rounded-lg font-medium transition-all duration-300"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/handler/sign-in"
                className="block py-3 px-4 text-amber-800/80 hover:text-amber-700 hover:bg-amber-100/50 rounded-lg font-medium transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </>
          )}
        </nav>
      </div>
    </>
  )
}
