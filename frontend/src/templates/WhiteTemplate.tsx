import { TemplateProps } from "@/types/ppt.types";
import Image from "next/image";
import { useState } from "react";

export default function WhiteTemplate({ ppt }: TemplateProps) {
  const [pages, setPages] = useState(ppt.pages || []);

  const handleChange = (pageIdx: number, field: string, value: any) => {
    setPages((prev) =>
      prev.map((p, idx) =>
        idx === pageIdx ? { ...p, [field]: value } : p
      )
    );
  };

  const handlePointChange = (pageIdx: number, pointIdx: number, value: string) => {
    setPages((prev) =>
      prev.map((p, idx) =>
        idx === pageIdx
          ? { ...p, points: p.points.map((pt, i) => (i === pointIdx ? value : pt)) }
          : p
      )
    );
  };

  return (
    <div>
      {/* Presentation */}
      <div className="flex flex-col items-center my-4 gap-8">
        {pages.map((page, pageIdx) => (
          <div
            key={page.pageNo}
            className="relative w-full h-auto bg-white rounded-xl shadow-xl overflow-hidden p-10 flex flex-col"
          >
            {/* Title */}
            <input
              value={page.title}
              className="text-2xl font-bold text-center text-gray-900 mb-6 w-full"
              onChange={(e) => handleChange(pageIdx, "title", e.target.value)}
            />

            {/* Slide Content */}
            <div className="flex flex-1 gap-8">
              {/* Left side: text */}
              <div className="flex-1 flex flex-col gap-6">
                <textarea
                  className="text-lg font-medium text-gray-700 leading-relaxed w-full mb-2 p-2 rounded"
                  value={page.description}
                  onChange={(e) => handleChange(pageIdx, "description", e.target.value)}
                  rows={3}
                />
                <ul className="list-disc text-gray-800 text-base space-y-2">
                  {page.points.map((point, idx) => (
                    <li key={idx}>
                      <input
                        className="w-full bg-transparent border-b border-gray-300 text-base p-1"
                        value={point}
                        onChange={(e) => handlePointChange(pageIdx, idx, e.target.value)}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right side: image */}
              {page.imageUrl && (
                <div className="flex-1 flex items-center justify-center">
                  <Image
                    src={page.imageUrl}
                    alt="Slide Image"
                    width={350}
                    height={350}
                    className="rounded-lg object-contain"
                    draggable={false}
                  />
                </div>
              )}
            </div>

            {/* Slide number */}
            <div className="absolute bottom-3 right-5 text-lg text-gray-500">
              {page.pageNo}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
