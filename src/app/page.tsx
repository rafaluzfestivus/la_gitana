"use client";

import { BentoHero } from "@/components/ui/BentoHero";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/Skeleton";
import { ArrowRight } from "lucide-react";

import { HighlightCard } from "@/components/ui/HighlightCard";

export default function Home() {
  const { products: heroProducts, loading: heroLoading } = useProducts("destaques");

  const { products: gridProducts, loading: gridLoading } = useProducts("frontpage");

  return (
    <div className="flex flex-col min-h-screen">
      <BentoHero products={heroProducts} loading={heroLoading} />

      {/* Featured Section */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-cream-100 mb-2">Em Alta...</h2>
            <p className="text-cream-100/60">Peças favoritas para o seu dia a dia.</p>
          </div>
          <Button variant="link" className="hidden md:flex">Ver Tudo <ArrowRight className="ml-2 w-4 h-4" /></Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
          {gridLoading
            ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="aspect-[3/4] w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))
            : gridProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))
          }
        </div>

        <div className="mt-12 flex justify-center md:hidden">
          <Button variant="outline">Ver Tudo</Button>
        </div>
      </section>

      {/* Aesthetic Spacer / Marquee or Image */}
      <section className="relative h-[500px] w-full bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("/hero-lux.jpg")' }}>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white p-6 backdrop-blur-sm max-w-2xl mx-4">
            <h2 className="font-serif text-4xl md:text-6xl mb-4 leading-tight drop-shadow-xl">"Cada bolsa, uma história feita para durar"</h2>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
