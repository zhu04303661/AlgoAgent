/* eslint-disable @typescript-eslint/no-use-before-define */
'use client'

import type { FC } from 'react'
import {
  Copy,
  Play,
  RefreshCw,
  Sparkles,
} from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import produce, { setAutoFreeze } from 'immer'
import { useBoolean, useGetState } from 'ahooks'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../components/ui/resizable'
import Toast from './base/toast'
import Sidebar from './sidebar'
import ConfigSence from './config-scence'
import Chat from './chat'
import Loading from './base/loading'
import AppUnavailable from './app-unavailable'
import useConversation from '@/hooks/use-conversation'

import { fetchAppParams, fetchChatList, fetchConversations, generationConversationName, sendChatMessage, updateFeedback } from '@/service'
import type { ChatItem, ConversationItem, Feedbacktype, PromptConfig, VisionFile, VisionSettings } from '@/types/app'
import { Resolution, TransferMethod, WorkflowRunningStatus } from '@/types/app'

import { setLocaleOnClient } from '@/i18n/client'
import useBreakpoints, { MediaType } from '@/hooks/use-breakpoints'

import { replaceVarWithValues, userInputsFormToPromptVariables } from '@/utils/prompt'

import { API_KEY, APP_ID, APP_INFO, isShowPrompt, promptTemplate } from '@/config'
import type { Annotation as AnnotationType } from '@/types/log'
import { addFileInfos, sortAgentSorts } from '@/utils/tools'

export type IMainProps = {
  params?: any
}
// const [previewMode, setPreviewMode] = useState('code') // code, visual

