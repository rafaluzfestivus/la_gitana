"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "./Button";

export function BentoHero() {
    return (
        <section className="p-4 md:p-8 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-[auto] md:h-[800px]">

                {/* Hero Block (Large) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl border border-white/5 bg-lead-800 shadow-2xl"
                >
                    <video
                        src="/videos/v1.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-6 left-6 text-cream-100">
                        <h2 className="font-serif text-3xl md:text-5xl mb-2">The New Classic</h2>
                        <Button variant="outline" className="border-cream-100 text-cream-100 hover:bg-cream-100 hover:text-lead-900">
                            Explore Collection
                        </Button>
                    </div>
                </motion.div>

                {/* Top Right Block (Collection) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="md:col-span-2 relative group overflow-hidden rounded-xl border border-white/5 bg-lead-800 shadow-xl"
                >
                    <video
                        src="/videos/Use_the_uploaded_202601220232_j2wwo.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-earth-900/30">
                        <h3 className="font-serif text-2xl text-white mb-2">Spring 2026</h3>
                        <p className="text-white/90 text-sm max-w-xs mb-4">Earthy tones and natural textures.</p>
                        <Link href="#" className="flex items-center gap-2 text-white hover:underline underline-offset-4">
                            View Lookbook <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>

                {/* Middle Right (Best Seller) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-xl border border-white/5 bg-lead-800 shadow-xl"
                >
                    <video
                        src="/videos/v6.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-lead-900/80 to-transparent">
                        <p className="text-white text-sm uppercase tracking-widest">Best Seller</p>
                        <h4 className="text-white font-serif text-lg">Velvet Clutch</h4>
                    </div>
                </motion.div>

                {/* Bottom Left (Story / Video Placeholder) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="md:col-span-1 relative bg-lead-800 group overflow-hidden rounded-xl border border-white/5 flex items-center justify-center p-6 text-center shadow-xl"
                >
                    <video
                        src="/videos/v7.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
                        <span className="block text-gold-500 text-4xl mb-2">Since 1980</span>
                        <p className="text-cream-100/90 text-sm drop-shadow-md">Handcrafting legacy in every stitch.</p>
                    </div>
                </motion.div>

                {/* Bottom Center (Product Highlight) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="md:col-span-2 relative group overflow-hidden rounded-xl border border-white/5 bg-lead-800 shadow-xl"
                >
                    <video
                        src="/videos/Use_the_uploaded_202601220233_2d3x6.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-6 right-6">
                        <Button className="bg-white text-lead-900 hover:bg-lead-900 hover:text-cream-100">
                            Travel Series
                        </Button>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
