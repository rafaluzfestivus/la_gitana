"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/Button";

export function CartDrawer() {
    const { isCartOpen, toggleCart, items, removeFromCart, updateQuantity, cartTotal } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-earth-900/20 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-cream-100 z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-earth-900/10 flex justify-between items-center">
                            <h2 className="font-serif text-xl text-earth-900">Shopping Bag ({items.length})</h2>
                            <button onClick={toggleCart} className="text-earth-900 hover:rotate-90 transition-transform">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-earth-900/50">
                                    <ShoppingBag className="h-12 w-12 mb-4 opacity-20" />
                                    <p className="uppercase tracking-widest text-sm">Your bag is empty</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-20 h-24 bg-earth-100 flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-serif text-earth-900">{item.name}</h3>
                                                    <button onClick={() => removeFromCart(item.lineId)} className="text-earth-900/40 hover:text-red-500">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <p className="text-xs text-earth-900/60 uppercase">{item.category}</p>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div className="flex items-center border border-earth-900/10 text-earth-900">
                                                    <button
                                                        onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                                                        className="p-1 hover:bg-earth-900/5"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                                                        className="p-1 hover:bg-earth-900/5"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                                <span className="font-medium text-earth-900">${(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-earth-900/10 bg-cream-200">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm uppercase tracking-widest text-earth-900/60">Subtotal</span>
                                    <span className="font-serif text-xl text-earth-900">${cartTotal.toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-earth-900/50 mb-6 text-center">Shipping and taxes calculated at checkout.</p>
                                <Button
                                    className="w-full"
                                    size="lg"
                                    disabled={!useCart().checkoutUrl}
                                    onClick={() => {
                                        const url = useCart().checkoutUrl;
                                        console.log("Checkout URL:", url);
                                        if (url) window.location.href = url;
                                        else alert("Checkout URL missing");
                                    }}
                                >
                                    {useCart().checkoutUrl ? 'Checkout' : 'Loading...'}
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
