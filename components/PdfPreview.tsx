'use client'

import { useEffect, useRef } from 'react'
import * as pdfjs from 'pdfjs-dist'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

export default function PdfPreview({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let cancelled = false

    async function render() {
      const canvas = canvasRef.current
      if (!canvas) return

      const doc = await pdfjs.getDocument({ url: src }).promise
      if (cancelled) return

      const page = await doc.getPage(1)
      if (cancelled) return

      const vp = page.getViewport({ scale: 2 })
      canvas.width = vp.width
      canvas.height = vp.height

      await page.render({ canvasContext: canvas.getContext('2d')!, viewport: vp, canvas }).promise
    }

    render()

    return () => { cancelled = true }
  }, [src])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }}
    />
  )
}
