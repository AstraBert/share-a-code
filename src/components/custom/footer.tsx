import Link from "next/link"
import { Github, Globe, Users } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-white/90 dark:bg-slate-900/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-slate-900/80">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Share-A-Code</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">
              A beautiful platform for sharing code snippets and instructions with syntax highlighting and live preview.
            </p>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="space-y-2">
              <Link
                href="https://shareacode.cc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Globe className="h-4 w-4 mr-2" />
                Website
              </Link>
              <Link
                href="https://github.com/AstraBert/share-a-code"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Link>
              <Link
                href="https://link.clelia.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Users className="h-4 w-4 mr-2" />
                Social Platforms
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Features</h4>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <div>✨ Syntax Highlighting</div>
              <div>📝 Markdown Support</div>
              <div>🎨 Beautiful UI</div>
              <div>📱 Responsive Design</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © 2025 Share-A-Code. Built with ❤️ for developers.
            </p>
            <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
              <span>Made with Next.js & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
