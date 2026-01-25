
import { getCollections } from "@/lib/mockData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";

export default async function CollectionsPage() {
    const collections = await getCollections();

    return (
        <div className="flex flex-col min-h-screen bg-lead-900 text-cream-100">
            <Navbar />

            <main className="flex-grow pt-32 pb-16 container mx-auto px-4 md:px-8">
                <h1 className="font-serif text-4xl md:text-5xl mb-4 text-center">Our Collections</h1>
                <div className="w-24 h-1 bg-gold-500 mx-auto mb-12" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {collections.map((collection) => (
                        <Link
                            key={collection.id}
                            href={`/collections/${collection.handle}`}
                            className="group relative h-[400px] overflow-hidden rounded-xl border border-white/5"
                        >
                            {collection.image ? (
                                <Image
                                    src={collection.image}
                                    alt={collection.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-lead-800 flex items-center justify-center">
                                    <span className="text-white/20">No Image</span>
                                </div>
                            )}

                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                            <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center text-center">
                                <h2 className="font-serif text-3xl mb-2">{collection.title}</h2>
                                <p className="text-sm text-cream-100/80 max-w-xs line-clamp-2 text-balance">
                                    {collection.description}
                                </p>
                                <div className="mt-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                    <span className="text-gold-500 uppercase tracking-widest text-xs border-b border-gold-500 pb-1">Explore</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
