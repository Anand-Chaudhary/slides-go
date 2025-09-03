"use client";

import { useEffect } from "react";
import { useGetPPTStore } from "@/store/getPPTStore";
import { useParams } from "next/navigation";

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

  return (
    <div>
      <h1 className="text-2xl font-bold">{typedPPT.title}</h1>
      <div>
        {typedPPT.pages && typedPPT.pages.map((page) => (
          <div key={page.pageNo} className="mb-4">
            <h2 className="text-lg font-semibold">{page.title}</h2>
            <p>{page.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
