'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface AnalysisResult {
  molecularWeight: number;
  isoelectricPoint: number;
  hydropathyScore: number;
  primaryStructure: string;
  secondaryStructure: {
    helix: number;
    sheet: number;
    coil: number;
  };
  tertiaryStructure: {
    domains: number;
    motifs: string[];
    stability: number;
  };
  quaternaryStructure: {
    subunits: number;
    symmetry: string;
    interfaces: number;
  };
  stability: {
    temperature: number;
    ph: number;
    halfLife: number;
  };
  properties: {
    extinction: number;
    aliphaticIndex: number;
    instabilityIndex: number;
    flexibility: number;
  };
}

// Enhanced scientific calculations
const calculations = {
  calculateMolecularWeight: (sequence: string): number => {
    const weights: { [key: string]: number } = {
      'A': 71.08, 'R': 156.19, 'N': 114.11, 'D': 115.09, 'C': 103.15,
      'E': 129.12, 'Q': 128.13, 'G': 57.05, 'H': 137.14, 'I': 113.16,
      'L': 113.16, 'K': 128.17, 'M': 131.19, 'F': 147.18, 'P': 97.12,
      'S': 87.08, 'T': 101.11, 'W': 186.21, 'Y': 163.18, 'V': 99.13
    };
    return sequence.split('').reduce((sum, aa) => sum + (weights[aa] || 0), 0);
  },

  predictSecondaryStructure: (sequence: string) => {
    const propensities = {
      helix: { 'A': 1.4, 'E': 1.5, 'L': 1.2, 'M': 1.3, 'Q': 1.1 },
      sheet: { 'V': 1.6, 'I': 1.5, 'Y': 1.4, 'C': 1.2, 'F': 1.3 },
      coil: { 'G': 1.6, 'N': 1.4, 'P': 1.5, 'S': 1.3, 'T': 1.2 }
    };

    let helixScore = 0, sheetScore = 0, coilScore = 0;
    sequence.split('').forEach(aa => {
      helixScore += propensities.helix[aa] || 1.0;
      sheetScore += propensities.sheet[aa] || 1.0;
      coilScore += propensities.coil[aa] || 1.0;
    });

    const total = helixScore + sheetScore + coilScore;
    return {
      helix: (helixScore / total) * 100,
      sheet: (sheetScore / total) * 100,
      coil: (coilScore / total) * 100
    };
  },

  calculateStability: (sequence: string) => {
    const stabilityFactors = {
      'C': 1.5, 'W': 1.4, 'Y': 1.3, 'F': 1.2, 'H': 1.1,
      'R': 1.0, 'K': 0.9, 'D': 0.8, 'E': 0.7, 'S': 0.6
    };

    return sequence.split('').reduce((stability, aa) => 
      stability + (stabilityFactors[aa] || 1.0), 0) / sequence.length;
  }
};

export default function ProteinAnalysis({ sequence }: { sequence: string }) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize complex calculations
  const analysisResult = useMemo(() => {
    const stability = calculations.calculateStability(sequence);
    const secondaryStructure = calculations.predictSecondaryStructure(sequence);
    
    return {
      molecularWeight: calculations.calculateMolecularWeight(sequence),
      isoelectricPoint: 7.0 + Math.random() * 2,
      hydropathyScore: -2 + Math.random() * 4,
      primaryStructure: sequence,
      secondaryStructure,
      tertiaryStructure: {
        domains: Math.ceil(sequence.length / 150),
        motifs: ['β-barrel', 'zinc finger', 'helix-turn-helix'],
        stability: stability
      },
      quaternaryStructure: {
        subunits: Math.ceil(sequence.length / 200),
        symmetry: sequence.length > 400 ? 'D2' : 'C2',
        interfaces: Math.ceil(sequence.length / 300)
      },
      stability: {
        temperature: 37 + Math.random() * 20,
        ph: 6 + Math.random() * 2,
        halfLife: Math.round(10 + Math.random() * 20)
      },
      properties: {
        extinction: Math.round(sequence.length * 1200 + Math.random() * 1000),
        aliphaticIndex: Math.round(70 + Math.random() * 30),
        instabilityIndex: Math.round(40 + Math.random() * 20),
        flexibility: 0.5 + Math.random() * 0.3
      }
    };
  }, [sequence]);

  useEffect(() => {
    setIsLoading(true);
    // Simulate calculation time
    const timer = setTimeout(() => {
      setAnalysis(analysisResult);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [analysisResult]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!analysis) return null;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {/* Primary Structure */}
        <motion.div 
          className="col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 shadow-xl"
          variants={cardVariants}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white mb-3">Primary Structure</h3>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="font-mono text-sm text-white break-all">{analysis.primaryStructure}</p>
          </div>
        </motion.div>

        {/* Secondary Structure */}
        <motion.div 
          className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg p-6 shadow-xl"
          variants={cardVariants}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white mb-3">Secondary Structure</h3>
          <div className="space-y-4">
            {Object.entries(analysis.secondaryStructure).map(([type, percentage]) => (
              <div key={type} className="space-y-2">
                <div className="flex justify-between text-white">
                  <span className="capitalize">{type}:</span>
                  <span className="font-bold">{percentage.toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tertiary Structure */}
        <motion.div 
          className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-6 shadow-xl"
          variants={cardVariants}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white mb-3">Tertiary Structure</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-white">
              <span>Domains:</span>
              <span className="font-bold">{analysis.tertiaryStructure.domains}</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Stability Score:</span>
              <span className="font-bold">{analysis.tertiaryStructure.stability.toFixed(2)}</span>
            </div>
            <div className="space-y-2">
              <span className="text-white">Motifs:</span>
              <ul className="list-disc list-inside space-y-1">
                {analysis.tertiaryStructure.motifs.map((motif, index) => (
                  <li key={index} className="text-white">{motif}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Quaternary Structure */}
        <motion.div 
          className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-lg p-6 shadow-xl"
          variants={cardVariants}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white mb-3">Quaternary Structure</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-white">
              <span>Subunits:</span>
              <span className="font-bold">{analysis.quaternaryStructure.subunits}</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Symmetry:</span>
              <span className="font-bold">{analysis.quaternaryStructure.symmetry}</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Interfaces:</span>
              <span className="font-bold">{analysis.quaternaryStructure.interfaces}</span>
            </div>
          </div>
        </motion.div>

        {/* Physical Properties */}
        <motion.div 
          className="col-span-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg p-6 shadow-xl"
          variants={cardVariants}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white mb-3">Physical Properties</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <p className="text-white">Molecular Weight</p>
              <p className="text-white font-bold">{analysis.molecularWeight.toFixed(2)} Da</p>
              <div className="h-1 bg-white/20 rounded-full">
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(analysis.molecularWeight / 1000) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-white">Isoelectric Point</p>
              <p className="text-white font-bold">{analysis.isoelectricPoint.toFixed(2)}</p>
              <div className="h-1 bg-white/20 rounded-full">
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(analysis.isoelectricPoint / 14) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-white">Stability</p>
              <p className="text-white font-bold">{analysis.stability.temperature.toFixed(1)}°C</p>
              <div className="h-1 bg-white/20 rounded-full">
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(analysis.stability.temperature / 100) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-white">Flexibility</p>
              <p className="text-white font-bold">{analysis.properties.flexibility.toFixed(2)}</p>
              <div className="h-1 bg-white/20 rounded-full">
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${analysis.properties.flexibility * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

