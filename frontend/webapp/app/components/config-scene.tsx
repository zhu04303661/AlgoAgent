import type { FC } from 'react'
import React from 'react'
import type { PromptConfig } from '@/types/app'

type Props = {
    conversationName: string
    hasSetInputs: boolean
    isPublicVersion: boolean
    siteInfo: any
    promptConfig: PromptConfig
    onStartChat: (inputs: Record<string, any>) => void
    canEditInputs: boolean
    savedInputs: Record<string, any>
    onInputsChange: (inputs: Record<string, any>) => void
}

const ConfigScene: FC<Props> = ({
    conversationName,
    hasSetInputs,
    isPublicVersion,
    siteInfo,
    promptConfig,
    onStartChat,
    canEditInputs,
    savedInputs,
    onInputsChange,
}) => {
    return (
        <div className="p-4">
            <h2 className="text-lg font-medium mb-4">{conversationName}</h2>
            {/* Add your configuration UI here */}
        </div>
    )
}

export default ConfigScene
