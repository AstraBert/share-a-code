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