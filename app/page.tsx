"use client"

import Header from "./components/Header"
import Footer from "./components/Footer"
import { Button } from "./components/ui/Button"
import { ArrowRight, Zap, Database, Microscope, Share2, Brain } from "lucide-react"
import BiologyBackground from "./components/BiologyBackground"
import ClientFeatures from "./components/ClientFeatures"

const features = [
  {
    title: "Accurate Predictions",
    description: "State-of-the-art deep learning models for high-precision protein structure predictions.",
    icon: Zap,
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    title: "Drug Interaction Analysis",
    description: "Comprehensive analysis of potential drug-protein interactions to accelerate drug discovery.",
    icon: Database,
    color: "bg-gradient-to-br from-green-500 to-green-600",
  },
  {
    title: "3D Visualization",
    description: "Interactive 3D visualizations of molecular structures for intuitive understanding.",
    icon: Microscope,
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
  },
  {
    title: "External Database Integration",
    description: "Seamless integration with external drug databases for comprehensive analysis.",
    icon: Share2,
    color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
  },
  {
    title: "User-Friendly Interface",
    description: "Intuitive interface designed for both researchers and pharmaceutical professionals.",
    icon: ArrowRight,
    color: "bg-gradient-to-br from-pink-500 to-pink-600",
  },
  {
    title: "Advanced AI Algorithms",
    description: "Continuously improving AI algorithms to stay at the forefront of protein structure prediction.",
    icon: Brain,
    color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 overflow-hidden">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 relative">
        <BiologyBackground />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob -top-32 -left-32"></div>
          <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000 top-32 -right-32"></div>
          <div className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-32 left-32"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 items-center mb-16 relative">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-tight font-display text-center">
              Revolutionizing Protein Structure Prediction
            </h1>
            <p className="mb-8 text-xl text-gray-300 leading-relaxed font-body text-center max-w-3xl mx-auto">
              ProteinFold AI leverages cutting-edge <span className="text-blue-400 font-semibold">deep learning</span>{" "}
              models and <span className="text-purple-400 font-semibold">molecular modeling</span> techniques to
              accelerate drug discovery and enhance therapeutic design.
            </p>
            <div className="flex justify-center space-x-4">
              <Button href="/predict" size="lg">
                Start Predicting <ArrowRight className="ml-2 inline-block" />
              </Button>
              <Button
                href="/about"
                variant="outline"
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        <ClientFeatures features={features} />
      </main>
      <Footer />
    </div>
  )
}

