'use client'

import React, { useEffect, useRef } from 'react'

const SimpleDNAAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 150
    canvas.height = 300

    const drawDNA = (time: number) => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const amplitude = 30
      const frequency = 0.02
      const speed = 0.05
      const xOffset = canvas.width / 2

      ctx.beginPath()
      ctx.moveTo(xOffset, 0)

      for (let y = 0; y < canvas.height; y++) {
        const x = Math.sin(y * frequency + time * speed) * amplitude + xOffset
        ctx.lineTo(x, y)
      }

      ctx.strokeStyle = 'rgba(255, 100, 200, 0.8)'
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(xOffset, 0)

      for (let y = 0; y < canvas.height; y++) {
        const x = Math.sin(y * frequency + Math.PI + time * speed) * amplitude + xOffset
        ctx.lineTo(x, y)
      }

      ctx.strokeStyle = 'rgba(100, 200, 255, 0.8)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw base pairs
      for (let y = 0; y < canvas.height; y += 20) {
        const x1 = Math.sin(y * frequency + time * speed) * amplitude + xOffset
        const x2 = Math.sin(y * frequency + Math.PI + time * speed) * amplitude + xOffset

        ctx.beginPath()
        ctx.moveTo(x1, y)
        ctx.lineTo(x2, y)
        ctx.strokeStyle = 'rgba(200, 200, 200, 0.6)'
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    let animationFrameId: number

    const animate = (time: number) => {
      drawDNA(time / 100)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

export default SimpleDNAAnimation

