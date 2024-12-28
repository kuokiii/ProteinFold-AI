'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import ProteinInput from '../components/ProteinInput'
import { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

// Dynamically import heavy components
const ProteinVisualization = dynamic(() => import('../components/ProteinVisualization'), {
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-black/50 rounded-lg">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
    </div>
  ),
  ssr: false
})

const ProteinAnalysis = dynamic(() => import('../components/ProteinAnalysis'), {
  loading: () => (
    <div className="w-full h-64 flex items-center justify-center bg-black/50 rounded-lg">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
    </div>
  )
})

export default function Predict() {
  const [sequence, setSequence] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-center font-display"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Protein Structure Prediction
          </motion.h1>
          <motion.p 
            className="mb-8 text-xl text-gray-300 leading-relaxed font-body text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Enter a <span className="text-blue-400 font-semibold">protein sequence</span> below to predict its structure and analyze its <span className="text-purple-400 font-semibold">properties</span> using our advanced <span className="text-pink-400 font-semibold">AI models</span>.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <ProteinInput onSubmit={setSequence} />
          </motion.div>

          {sequence && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <section>
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-display">
                  3D Structure Visualization
                </h2>
                <Suspense fallback={<Loader2 className="w-8 h-8 animate-spin text-blue-500" />}>
                  <ProteinVisualization sequence={sequence} />
                </Suspense>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-display">
                  Comprehensive Analysis
                </h2>
                <Suspense fallback={<Loader2 className="w-8 h-8 animate-spin text-blue-500" />}>
                  <ProteinAnalysis sequence={sequence} />
                </Suspense>
              </section>
            </motion.div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

