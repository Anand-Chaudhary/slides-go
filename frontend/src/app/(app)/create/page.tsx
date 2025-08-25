"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Sparkles } from "lucide-react"
import { PRESENTATION_TITLES } from "@/constants/PresentationItems"
import { createPPT } from "@/store/createPPTStore"
import { toast } from "sonner"

const Create = () => {
  const [input, setInput] = useState("")
  const { loading, error, success, create, message } = createPPT()

  const handleCardClick = (title: string) => {
    setInput(title)
  }

  const handleSubmit = async () => {
    console.log("Sending to backend:", input)

    const res = create(input);
  }

  useEffect(() => {
    if (success) {
      toast.success(message);
    } else {
      toast.success(error?.message)
    }
  }, [success, message, error])

  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent mb-4">
            Create Your Presentation
          </h1>
          <p className="text-gray-600 text-lg">
            Tell us what you want to create, or choose from popular titles below
          </p>
        </div>

        {/* Large Input Box */}
        <div className="mb-8">
          <div className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What do you want to create make sure to send the number of pages you want? (e.g., A 4 page presentation about sustainable energy solutions for small businesses)"
              className="min-h-[120px] text-lg p-6 border-2 border-purple-200 focus:border-purple-400 rounded-xl resize-none shadow-lg bg-white/80 backdrop-blur-sm"
            />
            <div className="absolute top-4 right-4">
              <Sparkles className="h-6 w-6 text-purple-400" />
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!input.trim() || loading}
            className="mt-4 px-8 py-3 text-lg font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 hover:from-purple-600 hover:via-pink-600 hover:to-yellow-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Create Presentation
              </div>
            )}
          </Button>
        </div>

        {/* Title Cards */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Popular Presentation Types</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRESENTATION_TITLES.map((title, index) => (
              <Card
                key={index}
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-gray-200 hover:border-purple-300 bg-white/80 backdrop-blur-sm"
                onClick={() => handleCardClick(title)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800 group-hover:text-purple-600 transition-colors">
                      {title}
                    </h3>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-60" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Create