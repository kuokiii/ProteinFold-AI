'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Feature {
  title: string
  description: string
  icon: React.ElementType
  color: string
}

interface ClientFeaturesProps {
  features: Feature[]
}

export default function ClientFeatures({ features }: ClientFeaturesProps) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-display">
        Key Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onHoverStart={() => setHoveredFeature(index)}
            onHoverEnd={() => setHoveredFeature(null)}
            className={`relative ${feature.color} p-6 rounded-xl shadow-xl backdrop-blur-lg bg-opacity-10 overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105`}
          >
            <AnimatePresence>
              {hoveredFeature === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white"
                />
              )}
            </AnimatePresence>

            <motion.div
              animate={hoveredFeature === index ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <div className="text-4xl mb-4 text-white">
                <feature.icon size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white font-display">
                {feature.title}
              </h3>
              <p className="text-gray-300 font-body">
                {feature.description}
              </p>
            </motion.div>

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
              animate={hoveredFeature === index ? 
                { 
                  x: ['0%', '100%'],
                  opacity: [0, 1, 0]
                } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop'
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

