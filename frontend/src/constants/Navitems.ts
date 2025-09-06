import { HelpCircle, Home, LayoutTemplate, Plus, Presentation, Settings } from "lucide-react"

export const NAVIGATIONITEMS = [
    { id: "/home", label: "Home", icon: Home },
    { id: "/template", label: "Templates", icon: LayoutTemplate },
    { id: "/create", label: "Create", icon: Plus },
    { id: "/presentation", label: "My Presentations", icon: Presentation },
]

export const BOTTOMITEMS = [
    { id: "/help", label: "Help", icon: HelpCircle },
    { id: "/settings", label: "Settings", icon: Settings },
]