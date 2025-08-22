"use server"

import { createClient } from '@/utils/supabase/server'

export async function saveCode(code: string, instructions: string, ownership: boolean, collaboration: boolean): Promise<string> {
  const supabase = await createClient()
  const uuid = crypto.randomUUID()
  let owner: null | string | undefined = undefined
  if (ownership) {
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError) {
      owner = null
    } else {
      owner = userData.user.id
    }
  }
  const data = {
    code: code,
    instructions: instructions,
    shareCode: uuid,
    codeOwner: owner ?? null,
    allowsCollaboration: collaboration,
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
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError) {
    return "An error occurred while trying to verify your permissions to write to this project. Try again later."
  }

  const currentUserId = userData.user.id

  const { data: selectData, error: selectError } = await supabase.from("code").select("*").eq("shareCode", codeGetter)

  if (selectError) {
    return "An error occurred while trying to verify your permissions to write to this project. Try again later."
  }

  if (selectData[0].codeOwner != null && selectData[0].codeOwner != currentUserId && !selectData[0].allowsCollaboration) {
    return "Sorry, it seems like you do not have permission to write this project"
  }

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
