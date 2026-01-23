"use client";

import { Product } from "@/lib/mockData";
import { useCart } from "@/context/CartContext";
import { Button } from "./Button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, ShoppingBag } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
    product: Product;
    index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
    const { addToCart } = useCart();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col overflow-hidden rounded-xl bg-lead-800/40 border border-white/5 shadow-2xl transition-all duration-300 hover:border-white/20 hover:shadow-gold-500/10 hover:-translate-y-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] w-full overflow-hidden cursor-pointer">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-lead-900/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-10">
                    <Button
                        className="flex-1 bg-cream-100/10 backdrop-blur-md border border-white/20 text-cream-100 hover:bg-cream-100 hover:text-lead-900"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                    >
                        <ShoppingBag className="mr-2 h-4 w-4" /> Adicionar
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-12 px-0 text-cream-100 hover:bg-white/10"
                        onClick={(e) => {
                            e.preventDefault();
                            console.log("Quick view", product.id);
                        }}
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                </div>

                {product.isNew && (
                    <span className="absolute top-4 left-4 bg-gold-500/90 backdrop-blur-sm text-lead-900 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm shadow-lg">
                        Novo
                    </span>
                )}
            </Link>

            <div className="p-4 relative z-10 bg-gradient-to-b from-transparent to-lead-900/50">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-serif text-lg text-cream-100 group-hover:text-gold-400 transition-colors">{product.name}</h3>
                        <p className="text-xs text-cream-100/50 uppercase tracking-wider mt-1">{product.category}</p>
                    </div>
                    <span className="font-medium text-cream-100/90">${product.price.toLocaleString()}</span>
                </div>
            </div>
        </motion.div>
    );
}
