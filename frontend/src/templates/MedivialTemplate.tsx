import { TemplateProps } from "@/types/ppt.types";
import Image from "next/image";
import { Swords, Crown } from "lucide-react";
import { useState } from "react";

const MedivialTemplate = ({ ppt }: TemplateProps) => {
  const [pages, setPages] = useState(ppt.pages || []);

  //eslint-disable-next-line
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
    <div className="flex flex-col my-4 items-center gap-10">
      {pages.map((page, pageIdx) => (
        <div
          key={page.pageNo}
          className="relative w-full h-auto rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Background parchment effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300" />
          <div className="absolute inset-0 bg-yellow-50/80" />

          {/* Blurry swords crossing icon from lucide-react */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <Swords size={320} className="text-yellow-700 opacity-30 blur-[10px]" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col p-10">
            {/* Title */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <Crown />
              <input
                className="text-3xl font-extrabold text-center text-yellow-900 drop-shadow-lg font-serif w-full"
                value={page.title}
                onChange={(e) => handleChange(pageIdx, "title", e.target.value)}
              />
              <Crown />
            </div>

            {/* Content Layout */}
            <div className="flex flex-1 gap-10">
              {/* Left: Text */}
              <div className="flex-1 flex flex-col gap-6">
                <textarea
                  className="text-lg font-medium text-yellow-900 leading-relaxed font-serif w-full mb-2 p-2 rounded"
                  value={page.description}
                  onChange={(e) => handleChange(pageIdx, "description", e.target.value)}
                  rows={3}
                />
                <ul className="list-disc text-yellow-900 text-base space-y-2 marker:text-yellow-700 font-serif">
                  {page.points.map((point, idx) => (
                    <li key={idx}>
                      <input
                        className="w-full bg-transparent border-b border-yellow-700 text-base p-1 font-serif"
                        value={point}
                        onChange={(e) => handlePointChange(pageIdx, idx, e.target.value)}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Image */}
              {page.imageUrl && (
                <div className="flex-1 flex items-center justify-center">
                  <Image
                    src={page.imageUrl}
                    alt="Slide Visual"
                    width={380}
                    height={380}
                    className="rounded-xl shadow-lg object-contain border border-yellow-300"
                  />
                </div>
              )}
            </div>

            {/* Footer / Slide Number */}
            <div className="absolute bottom-4 right-6 text-lg font-semibold text-yellow-700 font-serif">
               Slide {page.pageNo} 
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MedivialTemplate;
