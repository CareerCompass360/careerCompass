"use client"

import { Button } from "@/components/ui/button"
import { Compass, User as UserIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useUser } from "@stackframe/stack"
import { useProfile } from "@/lib/useProfile"
import Link from "next/link"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const user = useUser()
  const { user: dbUser } = useProfile()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
        ${isScrolled 
          ? 'mt-4 mx-8 rounded-2xl bg-stone-50/96 backdrop-blur-xl border-2 border-amber-200/40 shadow-2xl shadow-amber-200/30' 
          : 'mt-0 mx-0 rounded-none bg-stone-50/95 backdrop-blur-md border-b border-amber-100/50 shadow-sm'
        }
      `}
    >
      <div 
        className={`
          mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out
          ${isScrolled ? 'max-w-6xl px-6' : 'max-w-7xl'}
        `}
      >
        <div 
          className={`
            flex items-center justify-between transition-all duration-500 ease-in-out
            ${isScrolled ? 'h-14' : 'h-16'}
          `}
        >
          <div className="flex items-center space-x-3">
            <div 
              className={`
                bg-linear-to-br from-amber-600 to-amber-500 rounded-xl flex items-center justify-center shadow-md transition-all duration-500 ease-in-out
                ${isScrolled ? 'w-8 h-8' : 'w-9 h-9'}
              `}
            >
              <Compass className={`text-white transition-all duration-500 ease-in-out ${isScrolled ? 'h-4 w-4' : 'h-5 w-5'}`} />
            </div>
            <span 
              className={`
                font-bold text-amber-800 tracking-tight transition-all duration-500 ease-in-out
                ${isScrolled ? 'text-lg' : 'text-xl'}
              `}
            >
              Career Compass
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#careers" className="text-amber-800/80 hover:text-amber-700 font-medium transition-all duration-300 hover:scale-105">
              About
            </a>
            <Link href="/careers" className="text-amber-800/80 hover:text-amber-700 font-medium transition-all duration-300 hover:scale-105">
              Careers
            </Link>
            <a href="#ai-test" className="text-amber-800/80 hover:text-amber-700 font-medium transition-all duration-300 hover:scale-105">
              AI Test
            </a>
            <a href="#strategies" className="text-amber-800/80 hover:text-amber-700 font-medium transition-all duration-300 hover:scale-105">
              Strategies
            </a>
            <a href="#counselling" className="text-amber-800/80 hover:text-amber-700 font-medium transition-all duration-300 hover:scale-105">
              Counselling
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                {dbUser && (
                  <Link href={`/${dbUser.username}`}>
                    <Button 
                      variant="ghost"
                      className={`
                        text-amber-800/80 hover:text-amber-700 hover:bg-amber-100/50 cursor-pointer transition-all duration-300 flex items-center gap-2
                        ${isScrolled ? 'text-sm px-3 py-1.5' : 'text-sm px-4 py-2'}
                      `}
                    >
                      <UserIcon className="h-4 w-4" />
                      Profile
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
                <Link href="/handler/sign-in">
                  <Button 
                    variant="ghost" 
                    className={`
                      hidden md:inline-flex text-amber-800/80 hover:text-amber-700 hover:bg-amber-100/50 cursor-pointer transition-all duration-300
                      ${isScrolled ? 'text-sm px-3 py-1.5' : 'text-sm px-4 py-2'}
                    `}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/handler/sign-up">
                  <Button 
                    className={`
                      bg-linear-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer
                      ${isScrolled ? 'px-4 py-1.5 text-sm' : 'px-6 py-2 text-sm'}
                    `}
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
