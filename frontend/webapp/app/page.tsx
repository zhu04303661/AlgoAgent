import type { FC } from 'react'
import React from 'react'
import type { IMainProps } from '@/app/components/main-chat'
import Main from '@/app/components/main-chat'

const App: FC<IMainProps> = ({
  params,
}: any) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 p-4 flex flex-col">
        <div className="mb-6">
          <h1 className="font-['Pacifico'] text-2xl text-primary">logo</h1>
        </div>

        <a href="/editor" className="sidebar-item bg-gray-100 mb-4 block">
          <i className="fas fa-plus mr-2"></i>
          <span>新建垂类智能体</span>
        </a>

        <div className="space-y-1">
          <a href="/rule-model" className="sidebar-item">
            <i className="fas fa-users mr-2"></i>
            <span>规则模型生成</span>
          </a>
          <a href="/formula-model" className="sidebar-item">
            <i className="fas fa-book mr-2"></i>
            <span>公式模型生成</span>
          </a>
          <a href="/visual-model" className="sidebar-item">
            <i className="fas fa-project-diagram mr-2"></i>
            <span>视觉认知模型生成</span>
          </a>
          <a href="/ml-model" className="sidebar-item">
            <i className="fas fa-project-diagram mr-2"></i>
            <span>机器学习模型生成</span>
          </a>
          <a href="/agent-repository" className="sidebar-item">
            <i className="fas fa-comment mr-2"></i>
            <span>智能体仓库</span>
          </a>
        </div>

        <div className="mt-8">
          <div className="text-sm font-medium text-gray-700 mb-2">我打造的Agent</div>
          <div className="sidebar-item">
            <i className="fas fa-code mr-2 text-gray-400"></i>
            <span>安全作业Agent</span>
          </div>
          <a href="#" className="text-sm text-primary mt-2 hover:underline block">
            View All
          </a>
        </div>
        <div className="mt-8">
          <div className="text-sm font-medium text-gray-700 mb-2">最近使用的Agent</div>
          <div className="space-y-1">
            <div className="sidebar-item">
              <i className="fas fa-robot mr-2 text-gray-400"></i>
              <span className="truncate">预测天然气价格</span>
            </div>
            <div className="sidebar-item">
              <i className="fas fa-code mr-2 text-gray-400"></i>
              <span className="truncate">识别我的作业</span>
            </div>
            <div className="sidebar-item">
              <i className="fas fa-comments mr-2 text-gray-400"></i>
              <span className="truncate">为我的锅炉提供优化建议</span>
            </div>
          </div>
          <a href="#" className="text-sm text-primary mt-2 hover:underline block">
            View All
          </a>
        </div>
        <div className="mt-8">
          <div className="text-sm font-medium text-gray-700 mb-2">系统设置</div>
          <div className="sidebar-item">
            <i className="fas fa-code mr-2 text-gray-400"></i>
            <span>生成过程设置</span>
          </div>
          <a href="#" className="text-sm text-primary mt-2 hover:underline block">
            View All
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">产业垂类专家打造智能模型生成</h1>

          {/* Search Bar */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Ask v0 to build..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <button className="text-gray-400 hover:text-gray-600">
                <i className="fas fa-wand-magic-sparkles"></i>
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <i className="fas fa-gear"></i>
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <i className="fas fa-arrow-up"></i>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-12">
            <button className="flex items-center px-4 py-2 bg-gray-100 rounded-button hover:bg-gray-200 whitespace-nowrap">
              <i className="fas fa-clone mr-2"></i>
              Clone a Agent
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-100 rounded-button hover:bg-gray-200 whitespace-nowrap">
              <i className="fab fa-figma mr-2"></i>
              Import from github
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-100 rounded-button hover:bg-gray-200 whitespace-nowrap">
              <i className="fas fa-upload mr-2"></i>
              Upload a Agent
            </button>
          </div>

          {/* Community Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">From the Community</h2>
              <a href="#" className="text-primary hover:underline">
                Browse All
              </a>
            </div>
            <p className="text-gray-600 mb-8">Explore what the community is building with v0</p>

            {/* Project Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img
                  src="https://ai-public.mastergo.com/ai/img_res/2c7d3615532b9ba0fa19ccd8f5388643.jpg"
                  alt="OpenAI and AI SDK Chatbot"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
                      <i className="fas fa-robot"></i>
                    </div>
                    <div>
                      <h3 className="font-medium">OpenAI and AI SDK Chatbot</h3>
                      <p className="text-sm text-gray-500">3.2k Forks</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img
                  src="https://ai-public.mastergo.com/ai/img_res/0f5f0234c13cb97cb54f2946b725c7ff.jpg"
                  alt="AI Chat Interface"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">
                      <i className="fas fa-comments"></i>
                    </div>
                    <div>
                      <h3 className="font-medium">AI Chat Interface</h3>
                      <p className="text-sm text-gray-500">5.6k Forks</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img
                  src="https://ai-public.mastergo.com/ai/img_res/62ca11a3c7d450248f05adca9b91a460.jpg"
                  alt="Two-column Login Card"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white mr-2">
                      <i className="fas fa-sign-in-alt"></i>
                    </div>
                    <div>
                      <h3 className="font-medium">Two-column Login Card</h3>
                      <p className="text-sm text-gray-500">4k Forks</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img
                  src="https://ai-public.mastergo.com/ai/img_res/b38a279db63b1dc399e9bc8c0be498ba.jpg"
                  alt="Crypto Dashboard"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white mr-2">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <div>
                      <h3 className="font-medium">Crypto Dashboard</h3>
                      <p className="text-sm text-gray-500">2.8k Forks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Main params={params} />
          </div>
        </div>
      </div>
    </div>
    // <Main params={params} />
  )
}

export default React.memo(App)
