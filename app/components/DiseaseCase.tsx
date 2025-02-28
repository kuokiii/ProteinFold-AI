"use client"

import { motion } from "framer-motion"

interface DiseaseCaseProps {
  disease: string
  proteins: string[]
  mechanism: string
}

export default function DiseaseCase({ disease, proteins, mechanism }: DiseaseCaseProps) {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-lg rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-4 text-white">{disease}</h3>
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-purple-300">Involved Proteins:</h4>
          <ul className="list-disc list-inside text-gray-300">
            {proteins.map((protein, index) => (
              <li key={index}>{protein}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-purple-300">Misfolding Mechanism:</h4>
          <p className="text-gray-300">{mechanism}</p>
        </div>
      </div>
    </motion.div>
  )
}

