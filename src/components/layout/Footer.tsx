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
                            Crafting timeless luxury for the modern soul. Inspired by the spirit of freedom and elegance.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-serif text-lg mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-cream-100/60">
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">New Arrivals</Link></li>
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Bags</Link></li>
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Accessories</Link></li>
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Gift Cards</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-serif text-lg mb-4">Help</h4>
                        <ul className="space-y-2 text-sm text-cream-100/60">
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">FAQ</Link></li>
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Care Instructions</Link></li>
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-serif text-lg mb-4">Stay Connected</h4>
                        <div className="flex gap-4 mb-4">
                            <Instagram className="w-5 h-5 hover:text-gold-500 cursor-pointer" />
                            <Facebook className="w-5 h-5 hover:text-gold-500 cursor-pointer" />
                            <Twitter className="w-5 h-5 hover:text-gold-500 cursor-pointer" />
                        </div>
                        <p className="text-xs text-cream-100/40">© 2026 La Gitana. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
