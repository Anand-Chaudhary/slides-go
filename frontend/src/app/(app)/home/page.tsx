"use client"

import { Presentation } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  return (
    <div className="flex-1 p-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 h-full p-8">
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Presentation className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Welcome to Presento</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
            Transform your ideas into stunning presentations with AI. Just describe what you want and we&apos;ll create it
            for you.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              href={"/create"}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 hover:from-purple-600 hover:via-pink-600 hover:to-yellow-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Create Presentation
            </Link>
            <Link
              href={"/presentation"}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
            >
              View My Presentations
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage