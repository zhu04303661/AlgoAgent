import type { FC } from 'react'
import React from 'react'
import { Download, MoreHorizontal, Settings } from 'lucide-react'

export type IHeaderProps = {
  title: string
  isMobile?: boolean
  onShowSideBar?: () => void
  onCreateNewChat?: () => void
}
const Header: FC<IHeaderProps> = ({
  title,
  isMobile,
  onShowSideBar,
  onCreateNewChat,
}) => {
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
  // return (
  //   <div className="shrink-0 flex items-center justify-between h-12 px-3 bg-gray-100">
  //     {isMobile
  //       ? (
  //         <div
  //           className='flex items-center justify-center h-8 w-8 cursor-pointer'
  //           onClick={() => onShowSideBar?.()}
  //         >
  //           <Bars3Icon className="h-4 w-4 text-gray-500" />
  //         </div>
  //       )
  //       : <div></div>}
  //     <div className='flex items-center space-x-2'>
  //       <AppIcon size="small" />
  //       <div className=" text-sm text-gray-800 font-bold">{title}</div>
  //     </div>
  //     {isMobile
  //       ? (
  //         <div className='flex items-center justify-center h-8 w-8 cursor-pointer'
  //           onClick={() => onCreateNewChat?.()}
  //         >
  //           <PencilSquareIcon className="h-4 w-4 text-gray-500" />
  //         </div>)
  //       : <div></div>}
  //   </div>
  // )
}

export default React.memo(Header)
