import Link from "next/link";
import { Instagram, Facebook, Twitter, ShoppingBag } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-earth-900 text-cream-100 py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

                    {/* Brand */}
                    <div className="space-y-4 flex flex-col items-center md:items-start">
                        <h3 className="font-serif text-2xl font-bold">La Gitana</h3>
                        <p className="text-cream-100/60 text-sm max-w-xs">
                            Artesanato de luxo para a alma moderna. Inspirado pelo espírito de liberdade e elegância.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="font-serif text-lg mb-4">Informações</h4>
                        <ul className="space-y-2 text-sm text-cream-100/60">
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Quem Somos</Link></li>
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Prazos e Entregas</Link></li>
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Perguntas Frequentes</Link></li>
                        </ul>
                    </div>

                    {/* Socials / Contact */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="font-serif text-lg mb-4">Conecte-se</h4>
                        <div className="text-sm text-cream-100/60 mb-4 space-y-2">
                            <div className="flex gap-2 items-center justify-center md:justify-start">
                                <Instagram className="w-4 h-4" />
                                <span>@Lagitana.bags</span>
                            </div>
                            <div className="flex gap-2 items-center justify-center md:justify-start">
                                <ShoppingBag className="w-4 h-4" />
                                <span>Shopee: Lagitana</span>
                            </div>
                        </div>
                        <p className="text-xs text-cream-100/40 mt-4">© 2026 La Gitana. Todos os direitos reservados.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
