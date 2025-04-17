import SharedSidebar from '../components/shared-sidebar'
import Header from '../components/header'
import Footer from '../components/footer'

export default function RuleModelPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SharedSidebar activePage="rule-model" />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">规则模型生成</h1>

            <div className="mb-8">
              <p className="text-gray-600 mb-4">
                规则模型生成允许您创建基于明确规则和条件的智能体。这些模型适用于有明确决策路径的场景。
              </p>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                <h2 className="text-xl font-semibold mb-4">创建新规则模型</h2>

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
                    <label className="block text-sm font-medium text-gray-700 mb-1">行业领域</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>石油天然气</option>
                      <option>制造业</option>
                      <option>电力能源</option>
                      <option>医疗健康</option>
                      <option>金融服务</option>
                      <option>其他</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">规则类型</label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                          <i className="fas fa-sitemap text-blue-600"></i>
                        </div>
                        <h3 className="font-medium text-sm">决策树</h3>
                        <p className="text-xs text-gray-500">基于条件分支的决策模型</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                          <i className="fas fa-list-check text-green-600"></i>
                        </div>
                        <h3 className="font-medium text-sm">规则集</h3>
                        <p className="text-xs text-gray-500">基于规则列表的模型</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                          <i className="fas fa-code-branch text-purple-600"></i>
                        </div>
                        <h3 className="font-medium text-sm">工作流</h3>
                        <p className="text-xs text-gray-500">基于流程的规则模型</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">规则定义方式</label>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <input type="radio" id="visual" name="definition" className="mr-2" />
                        <label htmlFor="visual">可视化编辑器</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" id="code" name="definition" className="mr-2" />
                        <label htmlFor="code">代码编辑器</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" id="natural" name="definition" className="mr-2" />
                        <label htmlFor="natural">自然语言</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">开始创建</button>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4">规则模型模板</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                        <i className="fas fa-industry"></i>
                      </div>
                      <div>
                        <h3 className="font-medium">工业设备故障诊断</h3>
                        <p className="text-sm text-gray-500">基于决策树的故障诊断模型</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      通过一系列问题和检查步骤，帮助技术人员快速定位设备故障原因。
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
                        <i className="fas fa-check-double"></i>
                      </div>
                      <div>
                        <h3 className="font-medium">安全检查流程</h3>
                        <p className="text-sm text-gray-500">基于工作流的安全检查模型</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      标准化的安全检查流程，确保所有安全措施都被正确执行和记录。
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
