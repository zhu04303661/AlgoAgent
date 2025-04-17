"use client"

import type React from "react"

import { useState } from "react"
import SharedSidebar from "@/components/shared-sidebar"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Plus, Trash2, Edit, Save, X } from "lucide-react"

export default function SystemSettingsPage() {
  const [activeTab, setActiveTab] = useState("ai-assistants")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const [newAssistant, setNewAssistant] = useState({
    name: "",
    provider: "OpenAI",
    model: "gpt-4o",
    apiKey: "",
    endpoint: "",
    description: "",
  })

  const [assistants, setAssistants] = useState([
    {
      id: 1,
      name: "GPT-4o",
      provider: "OpenAI",
      model: "gpt-4o",
      apiKey: "sk-••••••••••••••••••••••••",
      endpoint: "https://api.openai.com/v1",
      status: "active",
      description: "OpenAI的最新大语言模型，具有强大的文本理解和生成能力",
    },
    {
      id: 2,
      name: "Claude 3 Opus",
      provider: "Anthropic",
      model: "claude-3-opus-20240229",
      apiKey: "sk-••••••••••••••••••••••••",
      endpoint: "https://api.anthropic.com",
      status: "active",
      description: "Anthropic的高级大语言模型，擅长长文本理解和复杂推理",
    },
    {
      id: 3,
      name: "DeepSeek Coder",
      provider: "DeepSeek",
      model: "deepseek-coder-33b-instruct",
      apiKey: "sk-••••••••••••••••••••••••",
      endpoint: "https://api.deepseek.com",
      status: "active",
      description: "DeepSeek的代码生成模型，专为编程和代码理解优化",
    },
  ])

  const handleAddAssistant = () => {
    setAssistants([
      ...assistants,
      {
        id: assistants.length + 1,
        ...newAssistant,
        status: "active",
        apiKey: newAssistant.apiKey ? `sk-${newAssistant.apiKey.substring(0, 4)}••••••••••••` : "",
      },
    ])
    setNewAssistant({
      name: "",
      provider: "OpenAI",
      model: "gpt-4o",
      apiKey: "",
      endpoint: "",
      description: "",
    })
    setShowAddModal(false)
  }

  const handleDeleteAssistant = (id: number) => {
    setAssistants(assistants.filter((assistant) => assistant.id !== id))
  }

  const startEditing = (index: number) => {
    setEditingIndex(index)
  }

  const cancelEditing = () => {
    setEditingIndex(null)
  }

  const saveEditing = () => {
    setEditingIndex(null)
  }

  // 获取提供商对应的图标和颜色
  const getProviderIconAndColor = (provider: string) => {
    switch (provider) {
      case "OpenAI":
        return { icon: "fas fa-robot", bgColor: "bg-blue-100", textColor: "text-blue-600" }
      case "Anthropic":
        return { icon: "fas fa-brain", bgColor: "bg-purple-100", textColor: "text-purple-600" }
      case "Google":
        return { icon: "fas fa-microchip", bgColor: "bg-green-100", textColor: "text-green-600" }
      case "DeepSeek":
        return { icon: "fas fa-code", bgColor: "bg-yellow-100", textColor: "text-yellow-600" }
      default:
        return { icon: "fas fa-cog", bgColor: "bg-gray-100", textColor: "text-gray-600" }
    }
  }

  // 获取提供商对应的默认模型
  const getDefaultModelForProvider = (provider: string) => {
    switch (provider) {
      case "OpenAI":
        return "gpt-4o"
      case "Anthropic":
        return "claude-3-opus-20240229"
      case "Google":
        return "gemini-pro"
      case "DeepSeek":
        return "deepseek-llm-67b-chat"
      default:
        return ""
    }
  }

  // 当提供商改变时更新默认模型
  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provider = e.target.value
    const defaultModel = getDefaultModelForProvider(provider)

    setNewAssistant({
      ...newAssistant,
      provider,
      model: defaultModel,
      endpoint: provider === "DeepSeek" ? "https://api.deepseek.com" : newAssistant.endpoint,
    })
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SharedSidebar activePage="system-settings" />
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">系统设置</h1>

            <div className="mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    className={`py-4 px-6 font-medium text-sm ${
                      activeTab === "ai-assistants"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("ai-assistants")}
                  >
                    AI助手管理
                  </button>
                  <button
                    className={`py-4 px-6 font-medium text-sm ${
                      activeTab === "general"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("general")}
                  >
                    通用设置
                  </button>
                  <button
                    className={`py-4 px-6 font-medium text-sm ${
                      activeTab === "advanced"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("advanced")}
                  >
                    高级设置
                  </button>
                </nav>
              </div>
            </div>

            {activeTab === "ai-assistants" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">AI助手管理</h2>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    onClick={() => setShowAddModal(true)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    添加大模型
                  </button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="grid grid-cols-12 bg-gray-50 py-3 px-4 border-b border-gray-200 text-sm font-medium text-gray-600">
                    <div className="col-span-3">名称</div>
                    <div className="col-span-2">提供商</div>
                    <div className="col-span-2">模型</div>
                    <div className="col-span-2">API密钥</div>
                    <div className="col-span-1">状态</div>
                    <div className="col-span-2 text-right">操作</div>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {assistants.map((assistant, index) => (
                      <div key={assistant.id} className="grid grid-cols-12 py-4 px-4 items-center hover:bg-gray-50">
                        {editingIndex === index ? (
                          // 编辑模式
                          <>
                            <div className="col-span-3">
                              <input
                                type="text"
                                className="w-full px-3 py-1 border border-gray-300 rounded-md"
                                defaultValue={assistant.name}
                              />
                            </div>
                            <div className="col-span-2">
                              <select
                                className="w-full px-3 py-1 border border-gray-300 rounded-md"
                                defaultValue={assistant.provider}
                              >
                                <option value="OpenAI">OpenAI</option>
                                <option value="Anthropic">Anthropic</option>
                                <option value="Google">Google</option>
                                <option value="DeepSeek">DeepSeek</option>
                                <option value="Custom">自定义</option>
                              </select>
                            </div>
                            <div className="col-span-2">
                              <input
                                type="text"
                                className="w-full px-3 py-1 border border-gray-300 rounded-md"
                                defaultValue={assistant.model}
                              />
                            </div>
                            <div className="col-span-2">
                              <input
                                type="password"
                                className="w-full px-3 py-1 border border-gray-300 rounded-md"
                                placeholder="输入新API密钥"
                              />
                            </div>
                            <div className="col-span-1">
                              <select
                                className="w-full px-3 py-1 border border-gray-300 rounded-md"
                                defaultValue={assistant.status}
                              >
                                <option value="active">启用</option>
                                <option value="inactive">禁用</option>
                              </select>
                            </div>
                            <div className="col-span-2 flex justify-end space-x-2">
                              <button className="p-1 text-green-500 hover:text-green-700" onClick={saveEditing}>
                                <Save className="w-5 h-5" />
                              </button>
                              <button className="p-1 text-gray-500 hover:text-gray-700" onClick={cancelEditing}>
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          </>
                        ) : (
                          // 查看模式
                          <>
                            <div className="col-span-3 flex items-center">
                              <div
                                className={`w-8 h-8 rounded-full ${getProviderIconAndColor(assistant.provider).bgColor} flex items-center justify-center ${getProviderIconAndColor(assistant.provider).textColor} mr-2`}
                              >
                                <i className={getProviderIconAndColor(assistant.provider).icon}></i>
                              </div>
                              <div>
                                <div className="font-medium">{assistant.name}</div>
                                <div className="text-xs text-gray-500 truncate max-w-xs">{assistant.description}</div>
                              </div>
                            </div>
                            <div className="col-span-2">{assistant.provider}</div>
                            <div className="col-span-2">{assistant.model}</div>
                            <div className="col-span-2 font-mono text-sm">{assistant.apiKey}</div>
                            <div className="col-span-1">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  assistant.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {assistant.status === "active" ? "已启用" : "已禁用"}
                              </span>
                            </div>
                            <div className="col-span-2 flex justify-end space-x-2">
                              <button
                                className="p-1 text-blue-500 hover:text-blue-700"
                                onClick={() => startEditing(index)}
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                className="p-1 text-red-500 hover:text-red-700"
                                onClick={() => handleDeleteAssistant(assistant.id)}
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <i className="fas fa-info-circle mt-0.5"></i>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">关于API密钥安全</h3>
                      <p className="mt-1">
                        您的API密钥将被安全加密存储。我们不会将您的密钥发送到我们的服务器，所有API调用都在您的本地环境中进行。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "general" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">通用设置</h2>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">界面语言</label>
                      <select className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>简体中文</option>
                        <option>English</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">主题</label>
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <input type="radio" id="light" name="theme" className="mr-2" defaultChecked />
                          <label htmlFor="light">浅色</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="dark" name="theme" className="mr-2" />
                          <label htmlFor="dark">深色</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="system" name="theme" className="mr-2" />
                          <label htmlFor="system">跟随系统</label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">默认代码语言</label>
                      <select className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Python</option>
                        <option>JavaScript</option>
                        <option>TypeScript</option>
                        <option>Java</option>
                        <option>C++</option>
                      </select>
                    </div>

                    <div className="flex items-center">
                      <input type="checkbox" id="autoSave" className="mr-2" defaultChecked />
                      <label htmlFor="autoSave" className="text-sm font-medium text-gray-700">
                        启用自动保存
                      </label>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">保存设置</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "advanced" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">高级设置</h2>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">模型生成缓存</label>
                      <div className="flex items-center justify-between w-full md:w-1/2 p-4 border border-gray-200 rounded-md">
                        <div>
                          <div className="font-medium">当前缓存大小</div>
                          <div className="text-sm text-gray-500">256 MB</div>
                        </div>
                        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                          清除缓存
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">API请求超时设置</label>
                      <div className="flex items-center w-full md:w-1/3">
                        <input
                          type="number"
                          className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          defaultValue="30"
                          min="5"
                          max="120"
                        />
                        <span className="ml-2">秒</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">日志级别</label>
                      <select
                        className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="信息"
                      >
                        <option>错误</option>
                        <option>警告</option>
                        <option>信息</option>
                        <option>调试</option>
                      </select>
                    </div>

                    <div className="flex items-center">
                      <input type="checkbox" id="developerMode" className="mr-2" />
                      <label htmlFor="developerMode" className="text-sm font-medium text-gray-700">
                        启用开发者模式
                      </label>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">保存设置</button>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">危险区域</h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h4 className="text-red-800 font-medium">重置所有设置</h4>
                    <p className="mt-1 text-sm text-red-700">
                      此操作将重置所有系统设置为默认值，包括AI助手配置、界面设置和高级选项。此操作不可撤销。
                    </p>
                    <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                      重置所有设置
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />

      {/* 添加大模型弹窗 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">添加大语言模型</h3>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowAddModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">名称</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="为这个AI助手起个名字"
                  value={newAssistant.name}
                  onChange={(e) => setNewAssistant({ ...newAssistant, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">提供商</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newAssistant.provider}
                  onChange={handleProviderChange}
                >
                  <option value="OpenAI">OpenAI</option>
                  <option value="Anthropic">Anthropic</option>
                  <option value="Google">Google</option>
                  <option value="DeepSeek">DeepSeek</option>
                  <option value="Custom">自定义</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">模型</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入模型名称"
                  value={newAssistant.model}
                  onChange={(e) => setNewAssistant({ ...newAssistant, model: e.target.value })}
                />
                {newAssistant.provider === "DeepSeek" && (
                  <div className="mt-1 text-xs text-gray-500">
                    可选模型: deepseek-llm-67b-chat, deepseek-coder-33b-instruct, deepseek-coder-6.7b-instruct
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API密钥</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入API密钥"
                  value={newAssistant.apiKey}
                  onChange={(e) => setNewAssistant({ ...newAssistant, apiKey: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API端点</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入API端点URL（可选）"
                  value={newAssistant.endpoint}
                  onChange={(e) => setNewAssistant({ ...newAssistant, endpoint: e.target.value })}
                />
                {newAssistant.provider === "DeepSeek" && (
                  <div className="mt-1 text-xs text-gray-500">DeepSeek API端点: https://api.deepseek.com</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="简要描述这个AI助手的特点和用途"
                  rows={3}
                  value={newAssistant.description}
                  onChange={(e) => setNewAssistant({ ...newAssistant, description: e.target.value })}
                ></textarea>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => setShowAddModal(false)}
              >
                取消
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleAddAssistant}
              >
                添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
