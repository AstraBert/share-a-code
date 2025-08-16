"use server"

import { createClient } from '@/utils/supabase/server'

interface CodeGetResult {
    code: string
    instructions: string
}

export async function getCode(codeGetter: string): Promise<CodeGetResult> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("code").select().eq("shareCode", codeGetter)

  if (error || data.length == 0) {
    console.log(error)
    return {code: "An error occurred while getting the code", instructions: "An error occurred while getting the instructions"}
  } else {
    return {code: data[0].code, instructions: data[0].instructions}
  }
}