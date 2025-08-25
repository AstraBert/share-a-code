"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import Image from "next/image"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { type ChangeEvent, useState } from "react"
import { CodeBlock, CodeBlockCopyButton } from "@/components/ai-elements/code-block"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Footer } from "@/components/custom/footer"
import { saveCode, updateCode } from "@/lib/save"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getCode } from "@/lib/get-code"
import CodeEdit from "@/components/custom/code-edit"

const Home = () => {
  const [codeContent, setCodeContent] = useState("")
  const [mdContent, setmdContent] = useState("")
  const [language, setLanguage] = useState("python")
  const [shareCode, setShareCode] = useState("")
  const [shareCodeGetter, setShareCodeGetter] = useState("")
  const [ownership, setOwnership] = useState(true)
  const [collaboration, setCollaboration] = useState(true)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCodeContent(e.target.value)
  }

  const handleCodeGetter = (e: ChangeEvent<HTMLInputElement>) => {
    setShareCodeGetter(e.target.value)
  }

  const handleMdChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setmdContent(e.target.value)
  }

  const handleLanguage = (value: string) => {
    setLanguage(value)
  }

  const handleShareCode = async (code: string, instructions: string, ownership: boolean, collaboration: boolean) => {
    const sharingCode = await saveCode(code, instructions, ownership, collaboration)
    setShareCode(sharingCode)
  }

  const getSharedCode = async (codeGetter: string) => {
    const data = await getCode(codeGetter)
    setCodeContent(data.code)
    setmdContent(data.instructions)
  }

  const handleCurrentCode = async (codeContent: string, instructions: string, codeGetter: string) => {
    const cdGtr = await updateCode(codeContent, instructions, codeGetter)
    setShareCode(cdGtr)
  }

  const handleOwnership = () => {
    setOwnership(!ownership)
  }

  const handleCollaboration = () => {
    setCollaboration(!collaboration)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <nav className="border-b bg-white/90 dark:bg-slate-900/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-slate-900/80 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <a href="#" className="hover:scale-105 transition-transform duration-200">
                <Image src="/logo.svg" alt="share-a-code Logo" width={70} height={70} className="rounded-lg" />
              </a>
              <a href="#" className="group">
                <h1 className="text-xl font-bold">Share-A-Code</h1>
              </a>
            </div>

            {/* Navigation Links */}
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-2">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="https://shareacode.cc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200 hover:scale-105"
                    >
                      Website
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="https://link.clelia.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200 hover:scale-105"
                    >
                      Social Platforms
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="https://github.com/AstraBert/share-a-code"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200 hover:scale-105"
                    >
                      GitHub
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <div className="grid w-full max-w-sm items-center gap-3 mx-auto">
          <Label className="justify-center font-semibold">✨Put a share code in the box below✨</Label>
          <Input placeholder="your-code-here" onChange={handleCodeGetter} value={shareCodeGetter} />
          <Button
            onClick={() => getSharedCode(shareCodeGetter)}
            className="bg-gray-900 text-white hover:bg-white hover:text-gray-900 shadow-lg border-2"
          >
            View A Shared Code Project
          </Button>
        </div>
        <Tabs defaultValue="editor" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 flex-shrink-0 mb-8">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="code-edit-ai">AI Code Assistant</TabsTrigger>
          </TabsList>
          <TabsContent value="editor" className="flex-1 mt-0 min-h-0">
            {/* Title and Subtitle */}
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                Code Editor
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Write, format, and share your code with beautiful syntax highlighting and instant preview
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Code Editor */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Editor</h3>
                <div className="relative group">
                  <div className="relative">
                    <Textarea
                      onChange={handleChange}
                      placeholder="Enter your code here and watch it come to life in the preview..."
                      className="min-h-[400px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl font-mono text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-lg transition-all duration-200"
                      value={codeContent}
                    />
                  </div>
                </div>
              </div>

              {/* Code Preview */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Preview</h3>
                <div className="relative group">
                  <div className="relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
                    <CodeBlock code={codeContent} language={language}>
                      <CodeBlockCopyButton
                        onCopy={() => console.log("Copied code to clipboard")}
                        onError={() => console.error("Failed to copy code to clipboard")}
                      />
                    </CodeBlock>
                  </div>
                </div>
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex justify-center">
              <div className="relative group">
                <Select onValueChange={handleLanguage} value={language}>
                  <SelectTrigger className="w-[200px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-lg rounded-xl transition-all duration-200 hover:shadow-xl">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-xl rounded-xl">
                    <SelectGroup>
                      <SelectLabel className="text-slate-600 dark:text-slate-400 font-medium">Language</SelectLabel>
                      <SelectItem value="js" className="hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                        JavaScript
                      </SelectItem>
                      <SelectItem value="ts" className="hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                        TypeScript
                      </SelectItem>
                      <SelectItem value="go" className="hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                        Go
                      </SelectItem>
                      <SelectItem value="c++" className="hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                        C++
                      </SelectItem>
                      <SelectItem value="java" className="hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                        Java
                      </SelectItem>
                      <SelectItem value="python" className="hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                        Python
                      </SelectItem>
                      <SelectItem value="rust" className="hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                        Rust
                      </SelectItem>
                      <SelectItem value="html" className="hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                        HTML
                      </SelectItem>
                      <SelectItem value="dart" className="hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                        Dart
                      </SelectItem>
                      <SelectItem value="bash" className="hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                        Bash
                      </SelectItem>
                      <SelectItem value="powershell" className="hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                        Powershell
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="instructions" className="flex-1 mt-0 min-h-0">
            {/* Title and Subtitle */}
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                Instructions
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Write instructions or notes on the code you want to share
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Markdown Editor */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Editor</h3>
                <div className="relative group">
                  <div className="relative">
                    <Textarea
                      onChange={handleMdChange}
                      placeholder="Enter your instructions here using Markdown syntax and watch the preview update..."
                      className="min-h-[500px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl font-mono text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-lg transition-all duration-200"
                      value={mdContent}
                    />
                  </div>
                </div>
              </div>

              {/* Markdown Preview */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Preview</h3>
                <div className="relative group">
                  <Card className="shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="font-bold text-center text-slate-700 dark:text-slate-300">
                        Markdown Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-96 w-full">
                        <div
                          className="prose prose-sm max-w-none dark:prose-invert"
                          dangerouslySetInnerHTML={{
                            __html: mdContent
                              .replace(/^### (.*$)/gim, "<h3>$1</h3>")
                              .replace(/^## (.*$)/gim, "<h2>$1</h2>")
                              .replace(/^# (.*$)/gim, "<h1>$1</h1>")
                              .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
                              .replace(/\*(.*?)\*/gim, "<em>$1</em>")
                              .replace(/```(.*?)```/gim, "<pre><code>$1</code></pre>")
                              .replace(/`(.*?)`/gim, "<code>$1</code>")
                              .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
                              .replace(/\n/gim, "<br>"),
                          }}
                        />
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="code-edit-ai" className="flex-1 mt-0 min-h-0">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                AI Code Assistant
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Edit your code with AI</p>
            </div>
            <CodeEdit mdContent={mdContent} codeContent={codeContent} />
          </TabsContent>
        </Tabs>

        <div className="grid w-full max-w-sm items-center gap-3 mx-auto">
          <Button
            onClick={() => handleShareCode(codeContent, mdContent, ownership, collaboration)}
            className="bg-gray-900 text-white hover:bg-white hover:text-gray-900 shadow-lg border-2"
          >
            Create a New Code Project
          </Button>
          <Button
            onClick={() => handleCurrentCode(codeContent, mdContent, shareCodeGetter)}
            className="bg-gray-900 text-white hover:bg-white hover:text-gray-900 shadow-lg border-2"
          >
            Save Current Code Project
          </Button>
          <div className="flex items-center space-x-2 justify-center">
            <Switch onClick={handleOwnership} defaultChecked />
            <Label>I am the owner of this code</Label>
          </div>
          <div className="flex items-center space-x-2 justify-center">
            <Switch onClick={handleCollaboration} defaultChecked />
            <Label>Allow others to collaborate</Label>
          </div>
          <Label className="justify-center font-semibold text-center">
            ✨Share your code project with other people using the code below✨
          </Label>
          <Input value={shareCode} readOnly={true} placeholder="The code to share this project will appear here" />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