const Main: FC<IMainProps> = ({ params }) => {
  const { t } = useTranslation()
  const media = useBreakpoints()
  const isMobile = media === MediaType.mobile
  const hasSetAppConfig = APP_ID && API_KEY

  /*
  * app info
  */
  const [appUnavailable, setAppUnavailable] = useState<boolean>(false)
  const [isUnknownReason, setIsUnknownReason] = useState<boolean>(false)
  const [promptConfig, setPromptConfig] = useState<PromptConfig | null>(null)
  const [inited, setInited] = useState<boolean>(false)
  // in mobile, show sidebar by click button
  const [isShowSidebar, { setTrue: showSidebar, setFalse: hideSidebar }] = useBoolean(false)
  const [visionConfig, setVisionConfig] = useState<VisionSettings | undefined>({
    enabled: false,
    number_limits: 2,
    detail: Resolution.low,
    transfer_methods: [TransferMethod.local_file],
  })

  useEffect(() => {
    if (APP_INFO?.title)
      document.title = `${APP_INFO.title}`
  }, [APP_INFO?.title])

  // onData change thought (the produce obj). https://github.com/immerjs/immer/issues/576
  useEffect(() => {
    setAutoFreeze(false)
    return () => {
      setAutoFreeze(true)
    }
  }, [])

  /*
  * conversation info
  */
  const {
    conversationList,
    setConversationList,
    currConversationId,
    getCurrConversationId,
    setCurrConversationId,
    getConversationIdFromStorage,
    isNewConversation,
    currConversationInfo,
    currInputs,
    newConversationInputs,
    resetNewConversationInputs,
    setCurrInputs,
    setNewConversationInfo,
    setExistConversationInfo,
  } = useConversation()

  const [conversationIdChangeBecauseOfNew, setConversationIdChangeBecauseOfNew, getConversationIdChangeBecauseOfNew] = useGetState(false)
  const [isChatStarted, { setTrue: setChatStarted, setFalse: setChatNotStarted }] = useBoolean(false)
  const handleStartChat = (inputs: Record<string, any>) => {
    createNewChat()
    setConversationIdChangeBecauseOfNew(true)
    setCurrInputs(inputs)
    setChatStarted()
    // parse variables in introduction
    setChatList(generateNewChatListWithOpenStatement('', inputs))
  }
  const hasSetInputs = (() => {
    if (!isNewConversation)
      return true

    return isChatStarted
  })()

  const conversationName = currConversationInfo?.name || t('app.chat.newChatDefaultName') as string
  const conversationIntroduction = currConversationInfo?.introduction || ''

  const handleConversationSwitch = () => {
    if (!inited)
      return

    // update inputs of current conversation
    let notSyncToStateIntroduction = ''
    let notSyncToStateInputs: Record<string, any> | undefined | null = {}
    if (!isNewConversation) {
      const item = conversationList.find(item => item.id === currConversationId)
      notSyncToStateInputs = item?.inputs || {}
      setCurrInputs(notSyncToStateInputs as any)
      notSyncToStateIntroduction = item?.introduction || ''
      setExistConversationInfo({
        name: item?.name || '',
        introduction: notSyncToStateIntroduction,
      })
    }
    else {
      notSyncToStateInputs = newConversationInputs
      setCurrInputs(notSyncToStateInputs)
    }

    // update chat list of current conversation
    if (!isNewConversation && !conversationIdChangeBecauseOfNew && !isResponding) {
      fetchChatList(currConversationId).then((res: any) => {
        const { data } = res
        const newChatList: ChatItem[] = generateNewChatListWithOpenStatement(notSyncToStateIntroduction, notSyncToStateInputs)

        data.forEach((item: any) => {
          newChatList.push({
            id: `question-${item.id}`,
            content: item.query,
            isAnswer: false,
            message_files: item.message_files?.filter((file: any) => file.belongs_to === 'user') || [],

          })
          newChatList.push({
            id: item.id,
            content: item.answer,
            agent_thoughts: addFileInfos(item.agent_thoughts ? sortAgentSorts(item.agent_thoughts) : item.agent_thoughts, item.message_files),
            feedback: item.feedback,
            isAnswer: true,
            message_files: item.message_files?.filter((file: any) => file.belongs_to === 'assistant') || [],
          })
        })
        setChatList(newChatList)
      })
    }

    if (isNewConversation && isChatStarted)
      setChatList(generateNewChatListWithOpenStatement())
  }
  useEffect(handleConversationSwitch, [currConversationId, inited])

  const handleConversationIdChange = (id: string) => {
    if (id === '-1') {
      createNewChat()
      setConversationIdChangeBecauseOfNew(true)
    }
    else {
      setConversationIdChangeBecauseOfNew(false)
    }
    // trigger handleConversationSwitch
    setCurrConversationId(id, APP_ID)
    hideSidebar()
  }

  /*
  * chat info. chat is under conversation.
  */
  const [chatList, setChatList, getChatList] = useGetState<ChatItem[]>([])
  const chatListDomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // scroll to bottom
    if (chatListDomRef.current)
      chatListDomRef.current.scrollTop = chatListDomRef.current.scrollHeight
  }, [chatList, currConversationId])
  // user can not edit inputs if user had send message
  const canEditInputs = !chatList.some(item => item.isAnswer === false) && isNewConversation
  const createNewChat = () => {
    // if new chat is already exist, do not create new chat
    if (conversationList.some(item => item.id === '-1'))
      return

    setConversationList(produce(conversationList, (draft) => {
      draft.unshift({
        id: '-1',
        name: t('app.chat.newChatDefaultName'),
        inputs: newConversationInputs,
        introduction: conversationIntroduction,
      })
    }))
  }

  // sometime introduction is not applied to state
  const generateNewChatListWithOpenStatement = (introduction?: string, inputs?: Record<string, any> | null) => {
    let calculatedIntroduction = introduction || conversationIntroduction || ''
    const calculatedPromptVariables = inputs || currInputs || null
    if (calculatedIntroduction && calculatedPromptVariables)
      calculatedIntroduction = replaceVarWithValues(calculatedIntroduction, promptConfig?.prompt_variables || [], calculatedPromptVariables)

    const openStatement = {
      id: `${Date.now()}`,
      content: calculatedIntroduction,
      isAnswer: true,
      feedbackDisabled: true,
      isOpeningStatement: isShowPrompt,
    }
    if (calculatedIntroduction)
      return [openStatement]

    return []
  }

  // init
  useEffect(() => {
    if (!hasSetAppConfig) {
      setAppUnavailable(true)
      return
    }
    (async () => {
      try {
        const [conversationData, appParams] = await Promise.all([fetchConversations(), fetchAppParams()])

        // handle current conversation id
        const { data: conversations, error } = conversationData as { data: ConversationItem[]; error: string }
        if (error) {
          Toast.notify({ type: 'error', message: error })
          throw new Error(error)
          return
        }
        const _conversationId = getConversationIdFromStorage(APP_ID)
        const isNotNewConversation = conversations.some(item => item.id === _conversationId)

        // fetch new conversation info
        const { user_input_form, opening_statement: introduction, file_upload, system_parameters }: any = appParams
        setLocaleOnClient(APP_INFO.default_language, true)
        setNewConversationInfo({
          name: t('app.chat.newChatDefaultName'),
          introduction,
        })
        const prompt_variables = userInputsFormToPromptVariables(user_input_form)
        setPromptConfig({
          prompt_template: promptTemplate,
          prompt_variables,
        } as PromptConfig)
        setVisionConfig({
          ...file_upload?.image,
          image_file_size_limit: system_parameters?.system_parameters || 0,
        })
        setConversationList(conversations as ConversationItem[])

        if (isNotNewConversation)
          setCurrConversationId(_conversationId, APP_ID, false)

        setInited(true)
      }
      catch (e: any) {
        if (e.status === 404) {
          setAppUnavailable(true)
        }
        else {
          setIsUnknownReason(true)
          setAppUnavailable(true)
        }
      }
    })()
  }, [])

  const [isResponding, { setTrue: setRespondingTrue, setFalse: setRespondingFalse }] = useBoolean(false)
  const [abortController, setAbortController] = useState<AbortController | null>(null)
  const { notify } = Toast
  const logError = (message: string) => {
    notify({ type: 'error', message })
  }

  const checkCanSend = () => {
    if (currConversationId !== '-1')
      return true

    if (!currInputs || !promptConfig?.prompt_variables)
      return true

    const inputLens = Object.values(currInputs).length
    const promptVariablesLens = promptConfig.prompt_variables.length

    const emptyInput = inputLens < promptVariablesLens || Object.values(currInputs).find(v => !v)
    if (emptyInput) {
      logError(t('app.errorMessage.valueOfVarRequired'))
      return false
    }
    return true
  }

  const [controlFocus, setControlFocus] = useState(0)
  const [openingSuggestedQuestions, setOpeningSuggestedQuestions] = useState<string[]>([])
  const [messageTaskId, setMessageTaskId] = useState('')
  const [hasStopResponded, setHasStopResponded, getHasStopResponded] = useGetState(false)
  const [isRespondingConIsCurrCon, setIsRespondingConCurrCon, getIsRespondingConIsCurrCon] = useGetState(true)
  const [userQuery, setUserQuery] = useState('')
  const [previewMode, setPreviewMode] = useState('code') // code, visual
  const [generatedCode, setGeneratedCode] = useState('')

  const handleAcceptCode = (code: string) => {
    setGeneratedCode(code)
  }

  const updateCurrentQA = ({
    responseItem,
    questionId,
    placeholderAnswerId,
    questionItem,
  }: {
    responseItem: ChatItem
    questionId: string
    placeholderAnswerId: string
    questionItem: ChatItem
  }) => {
    // closesure new list is outdated.
    const newListWithAnswer = produce(
      getChatList().filter(item => item.id !== responseItem.id && item.id !== placeholderAnswerId),
      (draft) => {
        if (!draft.find(item => item.id === questionId))
          draft.push({ ...questionItem })

        draft.push({ ...responseItem })
      })
    setChatList(newListWithAnswer)
  }

  const handleSend = async (message: string, files?: VisionFile[]) => {
    if (isResponding) {
      notify({ type: 'info', message: t('app.errorMessage.waitForResponse') })
      return
    }
    const data: Record<string, any> = {
      inputs: currInputs,
      query: message,
      conversation_id: isNewConversation ? null : currConversationId,
    }

    if (visionConfig?.enabled && files && files?.length > 0) {
      data.files = files.map((item) => {
        if (item.transfer_method === TransferMethod.local_file) {
          return {
            ...item,
            url: '',
          }
        }
        return item
      })
    }

    // question
    const questionId = `question-${Date.now()}`
    const questionItem = {
      id: questionId,
      content: message,
      isAnswer: false,
      message_files: files,
    }

    const placeholderAnswerId = `answer-placeholder-${Date.now()}`
    const placeholderAnswerItem = {
      id: placeholderAnswerId,
      content: '',
      isAnswer: true,
    }

    const newList = [...getChatList(), questionItem, placeholderAnswerItem]
    setChatList(newList)

    let isAgentMode = false

    // answer
    const responseItem: ChatItem = {
      id: `${Date.now()}`,
      content: '',
      agent_thoughts: [],
      message_files: [],
      isAnswer: true,
    }
    let hasSetResponseId = false

    const prevTempNewConversationId = getCurrConversationId() || '-1'
    let tempNewConversationId = ''

    setRespondingTrue()
    sendChatMessage(data, {
      getAbortController: (abortController) => {
        setAbortController(abortController)
      },
      onData: (message: string, isFirstMessage: boolean, { conversationId: newConversationId, messageId, taskId }: any) => {
        if (!isAgentMode) {
          responseItem.content = responseItem.content + message
        }
        else {
          const lastThought = responseItem.agent_thoughts?.[responseItem.agent_thoughts?.length - 1]
          if (lastThought)
            lastThought.thought = lastThought.thought + message // need immer setAutoFreeze
        }
        if (messageId && !hasSetResponseId) {
          responseItem.id = messageId
          hasSetResponseId = true
        }

        if (isFirstMessage && newConversationId)
          tempNewConversationId = newConversationId

        setMessageTaskId(taskId)
        // has switched to other conversation
        if (prevTempNewConversationId !== getCurrConversationId()) {
          setIsRespondingConCurrCon(false)
          return
        }
        updateCurrentQA({
          responseItem,
          questionId,
          placeholderAnswerId,
          questionItem,
        })
      },
      async onCompleted(hasError?: boolean) {
        if (hasError)
          return

        if (getConversationIdChangeBecauseOfNew()) {
          const { data: allConversations }: any = await fetchConversations()
          const newItem: any = await generationConversationName(allConversations[0].id)

          const newAllConversations = produce(allConversations, (draft: any) => {
            draft[0].name = newItem.name
          })
          setConversationList(newAllConversations as any)
        }
        setConversationIdChangeBecauseOfNew(false)
        resetNewConversationInputs()
        setChatNotStarted()
        setCurrConversationId(tempNewConversationId, APP_ID, true)
        setRespondingFalse()
      },
      onFile(file) {
        const lastThought = responseItem.agent_thoughts?.[responseItem.agent_thoughts?.length - 1]
        if (lastThought)
          lastThought.message_files = [...(lastThought as any).message_files, { ...file }]

        updateCurrentQA({
          responseItem,
          questionId,
          placeholderAnswerId,
          questionItem,
        })
      },
      onThought(thought) {
        isAgentMode = true
        const response = responseItem as any
        if (thought.message_id && !hasSetResponseId) {
          response.id = thought.message_id
          hasSetResponseId = true
        }
        // responseItem.id = thought.message_id;
        if (response.agent_thoughts.length === 0) {
          response.agent_thoughts.push(thought)
        }
        else {
          const lastThought = response.agent_thoughts[response.agent_thoughts.length - 1]
          // thought changed but still the same thought, so update.
          if (lastThought.id === thought.id) {
            thought.thought = lastThought.thought
            thought.message_files = lastThought.message_files
            responseItem.agent_thoughts![response.agent_thoughts.length - 1] = thought
          }
          else {
            responseItem.agent_thoughts!.push(thought)
          }
        }
        // has switched to other conversation
        if (prevTempNewConversationId !== getCurrConversationId()) {
          setIsRespondingConCurrCon(false)
          return false
        }

        updateCurrentQA({
          responseItem,
          questionId,
          placeholderAnswerId,
          questionItem,
        })
      },
      onMessageEnd: (messageEnd) => {
        if (messageEnd.metadata?.annotation_reply) {
          responseItem.id = messageEnd.id
          responseItem.annotation = ({
            id: messageEnd.metadata.annotation_reply.id,
            authorName: messageEnd.metadata.annotation_reply.account.name,
          } as AnnotationType)
          const newListWithAnswer = produce(
            getChatList().filter(item => item.id !== responseItem.id && item.id !== placeholderAnswerId),
            (draft) => {
              if (!draft.find(item => item.id === questionId))
                draft.push({ ...questionItem })

              draft.push({
                ...responseItem,
              })
            })
          setChatList(newListWithAnswer)
          return
        }
        // not support show citation
        // responseItem.citation = messageEnd.retriever_resources
        const newListWithAnswer = produce(
          getChatList().filter(item => item.id !== responseItem.id && item.id !== placeholderAnswerId),
          (draft) => {
            if (!draft.find(item => item.id === questionId))
              draft.push({ ...questionItem })

            draft.push({ ...responseItem })
          })
        setChatList(newListWithAnswer)
      },
      onMessageReplace: (messageReplace) => {
        setChatList(produce(
          getChatList(),
          (draft) => {
            const current = draft.find(item => item.id === messageReplace.id)

            if (current)
              current.content = messageReplace.answer
          },
        ))
      },
      onError() {
        setRespondingFalse()
        // role back placeholder answer
        setChatList(produce(getChatList(), (draft) => {
          draft.splice(draft.findIndex(item => item.id === placeholderAnswerId), 1)
        }))
      },
      onWorkflowStarted: ({ workflow_run_id, task_id }) => {
        // taskIdRef.current = task_id
        responseItem.workflow_run_id = workflow_run_id
        responseItem.workflowProcess = {
          status: WorkflowRunningStatus.Running,
          tracing: [],
        }
        setChatList(produce(getChatList(), (draft) => {
          const currentIndex = draft.findIndex(item => item.id === responseItem.id)
          draft[currentIndex] = {
            ...draft[currentIndex],
            ...responseItem,
          }
        }))
      },
      onWorkflowFinished: ({ data }) => {
        responseItem.workflowProcess!.status = data.status as WorkflowRunningStatus
        setChatList(produce(getChatList(), (draft) => {
          const currentIndex = draft.findIndex(item => item.id === responseItem.id)
          draft[currentIndex] = {
            ...draft[currentIndex],
            ...responseItem,
          }
        }))
      },
      onNodeStarted: ({ data }) => {
        responseItem.workflowProcess!.tracing!.push(data as any)
        setChatList(produce(getChatList(), (draft) => {
          const currentIndex = draft.findIndex(item => item.id === responseItem.id)
          draft[currentIndex] = {
            ...draft[currentIndex],
            ...responseItem,
          }
        }))
      },
      onNodeFinished: ({ data }) => {
        const currentIndex = responseItem.workflowProcess!.tracing!.findIndex(item => item.node_id === data.node_id)
        responseItem.workflowProcess!.tracing[currentIndex] = data as any
        setChatList(produce(getChatList(), (draft) => {
          const currentIndex = draft.findIndex(item => item.id === responseItem.id)
          draft[currentIndex] = {
            ...draft[currentIndex],
            ...responseItem,
          }
        }))
      },
    })
  }

  const handleFeedback = async (messageId: string, feedback: Feedbacktype) => {
    await updateFeedback({ url: `/messages/${messageId}/feedbacks`, body: { rating: feedback.rating } })
    const newChatList = chatList.map((item) => {
      if (item.id === messageId) {
        return {
          ...item,
          feedback,
        }
      }
      return item
    })
    setChatList(newChatList)
    notify({ type: 'success', message: t('common.api.success') })
  }

  const renderSidebar = () => {
    if (!APP_ID || !APP_INFO || !promptConfig)
      return null
    return (
      <Sidebar
        list={conversationList}
        onCurrentIdChange={handleConversationIdChange}
        currentId={currConversationId}
        copyRight={APP_INFO.copyright || APP_INFO.title}
      />
    )
  }

  if (appUnavailable)
    return <AppUnavailable isUnknownReason={isUnknownReason} errMessage={!hasSetAppConfig ? 'Please set APP_ID and API_KEY in config/index.tsx' : ''} />

  if (!APP_ID || !APP_INFO || !promptConfig)
    return <Loading type='app' />

  return (
    <div className='bg-gray-100'>
      {/* <Header
        title={APP_INFO.title}
        isMobile={isMobile}
        onShowSideBar={showSidebar}
        onCreateNewChat={() => handleConversationIdChange('-1')}
      /> */}

      {/* Resizable panels */}
      <ResizablePanelGroup direction="horizontal" className="flex flex-1">
        {/* Middle panel - External AI Assistant iframe */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="flex rounded-t-2xl bg-white overflow-hidden">
            {/* sidebar */}
            {!isMobile && renderSidebar()}
            {isMobile && isShowSidebar && (
              <div className='fixed inset-0 z-50'
                style={{ backgroundColor: 'rgba(35, 56, 118, 0.2)' }}
                onClick={hideSidebar}
              >
                <div className='inline-block' onClick={e => e.stopPropagation()}>
                  {renderSidebar()}
                </div>
              </div>
            )}
            {/* main */}
            <div className='flex-grow flex flex-col h-[calc(100vh_-_3rem)] overflow-y-auto'>
              <ConfigSence
                conversationName={conversationName}
                hasSetInputs={hasSetInputs}
                isPublicVersion={isShowPrompt}
                siteInfo={APP_INFO}
                promptConfig={promptConfig}
                onStartChat={handleStartChat}
                canEditInputs={canEditInputs}
                savedInputs={currInputs as Record<string, any>}
                onInputsChange={setCurrInputs}
              ></ConfigSence>

              {
                hasSetInputs && (
                  <div className='relative grow h-[200px] pc:w-[794px] max-w-full mobile:w-full pb-[66px] mx-auto mb-3.5 overflow-hidden'>
                    <div className='h-full overflow-y-auto' ref={chatListDomRef}>
                      <Chat
                        chatList={chatList}
                        onSend={handleSend}
                        onFeedback={handleFeedback}
                        isResponding={isResponding}
                        checkCanSend={checkCanSend}
                        visionConfig={visionConfig}
                        onAcceptCode={handleAcceptCode}
                      />
                    </div>
                  </div>)
              }
            </div>
          </div>
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
                        {'>'}当前选择的Agent模型: GPT)
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
                      {'>'}已连接到外部AI助手服务，当前选择的模型:
                    </div>
                  )}
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default React.memo(Main)
