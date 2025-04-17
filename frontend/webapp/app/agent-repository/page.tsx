'use client'

import SharedSidebar from '../components/shared-sidebar'
import Header from '../components/header'
import Footer from '../components/footer'

export default function AgentRepositoryPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SharedSidebar activePage="agent-repository" />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">智能体仓库</h1>

            <div className="mb-8">
              <p className="text-gray-600 mb-4">
                智能体仓库是您创建和收集的所有智能体的中心管理平台。您可以在这里查看、管理、分享和部署您的智能体。
              </p>

              <div className="flex justify-between items-center mb-6">
                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="搜索智能体..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                <div className="flex space-x-3">
                  <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option>所有类型</option>
                    <option>规则模型</option>
                    <option>公式模型</option>
                    <option>视觉认知模型</option>
                    <option>机器学习模型</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option>最近创建</option>
                    <option>最近使用</option>
                    <option>名称排序</option>
                    <option>使用频率</option>
                  </select>
                  <button className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                    <i className="fas fa-plus mr-1"></i> 新建智能体
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-12 bg-gray-50 py-3 px-4 border-b border-gray-200 text-sm font-medium text-gray-600">
                  <div className="col-span-5">名称</div>
                  <div className="col-span-2">类型</div>
                  <div className="col-span-2">创建时间</div>
                  <div className="col-span-1">状态</div>
                  <div className="col-span-2 text-right">操作</div>
                </div>

                <div className="divide-y divide-gray-200">
                  <div className="grid grid-cols-12 py-4 px-4 items-center hover:bg-gray-50">
                    <div className="col-span-5 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                        <i className="fas fa-hard-hat"></i>
                      </div>
                      <div>
                        <h3 className="font-medium">安全作业Agent</h3>
                        <p className="text-xs text-gray-500">基于规则的安全检查智能体</p>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">规则模型</span>
                    </div>
                    <div className="col-span-2 text-sm text-gray-600">2023-11-15</div>
                    <div className="col-span-1">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">已部署</span>
                    </div>
                    <div className="col-span-2 flex justify-end space-x-2">
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <i className="fas fa-share-alt"></i>
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 py-4 px-4 items-center hover:bg-gray-50">
                    <div className="col-span-5 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                        <i className="fas fa-chart-line"></i>
                      </div>
                      <div>
                        <h3 className="font-medium">预测天然气价格</h3>
                        <p className="text-xs text-gray-500">基于时间序列的价格预测模型</p>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">机器学习模型</span>
                    </div>
                    <div className="col-span-2 text-sm text-gray-600">2023-11-10</div>
                    <div className="col-span-1">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">已部署</span>
                    </div>
                    <div className="col-span-2 flex justify-end space-x-2">
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <i className="fas fa-share-alt"></i>
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 py-4 px-4 items-center hover:bg-gray-50">
                    <div className="col-span-5 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                        <i className="fas fa-eye"></i>
                      </div>
                      <div>
                        <h3 className="font-medium">识别我的作业</h3>
                        <p className="text-xs text-gray-500">基于视觉的文档识别模型</p>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">视觉认知模型</span>
                    </div>
                    <div className="col-span-2 text-sm text-gray-600">2023-11-05</div>
                    <div className="col-span-1">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">训练中</span>
                    </div>
                    <div className="col-span-2 flex justify-end space-x-2">
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <i className="fas fa-share-alt"></i>
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 py-4 px-4 items-center hover:bg-gray-50">
                    <div className="col-span-5 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
                        <i className="fas fa-fire"></i>
                      </div>
                      <div>
                        <h3 className="font-medium">为我的锅炉提供优化建议</h3>
                        <p className="text-xs text-gray-500">基于公式的热力学优化模型</p>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">公式模型</span>
                    </div>
                    <div className="col-span-2 text-sm text-gray-600">2023-10-28</div>
                    <div className="col-span-1">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">已部署</span>
                    </div>
                    <div className="col-span-2 flex justify-end space-x-2">
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <i className="fas fa-share-alt"></i>
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-600">显示 1-4 共 4 个智能体</div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50" disabled>
                    上一页
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50" disabled>
                    下一页
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
