'use client'

import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

const ProteinVisualization = dynamic(
  () => import('./ProteinVisualization'),
  {
    loading: () => (
      <div className="w-full h-[600px] flex items-center justify-center bg-black/50 rounded-lg">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    ),
    ssr: false
  }
)

export default function DynamicProteinVisualization({ sequence }: { sequence: string }) {
  return <ProteinVisualization sequence={sequence} />
}

