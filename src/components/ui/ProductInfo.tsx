"use client";

import { Product } from "@/lib/mockData";
import { useCart } from "@/context/CartContext";
import { Button } from "./Button";
import { ShoppingBag, Truck, ShieldCheck, Heart } from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
    product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState("One Size");

    return (
        <div className="flex flex-col gap-8 md:sticky md:top-24">
            <div>
                <p className="text-earth-900/60 uppercase tracking-widest text-sm mb-2">{product.category}</p>
                <h1 className="font-serif text-4xl md:text-5xl text-earth-900 mb-4">{product.name}</h1>
                <p className="text-2xl text-gold-500 font-serif">${product.price.toLocaleString()}</p>
            </div>

            <div className="prose prose-stone text-earth-900/80">
                <p>{product.description}</p>
            </div>

            <div className="space-y-6 pt-6 border-t border-earth-900/10">
                {/* Size Selector (Mock) */}
                <div className="space-y-3">
                    <span className="text-sm font-medium text-earth-900 uppercase tracking-wide">Size</span>
                    <div className="flex gap-2">
                        {["One Size"].map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-4 py-2 border text-sm transition-colors ${selectedSize === size
                                        ? "border-earth-900 bg-earth-900 text-cream-100"
                                        : "border-earth-900/20 text-earth-900 hover:border-earth-900"
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button
                        size="lg"
                        className="flex-1 text-lg py-6"
                        onClick={() => addToCart(product)}
                    >
                        <ShoppingBag className="mr-2 w-5 h-5" /> Add to Cart
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="px-4 py-6 text-earth-900 border-earth-900/20 hover:bg-earth-900/5"
                    >
                        <Heart className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-earth-900/60 pt-4">
                <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    <span>Free Shipping Worldwide</span>
                </div>
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>2 Year Warranty</span>
                </div>
            </div>
        </div>
    );
}
