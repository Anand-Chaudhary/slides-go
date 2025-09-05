import { TemplateProps } from "@/types/ppt.types";
import Image from "next/image";

const ColorfulTemplate = ({ppt}: TemplateProps) => {
    return (
        <div className="flex flex-col my-4 items-center gap-10">
            {ppt.pages?.map((page) => (
                <div
                    key={page.pageNo}
                    className="relative w-full aspect-[16/9] rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400" />

                    {/* Semi-transparent overlay for readability */}
                    <div className="absolute inset-0 bg-white/90" />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col p-10">
                        {/* Title Bar */}
                        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 text-center drop-shadow-lg mb-8">
                            {page.title}
                        </h1>

                        {/* Content Layout */}
                        <div className="flex flex-1 gap-10">
                            {/* Left: Text */}
                            <div className="flex-1 flex flex-col gap-6">
                                <p className="text-2xl font-medium text-gray-800 leading-relaxed">
                                    {page.description}
                                </p>
                                <ul className="list-disc list-inside text-gray-900 text-xl space-y-4 marker:text-purple-600">
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
    )
}

export default ColorfulTemplate