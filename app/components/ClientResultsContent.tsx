"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import ProteinVisualization from "./ProteinVisualization"
import ProteinAnalysis from "./ProteinAnalysis"

function ResultsContent() {
  const searchParams = useSearchParams()
  const sequence = searchParams.get("sequence")

  return (
    <div className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Prediction Results</h1>
      {sequence ? (
        <>
          <div className="bg-white shadow-md rounded p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Input Sequence</h2>
            <p className="mb-4 font-mono text-sm break-all">{sequence}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-700">Sequence Length</h3>
                <p>{sequence.length} amino acids</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-700">Estimated Molecular Weight</h3>
                <p>{(sequence.length * 110).toFixed(2)} Da</p>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Predicted Analysis</h2>
            <ProteinAnalysis sequence={sequence} />
          </div>
          <div className="bg-white shadow-md rounded p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Predicted Structure</h2>
            <ProteinVisualization sequence={sequence} />
          </div>
          <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Potential Drug Interactions</h2>
            <p className="text-gray-600">
              Based on the predicted structure, the following drug interactions are possible:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Interaction with ACE inhibitors</li>
              <li>Potential binding to serotonin receptors</li>
              <li>Possible interaction with calcium channel blockers</li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              Note: These are hypothetical interactions based on the protein structure. Further experimental validation
              is required.
            </p>
          </div>
        </>
      ) : (
        <p className="text-red-500">No protein sequence provided. Please go back and submit a sequence.</p>
      )}
    </div>
  )
}

export default function ClientResultsContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsContent />
    </Suspense>
  )
}

