"use client"

import { motion } from "framer-motion"
import { Dna, Microscope, FlaskRoundIcon as Flask, Zap, Database, Share2, FileCode2, ChevronRight } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const features = [
  {
    name: "Protein Structure Prediction",
    icon: Dna,
    description: "Utilizes advanced AI models to predict 3D structures of proteins from their amino acid sequences.",
  },
  {
    name: "3D Visualization",
    icon: Microscope,
    description: "Interactive 3D rendering of predicted protein structures for in-depth analysis.",
  },
  {
    name: "Protein Analysis",
    icon: Flask,
    description:
      "Comprehensive analysis of protein properties, including molecular weight, isoelectric point, and hydropathy.",
  },
  {
    name: "Drug Interaction Prediction",
    icon: Zap,
    description: "Predicts potential interactions between proteins and various drugs to aid in drug discovery.",
  },
  {
    name: "Protein Database",
    icon: Database,
    description: "Maintains a searchable database of protein structures and their properties.",
  },
  {
    name: "Data Export",
    icon: Share2,
    description: "Allows users to export analysis results and 3D models for further research.",
  },
]

const scripts = [
  {
    name: "Sequence Validator",
    file: "sequence_validator.py",
    description: "Validates protein sequences to ensure they contain only valid amino acids.",
  },
  {
    name: "Molecular Weight Calculator",
    file: "molecular_weight_calculator.py",
    description: "Calculates the molecular weight of a given protein sequence.",
  },
  {
    name: "Isoelectric Point Estimator",
    file: "isoelectric_point_estimator.py",
    description: "Estimates the isoelectric point of a protein based on its amino acid composition.",
  },
  {
    name: "Hydropathy Profile Generator",
    file: "hydropathy_profile_generator.py",
    description:
      "Generates a hydropathy profile for a protein sequence to analyze its hydrophobic and hydrophilic regions.",
  },
  {
    name: "Secondary Structure Predictor",
    file: "secondary_structure_predictor.py",
    description: "Predicts the secondary structure elements (alpha helices, beta sheets) of a protein.",
  },
  {
    name: "Protein BLAST Simulator",
    file: "protein_blast_simulator.py",
    description: "Simulates BLAST results for protein sequence similarity searches.",
  },
  {
    name: "Protein-Ligand Scorer",
    file: "protein_ligand_scorer.py",
    description: "Scores potential interactions between proteins and ligands for drug discovery applications.",
  },
  {
    name: "Protein Stability Predictor",
    file: "protein_stability_predictor.py",
    description: "Predicts the stability of a protein based on its sequence properties.",
  },
  {
    name: "Subcellular Localization Predictor",
    file: "subcellular_localization_predictor.py",
    description: "Predicts the subcellular localization of a protein within a cell.",
  },
  {
    name: "Protein Interaction Predictor",
    file: "protein_interaction_predictor.py",
    description: "Predicts potential protein-protein interactions based on sequence information.",
  },
  {
    name: "Protein Disorder Predictor",
    file: "protein_disorder_predictor.py",
    description: "Identifies potentially disordered regions in a protein sequence.",
  },
  {
    name: "Structural Classification Predictor",
    file: "structural_classification_predictor.py",
    description: "Predicts the structural classification of a protein (e.g., all-alpha, all-beta).",
  },
  {
    name: "Protein Function Predictor",
    file: "protein_function_predictor.py",
    description: "Predicts potential functions of a protein based on its sequence.",
  },
  {
    name: "Evolutionary Conservation Analyzer",
    file: "evolutionary_conservation_analyzer.py",
    description: "Analyzes the evolutionary conservation of a protein sequence across species.",
  },
  {
    name: "Protein-Drug Interaction Predictor",
    file: "protein_drug_interaction_predictor.py",
    description: "Predicts potential interactions between proteins and various drugs.",
  },
]

export default function Report() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <motion.h1
          className="text-5xl font-bold mb-8 text-center text-gray-800 font-display"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ProteinFold AI Project Report
        </motion.h1>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-gray-700">Project Overview</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            ProteinFold AI is a cutting-edge platform that leverages artificial intelligence and molecular modeling
            techniques to revolutionize protein structure prediction and drug discovery. Our project aims to accelerate
            scientific research and pharmaceutical development by providing advanced tools for protein analysis and
            visualization.
          </p>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-gray-700">Frontend Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-gray-700">Backend Scripts</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ul className="space-y-4">
              {scripts.map((script, index) => (
                <motion.li
                  key={script.name}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <FileCode2 className="w-6 h-6 text-secondary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{script.name}</h3>
                    <p className="text-gray-600">{script.description}</p>
                    <p className="text-sm text-gray-500 mt-1">File: {script.file}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
          <h2 className="text-3xl font-semibold mb-4 text-gray-700">Technology Stack</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ul className="space-y-2">
              <li className="flex items-center">
                <ChevronRight className="w-5 h-5 text-primary mr-2" /> Next.js 14 for server-side rendering and routing
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-5 h-5 text-primary mr-2" /> React 18 for building user interfaces
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-5 h-5 text-primary mr-2" /> TypeScript for type-safe JavaScript
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-5 h-5 text-primary mr-2" /> Tailwind CSS for responsive and customizable
                styling
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-5 h-5 text-primary mr-2" /> Framer Motion for smooth animations
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-5 h-5 text-primary mr-2" /> Three.js and React Three Fiber for 3D protein
                visualization
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-5 h-5 text-primary mr-2" /> Python for backend scripts and data processing
              </li>
            </ul>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  )
}

