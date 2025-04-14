"use client"

interface FileTreeProps {
  currentFile: string
  setCurrentFile: (file: string) => void
}

export default function FileTree({ currentFile, setCurrentFile }: FileTreeProps) {
  const files = [
    { path: "app/page.tsx", status: "Generated", diff: "+48" },
    { path: "app/globals.css", status: "Generated", diff: "+28" },
    { path: "components/navbar.tsx", status: "Generated", diff: "" },
    { path: "components/hero.tsx", status: "Generated", diff: "+64" },
    { path: "components/robo-animation.tsx", status: "Generated", diff: "+39" },
    { path: "components/floating-paper.tsx", status: "Generated", diff: "+61" },
    { path: "components/sparkles.tsx", status: "Generated", diff: "+48" },
    { path: "lib/hooks/use-mouse-position.ts", status: "Generated", diff: "+22" },
  ]

  return (
    <div className="text-sm">
      {files.map((file) => (
        <div
          key={file.path}
          className={`flex items-center px-4 py-2 cursor-pointer ${
            currentFile === file.path ? "bg-gray-100" : "hover:bg-gray-50"
          }`}
          onClick={() => setCurrentFile(file.path)}
        >
          <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
          <span className="text-gray-700 text-xs truncate">{file.path}</span>
          <span className="ml-auto text-xs text-gray-500">{file.status}</span>
          {file.diff && <span className="ml-2 text-xs text-green-600">{file.diff}</span>}
        </div>
      ))}
    </div>
  )
}
