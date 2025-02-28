"use client"

import { motion } from "framer-motion"

const publications = [
  {
    title: "Deep learning for protein structure prediction",
    authors: "Smith, J., Johnson, A., Williams, M.",
    journal: "Nature Biotechnology",
    year: 2023,
    doi: "10.1038/s41587-023-0001-2",
  },
  {
    title: "Advancements in protein-drug interaction prediction using AI",
    authors: "Brown, R., Davis, L., Wilson, K.",
    journal: "Journal of Medicinal Chemistry",
    year: 2022,
    doi: "10.1021/acs.jmedchem.2c00123",
  },
  {
    title: "Improving accuracy of protein folding algorithms",
    authors: "Lee, S., Garcia, M., Taylor, N.",
    journal: "Bioinformatics",
    year: 2023,
    doi: "10.1093/bioinformatics/btad123",
  },
  {
    title: "Machine learning approaches in structural biology",
    authors: "Anderson, P., Murphy, C., Thompson, E.",
    journal: "Current Opinion in Structural Biology",
    year: 2022,
    doi: "10.1016/j.sbi.2022.05.008",
  },
  {
    title: "Novel methods for visualizing protein structures in 3D",
    authors: "White, R., Black, S., Green, T.",
    journal: "Scientific Reports",
    year: 2023,
    doi: "10.1038/s41598-023-12345-6",
  },
]

export default function ClientPublicationsContent() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-white font-display">Research Publications</h1>
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {publications.map((pub, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-md text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h2 className="text-xl font-semibold mb-2 text-white font-display">{pub.title}</h2>
            <p className="text-gray-300 mb-2 font-body">{pub.authors}</p>
            <p className="text-gray-400 mb-2 font-body">
              {pub.journal}, {pub.year}
            </p>
            <a
              href={`https://doi.org/${pub.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline font-body"
            >
              DOI: {pub.doi}
            </a>
          </motion.div>
        ))}
      </motion.div>
    </main>
  )
}

