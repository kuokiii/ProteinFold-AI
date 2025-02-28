"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/Button"
import { motion } from "framer-motion"
import AminoAcidLegend from "./AminoAcidLegend"

interface ProteinInputProps {
  onSubmit: (sequence: string) => void
}

export default function ProteinInput({ onSubmit }: ProteinInputProps) {
  const [sequence, setSequence] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to predict protein structure
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    onSubmit(sequence)
  }

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
      whileHover={{ boxShadow: "0 0 15px rgba(0,0,0,0.2)" }}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 font-display" htmlFor="sequence">
            Protein Sequence
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono"
            id="sequence"
            placeholder="Enter protein sequence (e.g., MVLSEGEWQLVLHVWAKVEADVAGHGQDILIRLFKSHPETLEKFDRFKHLKTEAEMKASEDLKKHGVTVLTALGAILKKKGHHEAELKPLAQSHATKHKIPIKYLEFISEAIIHVLHSRHPGNFGADAQGAMNKALELFRKDIAAKYKELGYQG)"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            rows={4}
            required
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <Button type="submit" disabled={isLoading} variant="primary" size="lg">
            {isLoading ? "Predicting..." : "Predict Structure"}
          </Button>
        </div>
      </form>
      <AminoAcidLegend />
    </motion.div>
  )
}

