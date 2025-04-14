import { MoreHorizontal, Settings, Download } from "lucide-react"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
      <div className="flex items-center">
        <div className="mr-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M2 17L12 22L22 17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">Verify</button>
          <button className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 flex items-center">
            <span className="mr-1">•</span>
            Private
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-1 rounded hover:bg-gray-100">
          <MoreHorizontal className="w-5 h-5" />
        </button>
        <button className="p-1 rounded hover:bg-gray-100">
          <Settings className="w-5 h-5" />
        </button>
        <button className="p-1 rounded hover:bg-gray-100">
          <Download className="w-5 h-5" />
        </button>
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white"></div>
          <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white"></div>
          <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white"></div>
        </div>
        <span className="text-sm">Integrations</span>
        <button className="px-3 py-1 bg-black text-white rounded-md flex items-center font-medium text-sm">
          Deploy
        </button>
      </div>
    </header>
  )
}
