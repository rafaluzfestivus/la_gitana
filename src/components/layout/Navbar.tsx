"use client";

import Link from "next/link";
import { ShoppingBag, Search, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Navbar() {
    const { toggleCart, cartCount } = useCart();
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
                isScrolled
                    ? "bg-lead-900/95 backdrop-blur-md border-b border-white/5 shadow-lg"
                    : "bg-gradient-to-b from-black/80 to-transparent"
            )}
        >
            <div className="container mx-auto px-4 md:px-8 h-24 flex items-center justify-between">
                {/* Mobile Menu */}
                <button className="md:hidden text-cream-100">
                    <Menu className="h-6 w-6" />
                </button>

                {/* Logo */}
                <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:flex-1">
                    <div className="relative w-28 h-14 md:w-36 md:h-18">
                        <Image
                            src="/logo.png"
                            alt="La Gitana Logo"
                            fill
                            className="object-contain brightness-0 invert"
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6 items-center justify-center flex-[2]">
                    {[
                        { label: "Bolsa crossbody", href: "/collections/bolsa-crossbody" },
                        { label: "Bolsa de mão", href: "/collections/bolsa-de-mao" },
                        { label: "Bolsas multimarcas", href: "/collections/bolsas-multimarcas" },
                        { label: "Acessórios", href: "/collections/acessorios" },
                        { label: "Todos os produtos", href: "/collections" }
                    ].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-xs uppercase tracking-widest text-cream-100/80 hover:text-gold-500 underline-offset-4 transition-colors whitespace-nowrap"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Icons */}
                <div className="flex-1 flex justify-end gap-4 md:gap-6 items-center">
                    <button className="text-cream-100 hover:text-gold-500 transition-colors">
                        <Search className="h-5 w-5" />
                    </button>
                    <button
                        onClick={toggleCart}
                        className="relative text-cream-100 hover:text-gold-500 transition-colors"
                    >
                        <ShoppingBag className="h-5 w-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-gold-500 text-earth-900 text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </motion.header>
    );
}
