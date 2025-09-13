'use server'

import { createAdminClient, createClient } from "@/utils/supabase/server";

export async function createPost(code: string, description: string, language: string) {
    const adminClient = await createAdminClient()
    const client = await createClient()
    const {data: userData, error: userError} = await adminClient.auth.getUser()
    if (userError) {
        return "An error occurred while trying to verify the current user, please verify you are correctly authenticated"
    }
    let userName: string = `user-${userData.user.id.substring(10,20)}`

    if ("name" in userData.user.user_metadata) {
        userName = userData.user.user_metadata.name
    }
    const postData = {
        code: code,
        instructions: description,
        authorName: userName,
        authorId: userData.user.id,
        likes: 0,
        codeLanguage: language,
    }
    const { error: postError } = await client.from("social").insert(postData)
    if (postError) {
        console.error(postError)
        return "Sorry, an error occurred while trying to upload your post"
    } else {
        return "Your post has been successfully published on learn.shareacode.cc!"
    }

}
