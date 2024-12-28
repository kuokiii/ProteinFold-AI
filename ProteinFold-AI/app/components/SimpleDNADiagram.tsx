'use client'

import { motion } from 'framer-motion'

export default function SimpleDNADiagram() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-lg p-4">
      <motion.svg
        viewBox="0 0 200 400"
        className="w-full h-full max-w-[200px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* DNA Backbone 1 */}
        <motion.path
          d="M 50,0 C 150,100 50,200 150,300 L 150,400"
          fill="none"
          stroke="rgb(147, 197, 253)"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* DNA Backbone 2 */}
        <motion.path
          d="M 150,0 C 50,100 150,200 50,300 L 50,400"
          fill="none"
          stroke="rgb(244, 114, 182)"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Base pairs */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <motion.line
            key={i}
            x1="50"
            y1={50 + i * 50}
            x2="150"
            y2={50 + i * 50}
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="2"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
          />
        ))}
      </motion.svg>
    </div>
  )
}

