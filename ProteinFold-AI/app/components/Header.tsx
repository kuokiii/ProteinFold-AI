'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dna, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Predict', href: '/predict' },
    { name: 'Proteins', href: '/proteins' },
    { name: 'Publications', href: '/publications' },
    { name: 'About', href: '/about' },
    { name: 'Dashboard', href: '/dashboard' },
  ]

  return (
    <header className="bg-gradient-to-r from-green-50 to-white shadow-lg backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Dna size={32} className="text-green-600 group-hover:text-green-500 transition-colors" />
            </motion.div>
            <span className="text-xl font-bold text-green-600">
              ProteinFold AI
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 rounded-lg transition-colors ${
                  pathname === item.href 
                    ? 'text-green-600' 
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {pathname === item.href && (
                  <motion.div
                    className="absolute inset-0 bg-green-50 rounded-lg"
                    layoutId="nav-highlight"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden text-green-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.nav 
            className="md:hidden py-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  )
}

