
import { getCollectionProducts } from "@/lib/mockData";
import { ProductCard } from "@/components/ui/ProductCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params;
    const products = await getCollectionProducts(handle);

    // Capitalize handle for title
    const title = handle.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

    return (
        <div className="flex flex-col min-h-screen bg-lead-900 text-cream-100">
            <Navbar />

            <main className="flex-grow pt-32 pb-16 container mx-auto px-4 md:px-8">
                <h1 className="font-serif text-4xl md:text-5xl mb-4 text-center">{title}</h1>
                <div className="w-24 h-1 bg-gold-500 mx-auto mb-12" />

                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-cream-100/60">No products found in this collection.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
                        {products.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
