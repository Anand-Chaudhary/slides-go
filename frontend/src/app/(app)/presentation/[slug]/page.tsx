"use client";

import { useEffect } from "react";
import { useGetPPTStore } from "@/store/getPPTStore";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function PresentationWithSlug() {
  const { slug } = useParams<{ slug: string }>();
  const { ppt, loading, error, getPPT } = useGetPPTStore();

  useEffect(() => {
    if (slug) {
      getPPT(slug);
    }
  }, [slug, getPPT]);  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!ppt) return <p>No PPT data found. Go back and create one.</p>;

  const typedPPT = ppt as PPT;
  console.log(typedPPT);
  
  return (
    <div>
      <h1 className="text-2xl font-bold">{typedPPT.title}</h1>
      <div className="flex flex-col gap-4">
        {typedPPT.pages && typedPPT.pages.map((page) => (
          <div key={page.pageNo} className="p-5 m-5 w-full bg-zinc-900 rounded-xl">
            <h1 className="text-2xl text-white font-bold">
              {page.title}
            </h1>
            <p className="text-white font-semibold">
              {page.description}
            </p>
            {
              page.points.map((point, idx)=><p key={idx} className="text-white">{point}</p>)
            }
            <Image src={page.imageUrl!} alt="Image" width={400} height={400} />
          </div>
        ))}
      </div>
    </div>
  );
}
