"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/mockData";
import { Skeleton } from "./Skeleton";
import { HighlightCard } from "./HighlightCard";

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
    // Secondary slot is taken by HighlightCard
    const tertiary = products[1]; // Middle Right
    const quaternary = products[2]; // Bottom Right

    return (
        <section className="p-4 md:p-8 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-[800px] md:h-[600px]">

                {/* Hero Block (Large) - Product 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="md:col-span-2 md:row-span-3 relative group overflow-hidden rounded-xl border border-white/5 bg-lead-800 shadow-2xl cursor-pointer"
                >
                    {featured ? (
                        <Link href={`/product/${featured.handle}`} className="block h-full w-full">
                            {featured.images?.[0]?.includes('.mp4') ? (
                                <video
                                    src={featured.images[0]}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                            ) : (
                                <Image
                                    src={featured.image || '/placeholder-bag.jpg'}
                                    alt={featured.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                            )}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                            {/* Text Overlay for Hero */}
                            <div className="absolute bottom-8 left-8 right-8 z-20">
                                <h2 className="font-serif text-3xl text-cream-100 mb-2">{featured.name}</h2>
                                <p className="text-cream-100/80 text-sm line-clamp-2 max-w-md">{featured.description}</p>
                            </div>
                        </Link>
                    ) : (
                        <div className="w-full h-full relative flex items-center justify-center bg-lead-800">
                            <div className="text-center p-6">
                                <h2 className="font-serif text-2xl text-white/20 mb-2">Sem Destaques</h2>
                                <p className="text-white/10 text-sm">Adicione produtos à coleção</p>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Top Right - Highlight Card (Static) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-xl border border-white/5 bg-lead-800 shadow-xl"
                >
                    <HighlightCard />
                </motion.div>

                {/* Middle Right - Product 2 */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-xl border border-white/5 bg-lead-800 shadow-xl"
                >
                    {tertiary ? (
                        <Link href={`/product/${tertiary.handle}`} className="block h-full w-full">
                            {tertiary.images?.[0]?.includes('.mp4') ? (
                                <video
                                    src={tertiary.images[0]}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            ) : (
                                <Image
                                    src={tertiary.image || '/placeholder-bag.jpg'}
                                    alt={tertiary.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            )}
                        </Link>
                    ) : (
                        <div className="w-full h-full relative bg-lead-800" />
                    )}
                </motion.div>

                {/* Bottom Right - Product 3 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="md:col-span-1 md:row-span-2 relative bg-lead-800 group overflow-hidden rounded-xl border border-white/5 shadow-xl"
                >
                    {quaternary ? (
                        <Link href={`/product/${quaternary.handle}`} className="block h-full w-full">
                            {quaternary.images?.[0]?.includes('.mp4') ? (
                                <video
                                    src={quaternary.images[0]}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            ) : (
                                <Image
                                    src={quaternary.image || '/placeholder-bag.jpg'}
                                    alt={quaternary.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            )}
                        </Link>
                    ) : (
                        <div className="w-full h-full relative bg-lead-800" />
                    )}
                </motion.div>

            </div>
        </section>
    );
}
