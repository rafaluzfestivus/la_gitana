"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
    images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const isVideo = (url: string) => {
        if (!url) return false;
        return url.includes(".mp4") || url.includes("/cdn/shop/videos");
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Main Display */}
            <div className="relative aspect-[3/4] md:aspect-[4/3] w-full overflow-hidden rounded-sm bg-earth-100">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {isVideo(images[currentIndex]) ? (
                            <video
                                src={images[currentIndex]}
                                autoPlay
                                loop
                                muted
                                playsInline
                                // Use the current image if checking specific item, or find a fallback image
                                poster={images.find(img => !isVideo(img))}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Image
                                src={images[currentIndex]}
                                alt="Product view"
                                fill
                                className="object-cover"
                                priority
                            />
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white transition-colors"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {images.map((src, idx) => (
                        <button
                            key={src}
                            onClick={() => setCurrentIndex(idx)}
                            className={cn(
                                "relative flex-shrink-0 w-20 aspect-square rounded-sm overflow-hidden border-2 transition-all",
                                currentIndex === idx ? "border-gold-500 opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                            )}
                        >
                            {isVideo(src) ? (
                                <video
                                    src={src}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Image
                                    src={src}
                                    alt={`Thumbnail ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
