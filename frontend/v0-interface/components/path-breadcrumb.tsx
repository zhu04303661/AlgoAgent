interface PathBreadcrumbProps {
  path: string
}

export default function PathBreadcrumb({ path }: PathBreadcrumbProps) {
  const parts = path.split("/")

  return (
    <div className="flex items-center text-sm text-gray-600">
      {parts.map((part, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <span className="mx-1">›</span>}
          <span className={index === parts.length - 1 ? "text-gray-900 font-medium" : ""}>{part}</span>
        </div>
      ))}
    </div>
  )
}
