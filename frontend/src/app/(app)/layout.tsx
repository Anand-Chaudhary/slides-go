"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/shared/Sidebar'

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [authorized, setAuthorized] = useState(false)
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setAuthorized(true)
        } else {
            router.replace('/login')
        }
        setChecked(true)
    }, [router])

    if (!checked) return <div className='p-7'>Loading...</div>
    if (!authorized) return null

    return (
        <>
            <main className="flex h-screen bg-gray-50 dark:bg-gray-900">
                <Sidebar />
                {children}
            </main>
        </>
    )
}
