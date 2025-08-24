import { LucideIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface NavItems{
  item:{
    icon: LucideIcon,
    id: string,
    label: string
  },
  isActive: boolean,
  onClick: (data: string)=> void
  isCollapsed: boolean
}

export const NavItem = ({ item, isActive, onClick, isCollapsed }: NavItems) => {
  const router = useRouter()
  const Icon = item.icon

  return (
    <button
      onClick={() => {
        router.push(item.id)
        onClick(item.id) // notify parent about click
      }}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative
        ${isActive
          ? "bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white shadow-lg shadow-purple-500/30"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/50"
        }
        ${isCollapsed ? "justify-center px-3" : "justify-start"}
      `}
    >
      <Icon
        size={20}
        className={`
          transition-all duration-300 flex-shrink-0
          ${isActive ? "scale-110" : "group-hover:scale-105"}
        `}
      />

      <span
        className={`
          font-medium transition-all duration-300 whitespace-nowrap
          ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}
        `}
      >
        {item.label}
      </span>

      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 rounded-xl opacity-10 -z-10" />
      )}
    </button>
  )
}
