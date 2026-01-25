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

    // Ensure we have at least some products, otherwise hide or show placeholder
    if (products.length === 0) return null;

    const featured = products[0];
    const secondary = products[1];
    const tertiary = products[2];
    const quaternary = products[3];
    const fifth = products[4]; // If we want 5 items

    return (
        <section className="p-4 md:p-8 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-[800px] md:h-[600px]">

                {/* Hero Block (Large) - Product 1 */}
                {featured && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:col-span-2 md:row-span-3 relative group overflow-hidden rounded-xl border border-white/5 bg-lead-800 shadow-2xl cursor-pointer"
                    >
                        <Link href={`/product/${featured.handle}`} className="block h-full w-full">
                            {/* Prefer video if available in images array (custom logic) or just image */}
                            <Image
                                src={featured.image}
                                alt={featured.name}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        </Link>
                    </motion.div>
                )}

                {/* Top Right - Product 2 */}
                {secondary && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-xl border border-white/5 bg-lead-800 shadow-xl"
                    >
                        <Link href={`/product/${secondary.handle}`} className="block h-full w-full">
                            <Image
                                src={secondary.image}
                                alt={secondary.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </Link>
                    </motion.div>
                )}

                {/* Middle Right - Product 3 */}
                {tertiary && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-xl border border-white/5 bg-lead-800 shadow-xl"
                    >
                        <Link href={`/product/${tertiary.handle}`} className="block h-full w-full">
                            <Image
                                src={tertiary.image}
                                alt={tertiary.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </Link>
                    </motion.div>
                )}

                {/* Bottom Right - Product 4 */}
                {quaternary && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="md:col-span-1 md:row-span-2 relative bg-lead-800 group overflow-hidden rounded-xl border border-white/5 shadow-xl"
                    >
                        <Link href={`/product/${quaternary.handle}`} className="block h-full w-full">
                            <Image
                                src={quaternary.image}
                                alt={quaternary.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </Link>
                    </motion.div>
                )}

            </div>
        </section>
    );
}
