import Link from 'next/link';
import { ModularCardConfig } from '@/data/modularConfig';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface ModularCardProps {
    card: ModularCardConfig;
    className?: string; // Allow passing extra classes for grid positioning if needed
}

export function ModularCard({ card, className }: ModularCardProps) {
    const { type, title, subtitle, description, mediaSrc, link, buttonText, overlay, height } = card;

    // Map accessible height names to Tailwind classes
    const heightClass = {
        'small': 'h-64 md:h-80',       // ~320px
        'medium': 'h-96 md:h-[500px]', // ~500px
        'large': 'h-[500px] md:h-[700px]', // ~700px
        'xl': 'h-[600px] md:h-[800px]',   // ~800px
        'screen': 'h-[80vh] md:h-screen', // Fullscreenish
    }[height || 'medium']; // Default to medium

    const content = (
        <div className={cn(
            "relative w-full overflow-hidden group transition-all duration-500 rounded-2xl",
            heightClass,
            className,
            type === 'text' ? "bg-zinc-900 border border-white/10 p-8 flex flex-col justify-center items-start" : "bg-zinc-800"
        )}>
            {/* Media Background (Image/Video) */}
            {(type === 'image' || type === 'banner') && mediaSrc && (
                <img
                    src={mediaSrc}
                    alt={title || 'Card Image'}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            )}

            {type === 'video' && mediaSrc && (
                <video
                    src={mediaSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}

            {/* Overlay: Darkens the background if enabled */}
            {overlay && (type !== 'text') && (
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
            )}

            {/* Content Layer */}
            <div className={cn(
                "relative z-10 flex flex-col items-start h-full",
                type === 'banner' ? "justify-end p-8 md:p-12 text-center items-center w-full" :
                    type === 'text' ? "justify-center" :
                        "justify-end p-6"
            )}>
                {subtitle && (
                    <span className="text-yellow-500 text-sm font-medium tracking-widest uppercase mb-2">
                        {subtitle}
                    </span>
                )}

                {title && (
                    <h3 className={cn(
                        "font-serif text-white mb-2",
                        type === 'banner' ? "text-4xl md:text-5xl" : "text-2xl"
                    )}>
                        {title}
                    </h3>
                )}

                {description && (
                    <p className={cn(
                        "text-gray-300 max-w-xl",
                        type === 'banner' ? "text-lg mb-6" : "text-sm mb-4"
                    )}>
                        {description}
                    </p>
                )}

                {buttonText && (
                    <div className={cn("mt-4", type === 'banner' ? "md:mt-6" : "")}>
                        {/* Using a span that looks like a button if it's inside a Link, or a button if valid */}
                        <Button variant={type === 'banner' ? 'primary' : 'outline'} className="min-w-[140px]">
                            {buttonText}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );

    if (link) {
        return (
            <Link href={link} className="block w-full h-full">
                {content}
            </Link>
        );
    }

    return content;
}
