"use client";

import { use, useEffect, useState } from "react";
import { getProduct, Product } from "@/lib/mockData";
import { ProductGallery } from "@/components/ui/ProductGallery";
import { ProductInfo } from "@/components/ui/ProductInfo";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: PageProps) {
    const { id } = use(params);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const found = await getProduct(id);
                setProduct(found || null);
            } catch (error) {
                console.error("Failed to fetch product", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-cream-100 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-earth-900/60 font-serif">Loading masterpiece...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center p-4">
                <h1 className="font-serif text-3xl text-earth-900 mb-4">Product Not Found</h1>
                <Link href="/">
                    <Button>Return Home</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream-100 flex flex-col">
            <main className="flex-1 container mx-auto px-4 md:px-8 py-8 md:py-12">

                {/* Back Button */}
                <Link href="/" className="inline-flex items-center text-earth-900/60 hover:text-earth-900 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collection
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left: Gallery */}
                    <div>
                        <ProductGallery images={product.images || [product.image]} />
                    </div>

                    {/* Right: Info */}
                    <div>
                        <ProductInfo product={product} />
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
