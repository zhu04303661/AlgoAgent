'use client'
import { useState } from 'react'
import SharedSidebar from '../components/shared-sidebar'
import Header from '../components/header'
import Footer from '../components/footer'

type Task = {
    id: string
    name: string
    type: string
    status: 'pending' | 'processing' | 'completed' | 'failed'
    progress: number
    createdAt: string
    details: string
}

export default function TasksPage() {
    const [tasks] = useState<Task[]>([
        {
            id: '1',
            name: '工业缺陷检测模型',
            type: '视觉识别',
            status: 'processing',
            progress: 45,
            createdAt: '2024-03-20 14:30',
            details: '正在训练模型，当前epoch: 50/100',
        },
        {
            id: '2',
            name: '文档OCR识别模型',
            type: '文字识别',
            status: 'completed',
            progress: 100,
            createdAt: '2024-03-19 10:15',
            details: '模型训练完成，准确率达到98.5%',
        },
    ])

    const getStatusColor = (status: Task['status']) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            processing: 'bg-blue-100 text-blue-800',
            completed: 'bg-green-100 text-green-800',
            failed: 'bg-red-100 text-red-800',
        }
        return colors[status]
    }

    const getStatusText = (status: Task['status']) => {
        const texts = {
            pending: '等待中',
            processing: '进行中',
            completed: '已完成',
            failed: '失败',
        }
        return texts[status]
    }

    return (
        <div className="flex flex-col h-screen">
            <Header title="任务列表" />
            <div className="flex flex-1 overflow-hidden">
                <SharedSidebar activePage="tasks" />
                <div className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-2xl font-bold mb-6">模型训练任务</h1>

                        <div className="bg-white rounded-lg shadow">
                            {tasks.map(task => (
                                <div key={task.id} className="border-b border-gray-200 p-6 last:border-0">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-medium">{task.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">创建时间：{task.createdAt}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}>
                                            {getStatusText(task.status)}
                                        </span>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>训练进度</span>
                                            <span>{task.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${task.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="text-sm text-gray-600">
                                        <span className="font-medium">详细信息：</span>
                                        {task.details}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
