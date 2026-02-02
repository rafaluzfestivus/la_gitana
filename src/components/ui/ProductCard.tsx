"use client";

import { Product } from "@/lib/mockData";
import { useCart } from "@/context/CartContext";
import { Button } from "./Button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { VideoPlayer } from "./VideoPlayer";

interface ProductCardProps {
    product: Product;
    index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
    const { addToCart } = useCart();
    const [isHovered, setIsHovered] = useState(false);

    // Check for video in images array (assuming first item usually, or checking extension)
    // We check for common video extensions and Shopify CDN video patterns
    const mediaSource = product.images[0] || product.image;

    // Enhanced video detection
    // We check for common video extensions and Shopify CDN video patterns
    const isVideo = mediaSource && (
        mediaSource.includes('.mp4') ||
        mediaSource.includes('.webm') ||
        mediaSource.includes('.mov') ||
        mediaSource.includes('.m4v') ||
        mediaSource.includes('/cdn/shop/videos')
    );



    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col overflow-hidden rounded-xl bg-lead-800/40 border border-white/5 shadow-2xl transition-all duration-300 hover:border-white/20 hover:shadow-gold-500/10 hover:-translate-y-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/product/${product.handle}`} className="block relative aspect-[3/4] w-full overflow-hidden cursor-pointer">
                {isVideo ? (
                    <VideoPlayer
                        src={mediaSource}
                        poster={product.image}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                ) : (
                    <Image
                        src={mediaSource}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                )}

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-lead-900/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Name as Button at Bottom (mimicking "Adicionar" style but with Name) */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-10 flex flex-col gap-2">
                    <div className="bg-transparent border border-cream-100/30 text-cream-100 text-center py-3 px-4 font-bold text-sm uppercase tracking-wider rounded-sm hover:bg-white hover:text-lead-900 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
                        <ShoppingBag className="w-4 h-4" />
                        <span className="truncate">{product.name}</span>
                    </div>
                </div>

                {product.isNew && (
                    <span className="absolute top-4 left-4 bg-gold-500/90 backdrop-blur-sm text-lead-900 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm shadow-lg">
                        Novo
                    </span>
                )}
            </Link>

            {/* Subter-info (Price only now, since Name is main button) */}
            <div className="p-4 relative z-10 bg-gradient-to-b from-transparent to-lead-900/50">
                <div className="flex justify-between items-end">
                    <p className="text-xs text-cream-100/50 uppercase tracking-wider">{product.category}</p>
                    <span className="font-medium text-cream-100/90 tracking-widest">${product.price.toLocaleString()}</span>
                </div>
            </div>
        </motion.div>
    );
}
