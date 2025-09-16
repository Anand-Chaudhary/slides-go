"use client";

import { useEffect, useRef, useState } from "react";
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
  const { ppt, loading, error, getPPT, downloadPPT } = useGetPPTStore();
  const [downloading, setDownloading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
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

  const handleDownload = async () => {
    setDownloading(true);
    setDownloadUrl(null);
    try {
      const res = await downloadPPT(pptRef.current!);
      if (res && res?.url) {
        setDownloadUrl(res.url);
      }
      //eslint-disable-next-line
    } catch (e: any) {
      console.log("Error: ", e);
    }
    setDownloading(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl">{typedPPT.title}</h1>
        {downloadUrl ? (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Click to download
          </a>
        ) : (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-60"
            onClick={handleDownload}
            disabled={downloading}
          >
            {downloading ? 'Downloading...' : 'Start Download'}
          </button>
        )}
      </div>
      <SelectedTemplate ppt={typedPPT} />
    </>
  );
}
