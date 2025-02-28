"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/Button"
import { Loader2 } from "lucide-react"
import dynamic from "next/dynamic"

const ProteinVisualization = dynamic(() => import("./ProteinVisualization"), {
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-black/50 rounded-lg">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
    </div>
  ),
  ssr: false,
})

const proteins = [
  {
    id: "amyloid",
    name: "Amyloid-β",
    normalSequence: "DAEFRHDSGYEVHHQKLVFFAEDVGSNKGAIIGLMVGGVVIA",
    misfoldedSequence: "DAEFRHDSGYEVHHQKLVFFAEDVGSNKGAIIGLMVGGVVIA", // Same sequence, different folding
  },
  {
    id: "tau",
    name: "Tau",
    normalSequence: "MAEPRQEFEVMEDHAGTYGLGDRKDQGGYTMHQDQEGDTDAGLK",
    misfoldedSequence: "MAEPRQEFEVMEDHAGTYGLGDRKDQGGYTMHQDQEGDTDAGLK", // Same sequence, different folding
  },
  {
    id: "synuclein",
    name: "α-Synuclein",
    normalSequence: "MDVFMKGLSKAKEGVVAAAEKTKQGVAEAAGKTKEGVLYVGSKTKEGVVHGVATVAEKTK",
    misfoldedSequence: "MDVFMKGLSKAKEGVVAAAEKTKQGVAEAAGKTKEGVLYVGSKTKEGVVHGVATVAEKTK", // Same sequence, different folding
  },
]

export default function MisfoldingExplorer() {
  const [selectedProtein, setSelectedProtein] = useState(proteins[0])
  const [showMisfolded, setShowMisfolded] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4">
        {proteins.map((protein) => (
          <Button
            key={protein.id}
            onClick={() => setSelectedProtein(protein)}
            variant={selectedProtein.id === protein.id ? "primary" : "secondary"}
          >
            {protein.name}
          </Button>
        ))}
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">{selectedProtein.name}</h2>
        <div className="flex justify-between mb-4">
          <Button onClick={() => setShowMisfolded(false)} variant={!showMisfolded ? "primary" : "secondary"}>
            Normal Structure
          </Button>
          <Button onClick={() => setShowMisfolded(true)} variant={showMisfolded ? "primary" : "secondary"}>
            Misfolded Structure
          </Button>
        </div>
        <ProteinVisualization
          sequence={showMisfolded ? selectedProtein.misfoldedSequence : selectedProtein.normalSequence}
          isMisfolded={showMisfolded}
        />
      </div>

      <motion.div
        className="bg-white/10 backdrop-blur-lg rounded-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-bold mb-4 text-white">Misfolding Explanation</h3>
        <p className="text-gray-300">
          {showMisfolded
            ? `In the misfolded state, ${selectedProtein.name} adopts an abnormal conformation that can lead to aggregation and disease. This misfolding exposes hydrophobic regions that are normally buried, promoting the formation of toxic aggregates.`
            : `The normal structure of ${selectedProtein.name} is essential for its proper function in the body. This conformation is stabilized by various interactions and is carefully maintained by cellular machinery.`}
        </p>
      </motion.div>
    </div>
  )
}

