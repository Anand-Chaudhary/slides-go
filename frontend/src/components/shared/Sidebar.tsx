"use client"

import { useState } from "react"
import { Sparkles, ChevronLeft, ChevronRight, LogOutIcon } from "lucide-react"
import { NavItem } from "./NavItems"
import { Button } from "../ui/button"
import HandleLogout from "@/utils/HandleLogout"
import { BOTTOMITEMS, NAVIGATIONITEMS } from "@/constants/Navitems"

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState("/home")

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`
          bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
          flex flex-col transition-all duration-300 ease-in-out relative
          ${isCollapsed ? "w-16" : "w-64"}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={16} />
            </div>
            <span
              className={`
                text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent
                transition-all duration-300 whitespace-nowrap
                ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}
              `}
            >
              Presento
            </span>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>

        {/* Navigation */}
        <div className="flex-1 flex flex-col justify-between p-4">
          <nav className="space-y-2">
            {NAVIGATIONITEMS.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeItem === item.id}
                onClick={setActiveItem} // update active item
                isCollapsed={isCollapsed}
              />
            ))}
          </nav>

          <nav className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
            {BOTTOMITEMS.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeItem === item.id}
                onClick={setActiveItem} // update active item
                isCollapsed={isCollapsed}
              />
            ))}
            <Button
              onClick={() => HandleLogout()}
              className="w-full text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500">
              {
                isCollapsed ? <LogOutIcon /> : <p>Log Out</p>
              }
            </Button>
          </nav>
        </div>
      </div>

    </div>
  )
}
