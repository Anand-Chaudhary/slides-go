import { TemplateProps } from "@/types/ppt.types";
import Image from "next/image";

const DarkTemplate = ({ppt}: TemplateProps) => {
    return (
        <div className="flex flex-col my-4 items-center gap-10">
            {ppt.pages?.map((page) => (
                <div
                    key={page.pageNo}
                    className="relative w-full aspect-[16/9] rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />

                    {/* Accent Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-transparent to-blue-900/30" />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col p-10">
                        {/* Title */}
                        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-center drop-shadow-lg mb-8">
                            {page.title}
                        </h1>

                        {/* Content Layout */}
                        <div className="flex flex-1 gap-10">
                            {/* Left: Text */}
                            <div className="flex-1 flex flex-col gap-6">
                                <p className="text-2xl font-medium text-gray-300 leading-relaxed">
                                    {page.description}
                                </p>
                                <ul className="list-disc list-inside text-gray-200 text-xl space-y-4 marker:text-cyan-400">
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
                                        className="rounded-xl shadow-lg object-contain border border-gray-700"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Footer / Slide Number */}
                        <div className="absolute bottom-4 right-6 text-lg font-semibold text-gray-400">
                            Slide {page.pageNo}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DarkTemplate