import { TemplateProps } from "@/types/ppt.types";
import Image from "next/image";

export default function WhiteTemplate({ ppt }: TemplateProps) {
  return (
    <div>
      {/* Presentation */}
      <div className="flex flex-col items-center my-4 gap-8">
        {ppt.pages?.map((page) => (
          <div
            key={page.pageNo}
            className="relative w-full h-auto bg-white rounded-xl shadow-xl overflow-hidden p-10 flex flex-col"
          >
            {/* Title */}
            <input value={page.title} className="text-4xl font-bold text-center text-gray-900 mb-6" />

            {/* Slide Content */}
            <div className="flex flex-1 gap-8">
              {/* Left side: text */}
              <div className="flex-1 flex flex-col gap-6">
                <p className="text-2xl font-medium text-gray-700 leading-relaxed">
                  {page.description}
                </p>
                <ul className="list-disc list-inside text-gray-800 text-xl space-y-4">
                  {page.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
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
