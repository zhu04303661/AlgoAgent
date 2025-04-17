'use client'
import { useRouter } from 'next/navigation'
import SharedSidebar from '../components/shared-sidebar'
import Header from '../components/header'
import Footer from '../components/footer'

export default function VisualModelPage() {
  const router = useRouter()

  const handleCreateTask = () => {
    router.push('/tasks') // 跳转到任务列表页面
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SharedSidebar activePage="visual-model" />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">视觉认知模型生成</h1>

            <div className="mb-8">
              <p className="text-gray-600 mb-4">
                视觉认知模型生成允许您创建能够理解和分析图像、视频等视觉数据的智能体。这些模型适用于需要视觉识别和分析的场景。
              </p>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                <h2 className="text-xl font-semibold mb-4">创建新视觉认知模型</h2>

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
                    <label className="block text-sm font-medium text-gray-700 mb-1">视觉任务类型</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>图像分类</option>
                      <option>物体检测</option>
                      <option>图像分割</option>
                      <option>人脸识别</option>
                      <option>OCR文字识别</option>
                      <option>视频分析</option>
                      <option>其他</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">数据来源</label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                          <i className="fas fa-upload text-blue-600"></i>
                        </div>
                        <h3 className="font-medium text-sm">上传数据集</h3>
                        <p className="text-xs text-gray-500">上传您自己的图像数据集</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                          <i className="fas fa-database text-green-600"></i>
                        </div>
                        <h3 className="font-medium text-sm">公共数据集</h3>
                        <p className="text-xs text-gray-500">使用预设的公共数据集</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                          <i className="fas fa-camera text-purple-600"></i>
                        </div>
                        <h3 className="font-medium text-sm">实时采集</h3>
                        <p className="text-xs text-gray-500">通过摄像头实时采集数据</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">数据预处理</label>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center">
                        <input type="checkbox" id="resize" className="mr-2" />
                        <label htmlFor="resize">调整大小</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="normalize" className="mr-2" />
                        <label htmlFor="normalize">标准化</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="augment" className="mr-2" />
                        <label htmlFor="augment">数据增强</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="grayscale" className="mr-2" />
                        <label htmlFor="grayscale">灰度转换</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="filter" className="mr-2" />
                        <label htmlFor="filter">滤波处理</label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">模型架构</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                            <i className="fas fa-brain text-blue-600"></i>
                          </div>
                          <h3 className="font-medium text-sm">CNN</h3>
                        </div>
                        <p className="text-xs text-gray-500">卷积神经网络，适用于图像分类和识别</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                            <i className="fas fa-network-wired text-green-600"></i>
                          </div>
                          <h3 className="font-medium text-sm">YOLO</h3>
                        </div>
                        <p className="text-xs text-gray-500">实时物体检测系统</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                            <i className="fas fa-cube text-purple-600"></i>
                          </div>
                          <h3 className="font-medium text-sm">ResNet</h3>
                        </div>
                        <p className="text-xs text-gray-500">残差网络，适用于深层网络训练</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-2">
                            <i className="fas fa-microchip text-yellow-600"></i>
                          </div>
                          <h3 className="font-medium text-sm">Transformer</h3>
                        </div>
                        <p className="text-xs text-gray-500">基于注意力机制的视觉模型</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleCreateTask}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    开始创建
                  </button>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4">视觉模型模板</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                        <i className="fas fa-industry"></i>
                      </div>
                      <div>
                        <h3 className="font-medium">工业缺陷检测</h3>
                        <p className="text-sm text-gray-500">基于计算机视觉的质量控制</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">自动检测产品表面缺陷，提高质量控制效率和准确性。</p>
                    <button className="mt-4 px-3 py-1 border border-blue-500 text-blue-500 rounded-md text-sm hover:bg-blue-50">
                      使用模板
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                        <i className="fas fa-file-alt"></i>
                      </div>
                      <div>
                        <h3 className="font-medium">文档OCR识别</h3>
                        <p className="text-sm text-gray-500">文档文字识别与提取</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      从扫描文档、图片中提取文字信息，支持多种文档格式和语言。
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
