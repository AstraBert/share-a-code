"use client"

import type React from "react"

import { experimental_useObject as useObject } from "@ai-sdk/react"
import { codeBlockSchema } from "@/lib/schema"
import { PromptInput, PromptInputTextarea, PromptInputSubmit } from "@/components/ai-elements/prompt-input"
import { CodeBlock, CodeBlockCopyButton } from "@/components/ai-elements/code-block"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { ScrollArea } from "@radix-ui/react-scroll-area"

interface CodeEditProps {
  mdContent?: string
  codeContent?: string
}

const AI_MODELS = [
  { value: "openai/gpt-5", label: "GPT-5" },
  { value: "openai/gpt-4o", label: "GPT-4o" },
  { value: "openai/gpt-4.1", label: "GPT-4.1" },
  { value: "anthropic/claude-sonnet-4", label: "Claude Sonnet 4" },
  { value: "anthropic/claude-opus-4.1", label: "Claude Opus 4.1" },
  { value: "anthropic/claude-3.7-sonnet", label: "Claude 3.7 Sonnet" },
  { value: "google/gemini-2.5-flash", label: "Gemini 2.5 Flash" },
  { value: "google/gemini-2.0-flash", label: "Gemini 2.0 Flash" },
  { value: "deepseek/deepseek-v3.1", label: "DeepSeek v3.1" },
  { value: "alibaba/qwen3-coder", label: "Qwen3 Coder" },
  { value: "moonshotai/kimi-k2", label: "Kimi K2" },
]

export default function CodeEdit({ mdContent, codeContent }: CodeEditProps) {
  const [input, setInput] = useState("")
  const [selectedModel, setSelectedModel] = useState("openai/gpt-4o")
  const { object, submit, isLoading } = useObject({
    api: "/api/codegen",
    schema: codeBlockSchema,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      submit({
        prompt: input,
        model: selectedModel,
        mdContent: mdContent || "",
        codeContent: codeContent || "",
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <label htmlFor="model-select" className="block text-sm font-medium mb-2">
            AI Model
          </label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select an AI model" />
            </SelectTrigger>
            <SelectContent>
              {AI_MODELS.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 overflow-auto mb-4">
          <ScrollArea>
          {object?.code && object?.language && (
            <CodeBlock code={object.code} language={object.language} showLineNumbers={true}>
              <CodeBlockCopyButton />
            </CodeBlock>
          )}
          </ScrollArea>
        </div>

        <PromptInput onSubmit={handleSubmit} className="mt-4 w-full max-w-2xl mx-auto relative">
          <PromptInputTextarea
            value={input}
            placeholder="Generate a React todolist component"
            onChange={(e) => setInput(e.currentTarget.value)}
            className="pr-12"
          />
          <PromptInputSubmit
            status={isLoading ? "streaming" : "ready"}
            disabled={!input.trim()}
            className="absolute bottom-1 right-1"
          />
        </PromptInput>
      </div>
    </div>
  )
}
