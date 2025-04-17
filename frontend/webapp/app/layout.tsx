import { getLocaleOnServer } from '@/i18n/server'

import './styles/globals.css'
import './styles/markdown.scss'

export const metadata: Metadata = {
  title: 'AI Chat Interface',
  description: '产业垂类专家打造智能模型生成',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = getLocaleOnServer()
  return (
    <html lang={locale ?? 'en'} className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body>
        <div id="app-root">{children}</div>
      </body>
    </html>
  )
}

// const LocaleLayout = ({
//   children,
// }: {
//   children: React.ReactNode
// }) => {
//   const locale = getLocaleOnServer()
//   return (
//     <html lang={locale ?? 'en'} className="h-full">
//       <body className="h-full">
//         <div className="overflow-x-auto">
//           <div className="w-screen h-screen min-w-[300px]">
//             {children}
//           </div>
//         </div>
//       </body>
//     </html>
//   )
// }

// export default LocaleLayout
