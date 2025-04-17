'use client'

import SharedSidebar from '../components/shared-sidebar'
import Header from '../components/header'
import Footer from '../components/footer'

export default function FormulaModelPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SharedSidebar activePage="formula-model" />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">公式模型生成</h1>

            <div className="mb-8">
              <p className="text-gray-600 mb-4">
                公式模型生成允许您创建基于数学公式和计算的智能体。这些模型适用于需要精确计算和预测的场景。
              </p>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                <h2 className="text-xl font-semibold mb-4">创建新公式模型</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">模型名称</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="输入模型名称"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">应用领域</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>工程计算</option>
                      <option>金融分析</option>
                      <option>物理模拟</option>
                      <option>化学反应</option>
                      <option>统计分析</option>
                      <option>其他</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">公式类型</label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                          <i className="fas fa-calculator text-blue-600"></i>
                        </div>
                        <h3 className="font-medium text-sm">代数公式</h3>
                        <p className="text-xs text-gray-500">基础数学计算</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                          <i className="fas fa-chart-line text-green-600"></i>
                        </div>
                        <h3 className="font-medium text-sm">统计公式</h3>
                        <p className="text-xs text-gray-500">统计学和概率计算</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                          <i className="fas fa-wave-square text-purple-600"></i>
                        </div>
                        <h3 className="font-medium text-sm">微积分</h3>
                        <p className="text-xs text-gray-500">微分方程和积分</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">公式编辑器</label>
                    <div className="border border-gray-300 rounded-md p-4 bg-white">
                      <div className="flex space-x-2 mb-3">
                        <button className="p-1 border border-gray-200 rounded hover:bg-gray-100">
                          <i className="fas fa-square-root-variable"></i>
                        </button>
                        <button className="p-1 border border-gray-200 rounded hover:bg-gray-100">
                          <i className="fas fa-superscript"></i>
                        </button>
                        <button className="p-1 border border-gray-200 rounded hover:bg-gray-100">
                          <i className="fas fa-subscript"></i>
                        </button>
                        <button className="p-1 border border-gray-200 rounded hover:bg-gray-100">
                          <i className="fas fa-divide"></i>
                        </button>
                        <button className="p-1 border border-gray-200 rounded hover:bg-gray-100">
                          <i className="fas fa-integral"></i>
                        </button>
                        <button className="p-1 border border-gray-200 rounded hover:bg-gray-100">
                          <i className="fas fa-sigma"></i>
                        </button>
                      </div>
                      <div className="p-3 border border-gray-200 rounded-md min-h-[100px] font-mono text-center flex items-center justify-center">
                        <span className="text-gray-400">在此输入或构建您的公式...</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">变量定义</label>
                    <div className="border border-gray-300 rounded-md overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-2 text-left">变量名</th>
                            <th className="px-4 py-2 text-left">类型</th>
                            <th className="px-4 py-2 text-left">默认值</th>
                            <th className="px-4 py-2 text-left">描述</th>
                            <th className="px-4 py-2 text-left">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-4 py-2">x</td>
                            <td className="px-4 py-2">数值</td>
                            <td className="px-4 py-2">0</td>
                            <td className="px-4 py-2">输入变量</td>
                            <td className="px-4 py-2">
                              <button className="text-red-500 hover:text-red-700">
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="px-4 py-2">y</td>
                            <td className="px-4 py-2">数值</td>
                            <td className="px-4 py-2">0</td>
                            <td className="px-4 py-2">输入变量</td>
                            <td className="px-4 py-2">
                              <button className="text-red-500 hover:text-red-700">
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <button className="mt-2 text-sm text-blue-500 flex items-center">
                      <i className="fas fa-plus mr-1"></i> 添加变量
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">开始创建</button>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4">公式模型模板</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                        <i className="fas fa-fire"></i>
                      </div>
                      <div>
                        <h3 className="font-medium">热力学计算模型</h3>
                        <p className="text-sm text-gray-500">热力学公式集合</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      包含热力学基本定律和常用公式，适用于能源和化工行业的计算。
                    </p>
                    <button className="mt-4 px-3 py-1 border border-blue-500 text-blue-500 rounded-md text-sm hover:bg-blue-50">
                      使用模板
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                        <i className="fas fa-chart-pie"></i>
                      </div>
                      <div>
                        <h3 className="font-medium">财务分析模型</h3>
                        <p className="text-sm text-gray-500">财务指标计算公式</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      包含ROI、NPV、IRR等财务指标的计算公式，适用于投资分析和财务决策。
                    </p>
                    <button className="mt-4 px-3 py-1 border border-blue-500 text-blue-500 rounded-md text-sm hover:bg-blue-50">
                      使用模板
                    </button>
                  </div>
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
