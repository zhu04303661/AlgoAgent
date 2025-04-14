"use client"

import { useState } from "react"
import { Send, User, Bot, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react"
import { useResize } from "@/hooks/use-resize"

export default function ChatWindow() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { width, startResizing, isResizing } = useResize({
    initialWidth: 300,
    minWidth: 200,
    maxWidth: 500,
  })

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const [messages, setMessages] = useState([
    { role: "assistant", content: "你好！我是AI助手，有什么我可以帮助你的吗？" },
    { role: "user", content: "我想创建一个React组件，可以显示用户的鼠标位置" },
    {
      role: "assistant",
      content:
        "好的，我可以帮你创建一个跟踪鼠标位置的React组件。我已经为你生成了一个`useMousePosition`钩子函数，你可以在右侧看到代码。这个钩子函数会返回鼠标的x和y坐标，你可以在任何React组件中使用它。",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }])
      setInput("")
      // 模拟AI回复
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "我已经收到你的消息，正在处理中...",
          },
        ])
      }, 500)
    }
  }

  return (
    <div className="flex h-full">
      <div
        className="flex flex-col border-r border-gray-200 bg-white transition-all duration-300"
        style={{ width: isCollapsed ? "40px" : `${width}px` }}
      >
        {isCollapsed ? (
          <div className="flex flex-col items-center py-3">
            <button onClick={toggleCollapse} className="p-1 rounded-full hover:bg-gray-100 mb-4">
              <ChevronRight className="w-4 h-4" />
            </button>
            <MessageSquare className="w-5 h-5 text-gray-600" />
          </div>
        ) : (
          <>
            <div className="p-3 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-medium text-gray-800">AI 助手</h2>
              <button onClick={toggleCollapse} className="p-1 rounded-full hover:bg-gray-100">
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === "user" ? "bg-blue-100 ml-2" : "bg-gray-100 mr-2"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-200">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="输入消息..."
                  className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                />
                <button onClick={handleSend} className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
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
