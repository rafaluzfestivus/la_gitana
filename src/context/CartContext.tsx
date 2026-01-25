"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/lib/mockData";
import { createCart, addToCart, removeFromCart, updateCartLines, getCart } from "@/lib/shopify";
import { Cart, CartLine } from "@/lib/shopifyTypes";

export interface CartItem extends Product {
    quantity: number;
    lineId: string; // Needed for update/remove
}

interface CartContextType {
    cart: Cart | undefined;
    items: CartItem[];
    addToCart: (product: Product) => Promise<void>;
    removeFromCart: (lineId: string) => Promise<void>;
    updateQuantity: (lineId: string, quantity: number) => Promise<void>;
    clearCart: () => void;
    isCartOpen: boolean;
    toggleCart: () => void;
    cartTotal: number;
    cartCount: number;
    checkoutUrl: string | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Cart | undefined>(undefined);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Initialize cart from localStorage
    useEffect(() => {
        const initializeCart = async () => {
            const cartId = localStorage.getItem("shopifyCartId");
            if (cartId) {
                const existingCart = await getCart(cartId);
                if (existingCart) {
                    setCart(existingCart);
                } else {
                    localStorage.removeItem("shopifyCartId");
                }
            }
        };
        initializeCart();
    }, []);

    const mapCartLinesToItems = (lines: CartLine[]): CartItem[] => {
        return lines.map((line) => {
            // Safe checks for potentially missing data
            const product = line.merchandise?.product;
            const price = parseFloat(line.cost?.totalAmount?.amount || "0") / line.quantity;

            return {
                id: line.merchandise.id, // Variant ID
                lineId: line.id,
                handle: product?.handle || "",
                name: product?.title || line.merchandise.title,
                price: price,
                description: "", // Not available in Line
                category: "", // Not available in Line
                image: product?.featuredImage?.url || "",
                images: [],
                variants: [],
                quantity: line.quantity,
            };
        });
    };

    const items = cart ? mapCartLinesToItems(cart.lines.edges.map((e) => e.node)) : [];
    const cartTotal = parseFloat(cart?.cost?.totalAmount?.amount || "0");
    const cartCount = cart?.totalQuantity || 0;
    const checkoutUrl = cart?.checkoutUrl;

    const handleAddToCart = async (product: Product) => {
        setIsLoading(true);
        try {
            let newCart;
            const cartId = cart?.id;

            const variantId = product.variants?.[0]?.id || product.id;

            if (cartId) {
                newCart = await addToCart(cartId, [{ merchandiseId: variantId, quantity: 1 }]);
            } else {
                newCart = await createCart([{ merchandiseId: variantId, quantity: 1 }]);
                if (newCart?.id) {
                    localStorage.setItem("shopifyCartId", newCart.id);
                }
            }

            if (newCart) {
                setCart(newCart);
                setIsCartOpen(true);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveFromCart = async (lineId: string) => {
        if (!cart?.id) return;
        setIsLoading(true);
        try {
            const newCart = await removeFromCart(cart.id, [lineId]);
            if (newCart) setCart(newCart);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateQuantity = async (lineId: string, quantity: number) => {
        if (!cart?.id) return;
        setIsLoading(true);
        try {
            if (quantity === 0) {
                await handleRemoveFromCart(lineId);
                return;
            }
            const newCart = await updateCartLines(cart.id, [{ id: lineId, quantity }]);
            if (newCart) setCart(newCart);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const clearCart = () => {
        // Typically we would remove all lines, or just forget the cart ID.
        // For now, let's just clear locally and storage
        setCart(undefined);
        localStorage.removeItem("shopifyCartId");
    };

    const toggleCart = () => setIsCartOpen((prev) => !prev);

    return (
        <CartContext.Provider
            value={{
                cart,
                items,
                addToCart: handleAddToCart,
                removeFromCart: handleRemoveFromCart,
                updateQuantity: handleUpdateQuantity,
                clearCart,
                isCartOpen,
                toggleCart,
                cartTotal,
                cartCount,
                checkoutUrl,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}

