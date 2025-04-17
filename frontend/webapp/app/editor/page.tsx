'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Copy,
  Download,
  Play,
  RefreshCw,
  Save,
  Sparkles,
} from 'lucide-react'
import Footer from '../components/footer'
import SharedSidebar from '../components/shared-sidebar'
import Main from '../components/main-chat'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../components/ui/resizable'
// 导入模型类型
type AIModel = {
  id: number
  name: string
  provider: string
  model: string
  apiKey: string
  endpoint: string
  status: string
  description: string
}

export default function EditorPage({ params }: { params: any }) {
  // 模拟从系统设置获取的模型列表
  const [availableModels, setAvailableModels] = useState<AIModel[]>([
    {
      id: 1,
      name: 'GPT-4o',
      provider: 'OpenAI',
      model: 'gpt-4o',
      apiKey: 'sk-••••••••••••••••••••••••',
      endpoint: 'https://api.openai.com/v1',
      status: 'active',
      description: 'OpenAI的最新大语言模型，具有强大的文本理解和生成能力',
    },
  ])

  // 当前选择的模型
  const [selectedModel, setSelectedModel] = useState<AIModel>(availableModels[0])
  const [showModelDropdown, setShowModelDropdown] = useState(false)

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '你好！我是AI编码助手，我可以帮助你创建垂类智能体模型和代码。请告诉我你想要构建什么类型的模型或应用？',
    },
  ])
  const [input, setInput] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [modelConfig, setModelConfig] = useState({
    name: '',
    type: '规则模型',
    industry: '石油天然气',
    description: '',
  })
  const [previewMode, setPreviewMode] = useState('code') // code, visual
  const messagesEndRef = useRef(null)
  const modelDropdownRef = useRef<HTMLDivElement>(null)

  // 添加一个状态来存储最新的AI回复
  const [latestAIMessage, setLatestAIMessage] = useState<string | null>(null)

  // 获取提供商对应的图标和颜色
  const getProviderIconAndColor = (provider: string) => {
    switch (provider) {
      case 'OpenAI':
        return { icon: 'fas fa-robot', bgColor: 'bg-blue-100', textColor: 'text-blue-600' }
      case 'Anthropic':
        return { icon: 'fas fa-brain', bgColor: 'bg-purple-100', textColor: 'text-purple-600' }
      case 'Google':
        return { icon: 'fas fa-microchip', bgColor: 'bg-green-100', textColor: 'text-green-600' }
      case 'DeepSeek':
        return { icon: 'fas fa-code', bgColor: 'bg-yellow-100', textColor: 'text-yellow-600' }
      default:
        return { icon: 'fas fa-cog', bgColor: 'bg-gray-100', textColor: 'text-gray-600' }
    }
  }

  // 点击外部关闭模型下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(event.target as Node))
        setShowModelDropdown(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // 点击发送消息
  const handleSend = () => {
    if (input.trim()) {
      // Add user message
      setMessages([...messages, { role: 'user', content: input }])
      setInput('')

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          role: 'assistant',
          content: `我正在使用 ${selectedModel.name} 分析你的需求...`,
        }

        setMessages(prev => [...prev, aiResponse])
      }, 1000)
    }
  }

  // With this simpler function that just updates the code based on the selected model:
  const handleModelChange = (model: AIModel) => {
    // This function will be called when a model is selected
    // It can be used to update the UI or make API calls
    console.log(`Selected model: ${model.name} (${model.provider})`)

    // For demonstration, we'll update the console output
    if (generatedCode) {
      // If there's already generated code, we can update the console to show the model change
      const consoleElement = document.querySelector('.bg-black.text-green-400')
      if (consoleElement) {
        const newLine = document.createElement('div')
        newLine.textContent = `> 已切换到 ${model.name} (${model.provider}) 模型`
        newLine.className = 'text-yellow-300'
        consoleElement.appendChild(newLine)
      }
    }
  }

  // 选择模型
  const selectModel = (model: AIModel) => {
    setSelectedModel(model)
    setShowModelDropdown(false)

    // Call the handleModelChange function to update UI based on model selection
    handleModelChange(model)
  }

  // Auto scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // 从聊天内容中提取代码块
  const extractCodeFromChat = (chatContent: string): string | null => {
    // 尝试匹配常见的代码块格式
    // 1. 匹配\`\`\`开头和结尾的代码块
    const codeBlockRegex = /```(?:[\w-]+)?\n([\s\S]*?)```/g
    const matches = [...chatContent.matchAll(codeBlockRegex)]

    if (matches.length > 0) {
      // 如果找到多个代码块，连接它们
      return matches.map(match => match[1]).join('\n\n')
    }

    // 2. 尝试查找缩进的代码块
    const indentedCodeRegex = /(?:^|\n)( {4}|\t)(.+)(?:\n|$)/g
    const indentedMatches = [...chatContent.matchAll(indentedCodeRegex)]

    if (indentedMatches.length > 0)
      return indentedMatches.map(match => match[2]).join('\n')

    // 3. 如果没有找到明确的代码块，尝试查找可能的代码片段
    // 例如，查找包含常见编程关键字的行
    const codeKeywords = ['function', 'class', 'import', 'export', 'def ', 'return', 'if', 'for', 'while']
    const lines = chatContent.split('\n')
    const potentialCodeLines = lines.filter(line => codeKeywords.some(keyword => line.includes(keyword)))

    if (potentialCodeLines.length > 5) {
      // 至少需要5行才被视为代码
      return potentialCodeLines.join('\n')
    }

    // 如果没有找到代码块，返回null
    return null
  }

  // 根据代码内容更新模型配置
  const updateModelConfigBasedOnCode = (codeContent: string) => {
    if (
      codeContent.toLowerCase().includes('预测')
      || codeContent.toLowerCase().includes('predict')
      || codeContent.toLowerCase().includes('forecast')
    ) {
      setModelConfig({
        name: '预测模型',
        type: '机器学习模型',
        industry: modelConfig.industry,
        description: '从AI助手生成的预测模型代码',
      })
    }
    else if (
      codeContent.toLowerCase().includes('识别')
      || codeContent.toLowerCase().includes('detect')
      || codeContent.toLowerCase().includes('recognition')
    ) {
      setModelConfig({
        name: '识别模型',
        type: '视觉认知模型',
        industry: modelConfig.industry,
        description: '从AI助手生成的识别模型代码',
      })
    }
    else if (
      codeContent.toLowerCase().includes('规则')
      || codeContent.toLowerCase().includes('rule')
      || codeContent.toLowerCase().includes('condition')
    ) {
      setModelConfig({
        name: '规则模型',
        type: '规则模型',
        industry: modelConfig.industry,
        description: '从AI助手生成的规则模型代码',
      })
    }
  }

  // 更新控制台输出
  const updateConsoleOutput = (message: string) => {
    // 同时在浏览器控制台输出
    console.log(message)

    const consoleElement = document.querySelector('.bg-black.text-green-400')
    if (consoleElement) {
      const newLine = document.createElement('div')
      newLine.textContent = message
      newLine.className = 'text-yellow-300'
      consoleElement.appendChild(newLine)

      // 自动滚动到底部
      consoleElement.scrollTop = consoleElement.scrollHeight
    }
  }

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <div className="flex flex-1 overflow-hidden">
        <SharedSidebar activePage="editor" />
        <div className="flex flex-col flex-1">
          {/* Top bar */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 shrink-0">
            <h1 className="text-xl font-semibold">新建垂类智能体</h1>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 flex items-center">
                <Save className="w-4 h-4 mr-1" />
                保存
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 flex items-center">
                <Download className="w-4 h-4 mr-1" />
                导出
              </button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                <Play className="w-4 h-4 mr-1" />
                部署
              </button>
            </div>
          </div>
          <div className="flex flex-col h-full border-r border-gray-200">
            <div className="flex-1 overflow-hidden">
              <Main params={params} />
            </div>
          </div>
          {/* Resizable panels */}
          <ResizablePanelGroup direction="horizontal" className="flex flex-1">
            {/* Middle panel - External AI Assistant iframe */}
            <ResizablePanel defaultSize={50} minSize={30}>

            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Right panel - Code and Preview */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="flex flex-col h-full">
                {/* Code editor header */}
                <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-gray-50 shrink-0">
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-4">生成的代码</span>
                    <div className="flex space-x-1">
                      <button className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 flex items-center">
                        <Copy className="w-3 h-3 mr-1" />
                        复制
                      </button>
                      <button className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 flex items-center">
                        <RefreshCw className="w-3 h-3 mr-1" />
                        重新生成
                      </button>
                      <button
                        className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 flex items-center"
                        onClick={() => setGeneratedCode('')}
                      >
                        <RefreshCw className="w-3 h-3 mr-1" />
                        清空
                      </button>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      className={`px-2 py-1 text-xs rounded flex items-center ${previewMode === 'code'
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'border border-gray-300 hover:bg-gray-100'
                        }`}
                      onClick={() => setPreviewMode('code')}
                    >
                      代码
                    </button>
                    <button
                      className={`px-2 py-1 text-xs rounded flex items-center ${previewMode === 'visual'
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'border border-gray-300 hover:bg-gray-100'
                        }`}
                      onClick={() => setPreviewMode('visual')}
                    >
                      可视化
                    </button>
                  </div>
                </div>

                {/* Code editor and preview */}
                <div className="flex-1 overflow-auto min-h-0">
                  {previewMode === 'code'
                    ? (
                      <div className="h-full">
                        <div className="h-full overflow-auto">
                          <div className="p-4 font-mono text-sm">
                            {generatedCode
                              ? (
                                <pre className="whitespace-pre-wrap">{generatedCode}</pre>
                              )
                              : (
                                <div className="text-gray-500 text-center py-8">与AI助手交流后，生成的代码将显示在这里</div>
                              )}
                          </div>
                        </div>
                      </div>
                    )
                    : (
                      <div className="h-full p-4">
                        <div className="bg-white border border-gray-200 rounded-md p-6 h-full flex items-center justify-center">
                          {generatedCode
                            ? (
                              <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                  <Sparkles className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-medium mb-2">{modelConfig.name || '模型预览'}</h3>
                                <p className="text-gray-600 mb-4">{modelConfig.description || '模型描述将显示在这里'}</p>
                                <div className="flex justify-center space-x-2 mb-4">
                                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                    {modelConfig.type}
                                  </span>
                                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                    {modelConfig.industry}
                                  </span>
                                </div>
                                <div className="w-full max-w-md mx-auto bg-gray-50 rounded-lg p-4 mb-4">
                                  <div className="text-sm text-left mb-2 font-medium">模型性能指标</div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-white p-2 rounded border border-gray-200">
                                      <div className="text-xs text-gray-500">准确率</div>
                                      <div className="text-lg font-medium">92.5%</div>
                                    </div>
                                    <div className="bg-white p-2 rounded border border-gray-200">
                                      <div className="text-xs text-gray-500">处理速度</div>
                                      <div className="text-lg font-medium">45ms</div>
                                    </div>
                                    <div className="bg-white p-2 rounded border border-gray-200">
                                      <div className="text-xs text-gray-500">内存占用</div>
                                      <div className="text-lg font-medium">128MB</div>
                                    </div>
                                    <div className="bg-white p-2 rounded border border-gray-200">
                                      <div className="text-xs text-gray-500">API调用</div>
                                      <div className="text-lg font-medium">REST</div>
                                    </div>
                                  </div>
                                </div>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                  运行模型
                                </button>
                              </div>
                            )
                            : (
                              <div className="text-center text-gray-500">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                  <Play className="w-8 h-8 text-gray-400" />
                                </div>
                                <p>生成代码后，模型可视化预览将显示在这里</p>
                              </div>
                            )}
                        </div>
                      </div>
                    )}
                </div>

                {/* Output console */}
                <div className="h-48 border-t border-gray-200 overflow-auto shrink-0">
                  <div className="flex items-center justify-between p-2 bg-gray-50 border-b border-gray-200">
                    <span className="text-sm font-medium">输出控制台</span>
                    <button className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100">清除</button>
                  </div>
                  <div className="p-3 font-mono text-sm text-gray-700 bg-black text-green-400">
                    {generatedCode
                      ? (
                        <>
                          <div>{'>'}正在初始化模型...</div>
                          <div>{'>'}已连接到外部AI助手服务</div>
                          <div>
                            {'>'}当前选择的模型: {selectedModel.name} ({selectedModel.provider})
                          </div>
                          <div>{'>'}模型配置完成</div>
                          <div>{'>'}准备数据处理流程</div>
                          <div>{'>'}模型就绪，可以开始使用</div>
                          <div className="text-yellow-300">
                            {'>'}提示: 在AI助手窗口中输入您的需求，生成的代码将显示在右侧
                          </div>
                        </>
                      )
                      : (
                        <div>
                          {'>'}已连接到外部AI助手服务，当前选择的模型: {selectedModel.name}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
      <Footer />
    </div>
  )
}
