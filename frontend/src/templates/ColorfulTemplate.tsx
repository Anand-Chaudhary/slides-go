import { TemplateProps } from "@/types/ppt.types";
import Image from "next/image";
import { useState } from "react";

const ColorfulTemplate = ({ ppt }: TemplateProps) => {
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
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400" />

                    {/* Semi-transparent overlay for readability */}
                    <div className="absolute inset-0 bg-white/90" />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col p-10">
                        {/* Title Bar */}
                        <input
                            className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 text-center drop-shadow-lg mb-8 w-full"
                            value={page.title}
                            onChange={(e) => handleChange(pageIdx, "title", e.target.value)}
                        />

                        {/* Content Layout */}
                        <div className="flex flex-1 gap-10">
                            {/* Left: Text */}
                            <div className="flex-1 flex flex-col gap-6">
                                <textarea
                                    className="text-lg font-medium text-gray-800 leading-relaxed w-full mb-2 p-2 rounded"
                                    value={page.description}
                                    onChange={(e) => handleChange(pageIdx, "description", e.target.value)}
                                    rows={3}
                                />
                                <ul className="list-disc text-gray-900 text-base space-y-2 marker:text-purple-600">
                                    {page.points.map((point, idx) => (
                                        <li key={idx}>
                                            <input
                                                className="w-full bg-transparent border-b border-purple-300 text-base p-1"
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
                                        className="rounded-xl shadow-lg object-contain border border-gray-200"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Footer / Slide Number */}
                        <div className="absolute bottom-4 right-6 text-lg font-semibold text-gray-600">
                            Slide {page.pageNo}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ColorfulTemplate;