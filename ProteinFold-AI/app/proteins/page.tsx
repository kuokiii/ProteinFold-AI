'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProteinTable from '../components/ProteinTable'
import { motion } from 'framer-motion'
import { Beaker, Filter, Download } from 'lucide-react'

export default function Proteins() {
  const [view, setView] = useState<'table' | 'grid'>('table')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <motion.h1 
              className="text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 font-display"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Protein Database
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto font-body"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explore our comprehensive collection of protein structures and their properties. 
              Use the search and filter options to find specific proteins.
            </motion.p>
          </div>

          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setView('table')}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    view === 'table' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Filter size={20} />
                  Table View
                </button>
                <button
                  onClick={() => setView('grid')}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    view === 'grid' 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Beaker size={20} />
                  Grid View
                </button>
              </div>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
              >
                <Download size={20} />
                Export Data
              </button>
            </div>
            <ProteinTable view={view} />
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

