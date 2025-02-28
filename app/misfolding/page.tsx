"use client"

import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import MisfoldingExplorer from "../components/MisfoldingExplorer"
import PyMOLViewer from "../components/PyMOLViewer"
import DiseaseCase from "../components/DiseaseCase"
import { Brain, Dna, Microscope, AlertTriangle } from "lucide-react"

export default function MisfoldingPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
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
              className="text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 font-display"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Protein Misfolding & Disease
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto font-body"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explore how protein misfolding contributes to neurodegenerative diseases and other disorders using
              advanced computational models and PyMOL visualization.
            </motion.p>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Dna size={18} />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="explorer" className="flex items-center gap-2">
                <Microscope size={18} />
                <span>Misfolding Explorer</span>
              </TabsTrigger>
              <TabsTrigger value="pymol" className="flex items-center gap-2">
                <Brain size={18} />
                <span>PyMOL Viewer</span>
              </TabsTrigger>
              <TabsTrigger value="diseases" className="flex items-center gap-2">
                <AlertTriangle size={18} />
                <span>Disease Cases</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <motion.div
                className="bg-white/10 backdrop-blur-lg rounded-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-4 text-white">Understanding Protein Misfolding</h2>
                <p className="text-gray-300 mb-4">
                  Proteins must fold into specific three-dimensional structures to function properly. When proteins fail
                  to fold correctly or maintain their structure, they can form aggregates that are toxic to cells,
                  leading to various diseases.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white/5 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-white">Normal Protein Folding</h3>
                    <p className="text-gray-300">
                      In normal conditions, proteins fold into their native structure through a process guided by
                      molecular chaperones and the amino acid sequence itself. This precise folding is essential for the
                      protein to perform its biological function.
                    </p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-white">Misfolding Mechanisms</h3>
                    <p className="text-gray-300">
                      Protein misfolding can occur due to genetic mutations, environmental factors, aging, or errors in
                      the folding process. Misfolded proteins often expose hydrophobic regions that should be buried,
                      leading to aggregation.
                    </p>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="explorer">
              <MisfoldingExplorer />
            </TabsContent>

            <TabsContent value="pymol">
              <PyMOLViewer />
            </TabsContent>

            <TabsContent value="diseases">
              <div className="space-y-8">
                <DiseaseCase
                  disease="Alzheimer's Disease"
                  proteins={["Amyloid-β (Aβ)", "Tau"]}
                  mechanism="Formation of extracellular amyloid plaques and intracellular neurofibrillary tangles"
                />
                <DiseaseCase
                  disease="Parkinson's Disease"
                  proteins={["α-Synuclein"]}
                  mechanism="Aggregation of α-synuclein into Lewy bodies in dopaminergic neurons"
                />
                <DiseaseCase
                  disease="Huntington's Disease"
                  proteins={["Huntingtin (HTT)"]}
                  mechanism="Expanded polyglutamine repeats cause protein misfolding and aggregation"
                />
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

