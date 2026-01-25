import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-earth-900 text-cream-100 py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-2xl font-bold">La Gitana</h3>
                        <p className="text-cream-100/60 text-sm max-w-xs">
                            Artesanato de luxo para a alma moderna. Inspirado pelo espírito de liberdade e elegância.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-serif text-lg mb-4">Institucional</h4>
                        <ul className="space-y-2 text-sm text-cream-100/60">
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Quem Somos</Link></li>
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Nossas Lojas</Link></li>
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Trabalhe Conosco</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-serif text-lg mb-4">Ajuda</h4>
                        <ul className="space-y-2 text-sm text-cream-100/60">
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Prazos e Entregas</Link></li>
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Trocas e Devoluções</Link></li>
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Perguntas Frequentes</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter / Contact */}
                    <div>
                        <h4 className="font-serif text-lg mb-4">Fale Conosco</h4>
                        <div className="text-sm text-cream-100/60 mb-4 space-y-1">
                            <p>contato@lagitana.com.br</p>
                            <p>(11) 99999-9999</p>
                            <p>Seg a Sex: 09h às 18h</p>
                        </div>
                        <div className="flex gap-4 mb-4">
                            <Instagram className="w-5 h-5 hover:text-gold-500 cursor-pointer" />
                            <Facebook className="w-5 h-5 hover:text-gold-500 cursor-pointer" />
                            <Twitter className="w-5 h-5 hover:text-gold-500 cursor-pointer" />
                        </div>
                        <p className="text-xs text-cream-100/40">© 2026 La Gitana. Todos os direitos reservados.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
