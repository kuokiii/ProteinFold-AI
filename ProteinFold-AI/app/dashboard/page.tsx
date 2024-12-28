'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button } from '../components/ui/Button'
import DynamicProteinVisualization from '../components/DynamicProteinVisualization'
import ProteinAnalysis from '../components/ProteinAnalysis'
import { motion } from 'framer-motion'
import AminoAcidLegend from '../components/AminoAcidLegend';
import { Download } from 'lucide-react';

interface SavedProtein {
  id: string;
  name: string;
  sequence: string;
}

export default function Dashboard() {
  const [savedProteins, setSavedProteins] = useState<SavedProtein[]>([])
  const [selectedProtein, setSelectedProtein] = useState<SavedProtein | null>(null)

  useEffect(() => {
    // In a real application, this would fetch from an API or local storage
    const mockSavedProteins: SavedProtein[] = [
      { id: '1', name: 'Protein A', sequence: 'MVLSEGEWQLVLHVWAKVEADVAGHGQDILIR' },
      { id: '2', name: 'Protein B', sequence: 'VLSPADKTNVKAAWGKVGAHAGEYGAEALERMF' },
      { id: '3', name: 'Protein C', sequence: 'MNIFEMLRIDEGLRLKIYKDTEGYYTIGIGHLL' },
    ]
    setSavedProteins(mockSavedProteins)
  }, [])

  const exportAnalysis = () => {
    if (!selectedProtein) return;
    
    const analysisData = {
      name: selectedProtein.name,
      sequence: selectedProtein.sequence,
      // Add more analysis data here as needed
    };
    
    const blob = new Blob([JSON.stringify(analysisData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedProtein.name}_analysis.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-display"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          User Dashboard
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <motion.div 
            className="col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Saved Proteins</h2>
            <ul className="space-y-2">
              {savedProteins.map((protein) => (
                <li key={protein.id}>
                  <Button
                    onClick={() => setSelectedProtein(protein)}
                    variant={selectedProtein?.id === protein.id ? 'primary' : 'outline'}
                    className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-white/20"
                  >
                    {protein.name}
                  </Button>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            className="col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {selectedProtein ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800">{selectedProtein.name}</h2>
                  <Button onClick={exportAnalysis} className="flex items-center gap-2">
                    <Download size={16} />
                    Export Analysis
                  </Button>
                </div>
                <div className="mb-8 bg-black/50 rounded-lg p-4">
                  <h3 className="text-xl font-semibold mb-2 text-white">3D Visualization</h3>
                  <DynamicProteinVisualization sequence={selectedProtein.sequence} />
                  <AminoAcidLegend />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Protein Analysis</h3>
                  <ProteinAnalysis sequence={selectedProtein.sequence} />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-xl text-white">Select a protein to view its details</p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

