'use client'

import { AlertCircleIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>🛑An Error Occurred While Authenticating🛑</AlertTitle>
        <AlertDescription>
          <p>We are very sorry, but it seems like there was an error while processing your authentication🙁</p>
          <p>We encourage you to check your credentials for correctness and, if the issue persists, feel free to <a href="mailto:astraberte9@gmail.com">contact us</a>✨</p>
        </AlertDescription>
      </Alert>
    </div>
    </div>
  )
}
