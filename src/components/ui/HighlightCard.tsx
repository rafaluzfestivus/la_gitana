import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HighlightCard() {
    return (
        <div className="relative flex flex-col justify-center items-center h-full min-h-[400px] bg-lead-800/40 border border-white/10 rounded-xl p-8 text-center overflow-hidden group">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-50" />

            <div className="relative z-10 space-y-6">
                <div className="w-16 h-1 bg-gold-500 mx-auto" />

                <h3 className="font-serif text-3xl md:text-4xl text-cream-100 leading-tight">
                    Destaques da<br />Semana
                </h3>

                <p className="text-cream-100/60 text-sm max-w-[200px] mx-auto">
                    Peças exclusivas selecionadas para você.
                </p>

                <Link
                    href="/collections"
                    className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 uppercase tracking-widest text-xs font-bold transition-colors mt-4"
                >
                    Ver Tudo <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
