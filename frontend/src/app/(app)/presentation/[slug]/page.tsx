"use client";

import { useEffect } from "react";
import { useGetPPTStore } from "@/store/getPPTStore";
import { useParams } from "next/navigation";
import ColorfulTemplate from "@/templates/ColorfulTemplate";
import { PPT } from "@/types/ppt.types";
import DarkTemplate from "@/templates/DarkTemplate";
import WhiteTemplate from "@/templates/WhiteTemplate";
import MedivialTemplate from "@/templates/MedivialTemplate";

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
    <>
      <h1 className="font-bold text-2xl">{typedPPT.title}</h1>
      <MedivialTemplate ppt={typedPPT} />
    </>
  );
}
