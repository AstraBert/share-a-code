"use server"

import { createClient } from '@/utils/supabase/server'

export async function saveCode(code: string, instructions: string): Promise<string> {
  const supabase = await createClient()
  const uuid = crypto.randomUUID()
  const data = {
    code: code,
    instructions: instructions,
    shareCode: uuid,
  }

  const { error } = await supabase.from("code").insert(data)

  if (error) {
    console.log(error)
    return "An error occurred while inserting your data, please re-try"
  } else {
    return uuid
  }
}

export async function updateCode(code: string, instructions: string, codeGetter: string): Promise<string> {
  const supabase = await createClient()
  const data = {
    code: code,
    instructions: instructions,
  }

  const { error } = await supabase.from("code").update(data).eq("shareCode", codeGetter)

  if (error) {
    return "An error occurred while saving the current project"
  } else {
    return "The current project has been successfully saved!"
  }
}