
import { getProduct } from "@/lib/mockData";
import { ProductGallery } from "@/components/ui/ProductGallery";
import { ProductInfo } from "@/components/ui/ProductInfo";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        return {
            title: "Product Not Found | La Gitana",
        };
    }

    return {
        title: `${product.name} | La Gitana`,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: [product.image],
        },
    };
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
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
