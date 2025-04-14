"use client"

import { useEffect, useState } from "react"

interface CodeEditorProps {
  currentFile: string
}

export default function CodeEditor({ currentFile }: CodeEditorProps) {
  const [content, setContent] = useState("")

  useEffect(() => {
    if (currentFile === "lib/hooks/use-mouse-position.ts") {
      setContent(`import { useState, useEffect } from 'react'

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }
    
    window.addEventListener('mousemove', updateMousePosition)
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])
  
  return mousePosition
}`)
    } else {
      setContent(`// Content for ${currentFile}`)
    }
  }, [currentFile])

  return (
    <div className="flex flex-1 overflow-hidden bg-white">
      <div className="w-12 flex-shrink-0 border-r border-gray-200 flex flex-col items-center py-2 text-gray-500 text-xs bg-gray-50">
        {Array.from({ length: 22 }).map((_, i) => (
          <div key={i} className="py-0.5">
            {i + 1}
          </div>
        ))}
      </div>
      <div className="flex-1 p-2 overflow-auto font-mono text-sm">
        {currentFile === "lib/hooks/use-mouse-position.ts" ? (
          <pre className="text-sm">
            <span className="text-purple-600">import</span> {"{ useState, useEffect }"}{" "}
            <span className="text-purple-600">from</span> <span className="text-green-600">'react'</span>
            <span className="text-purple-600">export function</span>{" "}
            <span className="text-blue-600">useMousePosition</span>() {"{"}
            <span className="text-purple-600">const</span> [mousePosition, setMousePosition] ={" "}
            <span className="text-blue-600">useState</span>
            {"({ x: 0, y: 0 })"}
            <span className="text-purple-600">useEffect</span>(() {"=> {"}
            <span className="text-purple-600">if</span> (<span className="text-purple-600">typeof</span> window ==={" "}
            <span className="text-green-600">'undefined'</span>) <span className="text-purple-600">return</span>
            <span className="text-purple-600">const</span> <span className="text-blue-600">updateMousePosition</span> =
            (ev: MouseEvent) {"=> {"}
            <span className="text-blue-600">setMousePosition</span>
            {"({ x: ev.clientX, y: ev.clientY })"}
            {"}"}
            window.<span className="text-blue-600">addEventListener</span>(
            <span className="text-green-600">'mousemove'</span>, updateMousePosition)
            <span className="text-purple-600">return</span> () {"=> {"}
            window.<span className="text-blue-600">removeEventListener</span>(
            <span className="text-green-600">'mousemove'</span>, updateMousePosition)
            {"}"}
            {"}"}, [])
            <span className="text-purple-600">return</span> mousePosition
            {"}"}
          </pre>
        ) : (
          <div className="text-gray-600">// Content for {currentFile}</div>
        )}
      </div>
    </div>
  )
}
