"use client";

import { useEffect } from "react";
import { useGetPPTStore } from "@/store/getPPTStore";
import { useParams, useSearchParams } from "next/navigation";
import ColorfulTemplate from "@/templates/ColorfulTemplate";
import DarkTemplate from "@/templates/DarkTemplate";
import WhiteTemplate from "@/templates/WhiteTemplate";
import MedivialTemplate from "@/templates/MedivialTemplate";
import { PPT } from "@/types/ppt.types";

//eslint-disable-next-line
const templateMap: Record<string, any> = {
  WhiteTemplate,
  DarkTemplate,
  ColorfulTemplate,
  MedivialTemplate,
};

export default function PresentationWithSlug() {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const template = searchParams.get("template") || "WhiteTemplate";
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
  const SelectedTemplate = templateMap[template] || WhiteTemplate;

  return (
    <>
      <h1 className="font-bold text-2xl">{typedPPT.title}</h1>
      <SelectedTemplate ppt={typedPPT} />
    </>
  );
}
