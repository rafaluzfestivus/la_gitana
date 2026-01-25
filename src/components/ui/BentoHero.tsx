"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/mockData";
import { Skeleton } from "./Skeleton";

interface BentoHeroProps {
    products: Product[];
    loading: boolean;
}

export function BentoHero({ products, loading }: BentoHeroProps) {
    if (loading) {
        return (
            <section className="p-4 md:p-8 pt-4 h-[600px] flex items-center justify-center">
                <Skeleton className="w-full h-full rounded-3xl" />
            </section>
        );
    }

    // Fallbacks if products are missing
    const featured = products[0]; // Large (Left)
    const secondary = products[1]; // Top Right
    const tertiary = products[2]; // Middle Right
    const quaternary = products[3]; // Bottom Right

    return (
        <section className="p-4 md:p-8 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-[800px] md:h-[600px]">

                {/* Hero Block (Large) - Product 1 or Fallback */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="md:col-span-2 md:row-span-3 relative group overflow-hidden rounded-xl border border-white/5 bg-lead-800 shadow-2xl cursor-pointer"
                >
                    {featured ? (
                        <Link href={`/product/${featured.handle}`} className="block h-full w-full">
                            <Image
                                src={featured.image}
                                alt={featured.name}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        </Link>
                    ) : (
                        <div className="w-full h-full relative">
                            <video
                                src="/videos/v1.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/10" />
                        </div>
                    )}
                </motion.div>

                {/* Top Right - Product 2 or Fallback */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-xl border border-white/5 bg-lead-800 shadow-xl"
                >
                    {secondary ? (
                        <Link href={`/product/${secondary.handle}`} className="block h-full w-full">
                            <Image
                                src={secondary.image}
                                alt={secondary.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </Link>
                    ) : (
                        <div className="w-full h-full relative">
                            <video
                                src="/videos/Use_the_uploaded_202601220232_j2wwo.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover opacity-90"
                            />
                        </div>
                    )}
                </motion.div>

                {/* Middle Right - Product 3 or Fallback */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-xl border border-white/5 bg-lead-800 shadow-xl"
                >
                    {tertiary ? (
                        <Link href={`/product/${tertiary.handle}`} className="block h-full w-full">
                            <Image
                                src={tertiary.image}
                                alt={tertiary.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </Link>
                    ) : (
                        <div className="w-full h-full relative">
                            <video
                                src="/videos/v6.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    )}
                </motion.div>

                {/* Bottom Right - Product 4 or Fallback */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="md:col-span-1 md:row-span-2 relative bg-lead-800 group overflow-hidden rounded-xl border border-white/5 shadow-xl"
                >
                    {quaternary ? (
                        <Link href={`/product/${quaternary.handle}`} className="block h-full w-full">
                            <Image
                                src={quaternary.image}
                                alt={quaternary.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </Link>
                    ) : (
                        <div className="w-full h-full relative">
                            <video
                                src="/videos/Use_the_uploaded_202601220233_2d3x6.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    )}
                </motion.div>

            </div>
        </section>
    );
}
