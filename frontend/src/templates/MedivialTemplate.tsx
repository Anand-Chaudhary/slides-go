import { TemplateProps } from "@/types/ppt.types";
import Image from "next/image";
import { Swords, Crown } from "lucide-react";

const MedivialTemplate = ({ ppt }: TemplateProps) => {
  return (
    <div className="flex flex-col my-4 items-center gap-10">
      {ppt.pages?.map((page) => (
        <div
          key={page.pageNo}
          className="relative w-full aspect-[16/9] rounded-2xl shadow-2xl overflow-hidden"
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
            <h1 className="text-5xl flex justify-center items-center gap-4 font-extrabold text-center text-yellow-900 drop-shadow-lg mb-8 font-serif">
             <Crown /> {page.title} <Crown />
            </h1>

            {/* Content Layout */}
            <div className="flex flex-1 gap-10">
              {/* Left: Text */}
              <div className="flex-1 flex flex-col gap-6">
                <p className="text-2xl font-medium text-yellow-900 leading-relaxed font-serif">
                  {page.description}
                </p>
                <ul className="list-disc list-inside text-yellow-900 text-xl space-y-4 marker:text-yellow-700 font-serif">
                  {page.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
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
             ⚜ Slide {page.pageNo} ⚜
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MedivialTemplate;
