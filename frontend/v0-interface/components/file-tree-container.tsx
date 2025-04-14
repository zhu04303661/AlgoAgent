"use client"

import { useState } from "react"
import { useResize } from "@/hooks/use-resize"
import { ChevronDown, ChevronLeft, ChevronRight, FileText } from "lucide-react"
import FileTree from "./file-tree"

interface FileTreeContainerProps {
  currentFile: string
  setCurrentFile: (file: string) => void
}

export default function FileTreeContainer({ currentFile, setCurrentFile }: FileTreeContainerProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { width, startResizing, isResizing } = useResize({
    initialWidth: 250,
    minWidth: 180,
    maxWidth: 400,
  })

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="flex h-full">
      <div
        className="border-r border-gray-200 overflow-y-auto transition-all duration-300"
        style={{ width: isCollapsed ? "40px" : `${width}px` }}
      >
        {isCollapsed ? (
          <div className="flex flex-col items-center py-3">
            <button onClick={toggleCollapse} className="p-1 rounded-full hover:bg-gray-100 mb-4">
              <ChevronRight className="w-4 h-4" />
            </button>
            <FileText className="w-5 h-5 text-gray-600" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
              <div className="flex items-center">
                <ChevronDown className="w-4 h-4 mr-1" />
                <span className="text-sm">Version 1</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Latest</span>
                <span className="text-xs bg-gray-200 px-2 py-0.5 rounded ml-1">Viewing</span>
                <button onClick={toggleCollapse} className="p-1 rounded-full hover:bg-gray-100 ml-2">
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
            <FileTree currentFile={currentFile} setCurrentFile={setCurrentFile} />
          </>
        )}
      </div>
      {!isCollapsed && (
        <div
          className="w-1 cursor-col-resize bg-transparent hover:bg-gray-300 active:bg-gray-400 transition-colors"
          onMouseDown={startResizing}
        ></div>
      )}
    </div>
  )
}
