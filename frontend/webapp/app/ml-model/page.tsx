'use client'

import SharedSidebar from '../components/shared-sidebar'
import Header from '../components/header'
import Footer from '../components/footer'

export default function MLModelPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SharedSidebar activePage="ml-model" />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">机器学习模型生成</h1>

            <div className="mb-8">
              <p className="text-gray-600 mb-4">
                机器学习模型生成允许您创建能够从数据中学习并做出预测的智能体。这些模型适用于需要从历史数据中发现模式并预测未来趋势的场景。
              </p>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                <h2 className="text-xl font-semibold mb-4">创建新机器学习模型</h2>

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
                    <label className="block text-sm font-medium text-gray-700 mb-1">问题类型</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>分类</option>
                      <option>回归</option>
                      <option>聚类</option>
                      <option>异常检测</option>
                      <option>时间序列预测</option>
                      <option>推荐系统</option>
                      <option>其他</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">数据来源</label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                          <i className="fas fa-file-csv text-blue-600"></i>
                        </div>
                        <h3 className="font-medium text-sm">上传CSV/Excel</h3>
                        <p className="text-xs text-gray-500">上传表格数据文件</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                          <i className="fas fa-database text-green-600"></i>
                        </div>
                        <h3 className="font-medium text-sm">数据库连接</h3>
                        <p className="text-xs text-gray-500">连接到现有数据库</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                          <i className="fas fa-cloud-download-alt text-purple-600"></i>
                        </div>
                        <h3 className="font-medium text-sm">API数据源</h3>
                        <p className="text-xs text-gray-500">从API获取数据</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">特征工程</label>
                    <div className="border border-gray-300 rounded-md p-4 bg-white">
                      <div className="flex flex-wrap gap-3 mb-3">
                        <button className="px-2 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200">缺失值处理</button>
                        <button className="px-2 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200">标准化</button>
                        <button className="px-2 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200">归一化</button>
                        <button className="px-2 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200">特征选择</button>
                        <button className="px-2 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200">特征提取</button>
                        <button className="px-2 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200">编码转换</button>
                      </div>
                      <div className="border border-gray-200 rounded-md p-3 min-h-[100px] bg-gray-50">
                        <div className="text-sm text-gray-500">拖拽上方的特征工程步骤到此处创建处理流程...</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">算法选择</label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                          <i className="fas fa-tree text-blue-600"></i>
                        </div>
                        <h3 className="font-medium text-sm">决策树</h3>
                        <p className="text-xs text-gray-500">简单直观的分类算法</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                          <i className="fas fa-random text-green-600"></i>
                        </div>
                        <h3 className="font-medium text-sm">随机森林</h3>
                        <p className="text-xs text-gray-500">集成学习方法</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                          <i className="fas fa-brain text-purple-600"></i>
                        </div>
                        <h3 className="font-medium text-sm">神经网络</h3>
                        <p className="text-xs text-gray-500">深度学习方法</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                          <i className="fas fa-vector-square text-yellow-600"></i>
                        </div>
                        <h3 className="font-medium text-sm">SVM</h3>
                        <p className="text-xs text-gray-500">支持向量机</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-2">
                          <i className="fas fa-chart-line text-red-600"></i>
                        </div>
                        <h3 className="font-medium text-sm">线性回归</h3>
                        <p className="text-xs text-gray-500">基础回归算法</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                          <i className="fas fa-robot text-indigo-600"></i>
                        </div>
                        <h3 className="font-medium text-sm">XGBoost</h3>
                        <p className="text-xs text-gray-500">高效梯度提升</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">模型评估</label>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center">
                        <input type="checkbox" id="accuracy" className="mr-2" defaultChecked />
                        <label htmlFor="accuracy">准确率</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="precision" className="mr-2" defaultChecked />
                        <label htmlFor="precision">精确率</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="recall" className="mr-2" defaultChecked />
                        <label htmlFor="recall">召回率</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="f1" className="mr-2" defaultChecked />
                        <label htmlFor="f1">F1分数</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="roc" className="mr-2" />
                        <label htmlFor="roc">ROC曲线</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="mae" className="mr-2" />
                        <label htmlFor="mae">平均绝对误差</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">开始创建</button>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4">机器学习模型模板</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                        <i className="fas fa-chart-line"></i>
                      </div>
                      <div>
                        <h3 className="font-medium">设备故障预测</h3>
                        <p className="text-sm text-gray-500">基于历史数据的预测性维护</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      分析设备传感器数据，预测可能的故障，提前安排维护，减少停机时间。
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
                        <i className="fas fa-gas-pump"></i>
                      </div>
                      <div>
                        <h3 className="font-medium">能源消耗优化</h3>
                        <p className="text-sm text-gray-500">能源使用预测与优化</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      预测能源消耗模式，提供优化建议，降低能源成本，提高能源利用效率。
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
