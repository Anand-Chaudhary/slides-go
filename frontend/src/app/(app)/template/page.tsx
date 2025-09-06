"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import WhiteTemplate from "@/templates/WhiteTemplate";
import DarkTemplate from "@/templates/DarkTemplate";
import ColorfulTemplate from "@/templates/ColorfulTemplate";
import MedivialTemplate from "@/templates/MedivialTemplate";

const templates = [
  { name: "WhiteTemplate", component: WhiteTemplate },
  { name: "DarkTemplate", component: DarkTemplate },
  { name: "ColorfulTemplate", component: ColorfulTemplate },
  { name: "MedivialTemplate", component: MedivialTemplate },
];

const samplePPT = {
  title: "Sample Presentation",
  pages: [
    {
      pageNo: 1,
      title: "Sample Slide",
      description: "This is a sample slide description.",
      points: ["Point 1", "Point 2"],
      imageUrl: "",
    },
  ],
};

export default function TemplatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState(searchParams.get("template") || "WhiteTemplate");

  const SelectedTemplate = templates.find(t => t.name === selected)?.component || WhiteTemplate;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Choose a Template</h1>
      <div className="flex gap-6 mb-8">
        {templates.map(t => (
          <button
            key={t.name}
            className={`px-4 py-2 rounded border ${selected === t.name ? "bg-blue-500 text-white" : "bg-white"}`}
            onClick={() => setSelected(t.name)}
          >
            {t.name.replace("Template", "")}
          </button>
        ))}
      </div>
      <div className="mb-8">
        <SelectedTemplate ppt={samplePPT} />
      </div>
      <button
        className="px-6 py-3 bg-green-600 text-white rounded"
        onClick={() => router.push(`/create?template=${selected}`)}
      >
        Use this template
      </button>
    </div>
  );
}
