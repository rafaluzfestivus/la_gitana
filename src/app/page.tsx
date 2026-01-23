"use client";

import { BentoHero } from "@/components/ui/BentoHero";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/Skeleton";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { products, loading } = useProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <BentoHero />

      {/* Featured Section */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-cream-100 mb-2">Curated Selection</h2>
            <p className="text-cream-100/60">Handpicked favorites for the discerning collector.</p>
          </div>
          <Button variant="link" className="hidden md:flex">View All <ArrowRight className="ml-2 w-4 h-4" /></Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="aspect-[3/4] w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))
            : products.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))
          }
        </div>

        <div className="mt-12 flex justify-center md:hidden">
          <Button variant="outline">View All Collection</Button>
        </div>
      </section>

      {/* Aesthetic Spacer / Marquee or Image */}
      <section className="relative h-[400px] w-full bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2400&auto=format&fit=crop")' }}>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white p-6 border border-white/30 backdrop-blur-sm max-w-lg mx-4">
            <h2 className="font-serif text-3xl mb-4">"Style is a way to say who you are without having to speak."</h2>
            <p className="uppercase tracking-widest text-sm">- Rachel Zoe</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
