"use client";

import { useEffect, useRef } from "react";
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

export default function PresentationPage() {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const template = searchParams.get("template") || "WhiteTemplate";
  const { ppt, loading, error, getPPT } = useGetPPTStore();
  const pptRef = useRef<PPT | null>(null);

  useEffect(() => {
    if (slug) {
      getPPT(slug);
    }
  }, [slug, getPPT]);

  useEffect(() => {
    pptRef.current = ppt as PPT;
  }, [ppt]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!ppt) return <p>No PPT data found. Go back and create one.</p>;

  const typedPPT = ppt as PPT;
  const SelectedTemplate = templateMap[template] || WhiteTemplate;

  const handleDownload = () => {
    console.log("Download PPT Data:", pptRef.current);
    alert("PPT data logged to console.");
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl">{typedPPT.title}</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={handleDownload}
        >
          Download PPT
        </button>
      </div>
      <SelectedTemplate ppt={typedPPT} />
    </>
  );
}
