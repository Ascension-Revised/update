"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import Spline from "@splinetool/react-spline/next"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatbotSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm your personal agent. I can help you with architectural styles, design concepts, CAD tools, sustainable building practices, and much more. What would you like to explore today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error while processing your request. Please try again.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="ml-2 hidden sm:inline">Ask me anything</span>
        </Button>
      ) : (
        <div className="relative">
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <Spline scene="https://prod.spline.design/664Yv8BWgvJ6BoU5/scene.splinecode" width={384} height={384} />
          </div>
          <Card className="relative w-80 sm:w-96 h-96 bg-transparent backdrop-blur-sm border border-white/20 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-600/90 to-blue-600/90 text-white rounded-t-lg backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Agent</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-full">
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 max-h-64">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 rounded-lg text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-white/20 backdrop-blur-sm ml-8 text-white border border-white/30"
                        : "bg-white/15 backdrop-blur-sm mr-8 text-white border border-white/20"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
                {isLoading && (
                  <div className="bg-white/15 backdrop-blur-sm mr-8 text-white p-3 rounded-lg text-sm flex items-center gap-2 border border-white/20">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Thinking...
                  </div>
                )}
              </div>
              <div className="p-3 pb-4 border-t border-white/20">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about architecture..."
                    className="flex-1 text-xs px-2 py-1 bg-transparent backdrop-blur-sm border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-white/60 h-8"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="bg-gradient-to-r from-purple-600/90 to-blue-600/90 hover:from-purple-700/90 hover:to-blue-700/90 text-white px-2 backdrop-blur-sm h-8"
                  >
                    {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
