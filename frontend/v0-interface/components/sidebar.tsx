"use client"

import { useState } from "react"
import { ChevronRight, Users, Library, FolderOpen, ThumbsUp, ChevronLeft, Menu } from "lucide-react"
import { useResize } from "@/hooks/use-resize"

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { width, startResizing, isResizing } = useResize({
    initialWidth: 140,
    minWidth: 100,
    maxWidth: 300,
  })

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="flex h-full">
      <div
        className="flex flex-col border-r border-gray-200 bg-gray-50 transition-all duration-300"
        style={{ width: isCollapsed ? "50px" : `${width}px` }}
      >
        <div className="p-2 border-b border-gray-200 flex items-center justify-between">
          {!isCollapsed ? (
            <button className="text-left px-3 py-2 text-sm rounded hover:bg-gray-200 flex-grow">New Chat</button>
          ) : (
            <button className="mx-auto p-2 rounded-full hover:bg-gray-200">
              <Menu className="w-4 h-4" />
            </button>
          )}
          <button onClick={toggleCollapse} className="p-1 rounded-full hover:bg-gray-200 ml-1 flex-shrink-0">
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="p-2 space-y-1">
            <button
              className={`w-full flex items-center ${isCollapsed ? "justify-center" : ""} px-3 py-2 text-sm rounded hover:bg-gray-200`}
            >
              <Users className="w-4 h-4 min-w-4" />
              {!isCollapsed && <span className="ml-2">Community</span>}
            </button>
            <button
              className={`w-full flex items-center ${isCollapsed ? "justify-center" : ""} px-3 py-2 text-sm rounded hover:bg-gray-200`}
            >
              <Library className="w-4 h-4 min-w-4" />
              {!isCollapsed && <span className="ml-2">Library</span>}
            </button>
            <button
              className={`w-full flex items-center ${isCollapsed ? "justify-center" : ""} px-3 py-2 text-sm rounded hover:bg-gray-200`}
            >
              <FolderOpen className="w-4 h-4 min-w-4" />
              {!isCollapsed && <span className="ml-2">Projects</span>}
            </button>
            <button
              className={`w-full flex items-center ${isCollapsed ? "justify-center" : ""} px-3 py-2 text-sm rounded hover:bg-gray-200`}
            >
              <ThumbsUp className="w-4 h-4 min-w-4" />
              {!isCollapsed && <span className="ml-2">Feedback</span>}
            </button>
          </nav>

          {!isCollapsed && (
            <>
              <div className="p-2 pt-4">
                <div className="text-xs text-gray-500 px-3 mb-1">Projects</div>
                <div className="space-y-1">
                  <button className="w-full flex items-center px-3 py-1 text-xs rounded hover:bg-gray-200 text-left">
                    <span className="truncate">OpenAI and AI SDK Chatbot</span>
                  </button>
                  <button className="w-full flex items-center px-3 py-1 text-xs rounded hover:bg-gray-200 text-left">
                    <span className="truncate">contest</span>
                  </button>
                </div>
                <button className="flex items-center px-3 py-1 text-xs text-gray-500 mt-2">
                  <span>View All</span>
                  <ChevronRight className="w-3 h-3 ml-1" />
                </button>
              </div>

              <div className="p-2 pt-4">
                <div className="text-xs text-gray-500 px-3 mb-1">Recent Chats</div>
                <div className="space-y-1">
                  <button className="w-full flex items-center px-3 py-1 text-xs rounded hover:bg-gray-200 text-left">
                    <span className="truncate">生成Hmm图像</span>
                  </button>
                  <button className="w-full flex items-center px-3 py-1 text-xs rounded hover:bg-gray-200 text-left">
                    <span className="truncate">Custom chat page design</span>
                  </button>
                  <button className="w-full flex items-center px-3 py-1 text-xs rounded hover:bg-gray-200 text-left">
                    <span className="truncate">Copy V0 dev link</span>
                  </button>
                  <button className="w-full flex items-center px-3 py-1 text-xs rounded hover:bg-gray-200 text-left">
                    <span className="truncate">SaaS landing page</span>
                  </button>
                  <button className="w-full flex items-center px-3 py-1 text-xs rounded hover:bg-gray-200 text-left">
                    <span className="truncate">AI Chat interface</span>
                  </button>
                  <button className="w-full flex items-center px-3 py-1 text-xs rounded hover:bg-gray-200 text-left">
                    <span className="truncate">Creative Agency Portfolio</span>
                  </button>
                  <button className="w-full flex items-center px-3 py-1 text-xs rounded hover:bg-gray-200 text-left">
                    <span className="truncate">Vizify</span>
                  </button>
                  <button className="w-full flex items-center px-3 py-1 text-xs rounded hover:bg-gray-200 text-left">
                    <span className="truncate">OpenAI and AI SDK Chatbot</span>
                  </button>
                  <button className="w-full flex items-center px-3 py-1 text-xs rounded hover:bg-gray-200 text-left">
                    <span className="truncate">Gif file loader</span>
                  </button>
                  <button className="w-full flex items-center px-3 py-1 text-xs rounded hover:bg-gray-200 text-left">
                    <span className="truncate">SimTalk</span>
                  </button>
                </div>
                <button className="flex items-center px-3 py-1 text-xs text-gray-500 mt-2">
                  <span>View All</span>
                  <ChevronRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </>
          )}
        </div>
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
            <div className="mb-2">Need more messages? Get higher limits with Premium.</div>
            <button className="px-2 py-1 border border-gray-300 rounded text-gray-800 text-xs hover:bg-gray-100">
              Upgrade Plan
            </button>
            <div className="mt-4">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-sm bg-green-600 mr-2 flex items-center justify-center text-[10px] text-white">
                  J
                </div>
                <div>
                  <div className="text-gray-800 text-xs">zhu04303661</div>
                  <div className="text-[10px]">Free</div>
                </div>
              </div>
            </div>
          </div>
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
