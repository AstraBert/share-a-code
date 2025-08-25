import { streamObject } from "ai"
import { codeBlockSchema } from "@/lib/schema"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { prompt, model = "openai/gpt-4o", mdContent = "", codeContent = "" } = await req.json()

  let contextString = ""
  if (codeContent.trim()) {
    contextString += `\n\nExisting code context:\n${codeContent}`
  }
  if (mdContent.trim()) {
    contextString += `\n\nInstructions/Documentation context:\n${mdContent}`
  }

  const result = streamObject({
    model: model,
    schema: codeBlockSchema,
    prompt: `You are a helpful coding assistant. Only generate code, no markdown formatting or backticks, or text. ${prompt}${contextString}`,
  })

  return result.toTextStreamResponse()
}
