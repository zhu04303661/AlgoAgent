'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, Brain, ChevronLeft, ChevronRight, Database, Eye, Plus, Settings, Users } from 'lucide-react'
import type { FC } from 'react'

type SharedSidebarProps = {
  activePage: string
}

const SharedSidebar: FC<SharedSidebarProps> = ({ activePage }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className={`border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <Link href="/" className="font-['Pacifico'] text-2xl text-primary block truncate">
              logo
            </Link>
          )}
          <button
            onClick={toggleCollapse}
            className="p-1 rounded-full hover:bg-gray-100 ml-auto flex-shrink-0"
            aria-label={isCollapsed ? '展开菜单' : '收起菜单'}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <Link
            href="/editor"
            className={`flex items-center ${isCollapsed ? 'justify-center' : ''} p-3 rounded-md mb-2 ${activePage === 'editor' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
          >
            <Plus className="w-5 h-5 min-w-5 text-gray-700" />
            {!isCollapsed && <span className="ml-3 truncate">新建垂类智能体</span>}
          </Link>

          <div className={`${isCollapsed ? 'mt-6' : 'mt-4 mb-2'}`}>
            {!isCollapsed && <div className="text-xs font-medium text-gray-500 px-3 mb-1">模型类型</div>}
            <div className="space-y-1">
              <Link
                href="/rule-model"
                className={`flex items-center ${isCollapsed ? 'justify-center' : ''} p-3 rounded-md ${activePage === 'rule-model' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
              >
                <Users className="w-5 h-5 min-w-5 text-gray-700" />
                {!isCollapsed && <span className="ml-3 truncate">规则模型生成</span>}
              </Link>
              <Link
                href="/formula-model"
                className={`flex items-center ${isCollapsed ? 'justify-center' : ''} p-3 rounded-md ${activePage === 'formula-model' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
              >
                <BookOpen className="w-5 h-5 min-w-5 text-gray-700" />
                {!isCollapsed && <span className="ml-3 truncate">公式模型生成</span>}
              </Link>
              <Link
                href="/visual-model"
                className={`flex items-center ${isCollapsed ? 'justify-center' : ''} p-3 rounded-md ${activePage === 'visual-model' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
              >
                <Eye className="w-5 h-5 min-w-5 text-gray-700" />
                {!isCollapsed && <span className="ml-3 truncate">视觉认知模型生成</span>}
              </Link>
              <Link
                href="/ml-model"
                className={`flex items-center ${isCollapsed ? 'justify-center' : ''} p-3 rounded-md ${activePage === 'ml-model' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
              >
                <Brain className="w-5 h-5 min-w-5 text-gray-700" />
                {!isCollapsed && <span className="ml-3 truncate">机器学习模型生成</span>}
              </Link>
              <Link
                href="/agent-repository"
                className={`flex items-center ${isCollapsed ? 'justify-center' : ''} p-3 rounded-md ${activePage === 'agent-repository' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
              >
                <Database className="w-5 h-5 min-w-5 text-gray-700" />
                {!isCollapsed && <span className="ml-3 truncate">智能体仓库</span>}
              </Link>
            </div>
          </div>

          {!isCollapsed && (
            <>
              <div className="mt-8">
                <div className="text-xs font-medium text-gray-500 px-3 mb-1">我打造的Agent</div>
                <div className="space-y-1">
                  <div className="flex items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                    <i className="fas fa-code mr-2 text-gray-400 w-5 h-5 flex items-center justify-center"></i>
                    <span className="truncate">安全作业Agent</span>
                  </div>
                </div>
                <a href="#" className="text-xs text-primary mt-1 hover:underline px-3 block">
                  查看全部
                </a>
              </div>

              <div className="mt-6">
                <div className="text-xs font-medium text-gray-500 px-3 mb-1">最近使用的Agent</div>
                <div className="space-y-1">
                  <div className="flex items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                    <i className="fas fa-robot mr-2 text-gray-400 w-5 h-5 flex items-center justify-center"></i>
                    <span className="truncate">预测天然气价格</span>
                  </div>
                  <div className="flex items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                    <i className="fas fa-code mr-2 text-gray-400 w-5 h-5 flex items-center justify-center"></i>
                    <span className="truncate">识别我的作业</span>
                  </div>
                  <div className="flex items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                    <i className="fas fa-comments mr-2 text-gray-400 w-5 h-5 flex items-center justify-center"></i>
                    <span className="truncate">为我的锅炉提供优化建议</span>
                  </div>
                </div>
                <a href="#" className="text-xs text-primary mt-1 hover:underline px-3 block">
                  查看全部
                </a>
              </div>
            </>
          )}

          <div className={`${isCollapsed ? 'mt-6' : 'mt-8 mb-2'}`}>
            {!isCollapsed && <div className="text-xs font-medium text-gray-500 px-3 mb-1">系统</div>}
            <div className="space-y-1">
              <Link
                href="/system-settings"
                className={`flex items-center ${isCollapsed ? 'justify-center' : ''} p-3 rounded-md ${activePage === 'system-settings' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
              >
                <Settings className="w-5 h-5 min-w-5 text-gray-700" />
                {!isCollapsed && <span className="ml-3 truncate">系统设置</span>}
              </Link>
            </div>
          </div>
        </div>

        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-2">
                <span className="text-sm">用</span>
              </div>
              <div>
                <div className="text-sm font-medium">用户名</div>
                <div className="text-xs text-gray-500">专业版</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SharedSidebar
