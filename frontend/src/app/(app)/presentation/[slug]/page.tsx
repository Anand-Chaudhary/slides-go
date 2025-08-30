"use client"

import { usePPTStore } from "@/store/createPPTStore"
import { useParams } from "next/navigation"

export default function PresentationWithSlug(){
  const { slug } = useParams<{ slug: string }>()
  const { ppt } = usePPTStore()

  if (!ppt || ppt.slug !== slug) {
    return <p>No PPT data found. Go back and create one.</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{ppt.result.title}</h1>
      <p>{ppt.createdBy}</p>
    </div>
  )
}
