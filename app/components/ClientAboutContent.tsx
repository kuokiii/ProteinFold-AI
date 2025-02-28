"use client"

import { motion } from "framer-motion"

export default function ClientAboutContent() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-display">
          About ProteinFold AI
        </h1>
        <div className="grid gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed">
              At ProteinFold AI, we are dedicated to revolutionizing the field of protein structure prediction and drug
              discovery. Our mission is to accelerate scientific research and pharmaceutical development by providing
              cutting-edge AI-driven tools for protein analysis.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400">
              Our Technology
            </h2>
            <p className="text-gray-300 mb-4">
              We leverage state-of-the-art deep learning models and molecular modeling techniques to predict protein
              structures with high accuracy. Our platform integrates:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Advanced neural networks inspired by AlphaFold architecture</li>
              <li>Attention-based models for improved prediction accuracy</li>
              <li>Comprehensive bioinformatics tools for data analysis</li>
              <li>3D visualization capabilities for intuitive understanding of protein structures</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              Our Impact
            </h2>
            <p className="text-gray-300 mb-4">
              ProteinFold AI is making significant contributions to the scientific community:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Accelerating drug discovery processes</li>
              <li>Enhancing understanding of protein-drug interactions</li>
              <li>Reducing time and costs associated with traditional experimental methods</li>
              <li>Facilitating breakthroughs in structural biology and biochemistry</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </main>
  )
}

