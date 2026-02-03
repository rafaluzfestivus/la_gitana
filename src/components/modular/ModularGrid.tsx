import { ModularCard } from './ModularCard';
import { ModularSession } from '@/data/modularConfig';

interface ModularGridProps {
    session: ModularSession;
}

export function ModularGrid({ session }: ModularGridProps) {
    const { layout, cards, title } = session;

    // Determine grid columns based on layout
    let gridClasses = "grid gap-4 md:gap-6";

    // Grid Structure Logic
    // We use different grid-cols for different layouts
    // The 'ModularCard' doesn't determine its own width, the GRID does. 

    if (layout === 'full') {
        gridClasses += " grid-cols-1";
    } else if (layout === 'half-sym') {
        gridClasses += " grid-cols-1 md:grid-cols-2";
    } else if (layout === 'half-asym-left') {
        // Left side bigger (approx 60/40 or 2/3 - 1/3)
        gridClasses += " grid-cols-1 md:grid-cols-5";
    } else if (layout === 'half-asym-right') {
        // Right side bigger
        gridClasses += " grid-cols-1 md:grid-cols-5";
    } else if (layout === 'thirds') {
        gridClasses += " grid-cols-1 md:grid-cols-3";
    }

    return (
        <div className="w-full mb-12 last:mb-0">
            {title && (
                <h2 className="font-serif text-3xl md:text-4xl text-cream-100 mb-8 px-4 text-center md:text-left">
                    {title}
                </h2>
            )}

            <div className={gridClasses}>
                {cards.map((card, index) => {
                    // Special handling for asymmetrical layouts to span columns
                    let colSpanClass = "";

                    if (layout === 'half-asym-left') {
                        colSpanClass = index === 0 ? "md:col-span-3" : "md:col-span-2";
                    } else if (layout === 'half-asym-right') {
                        colSpanClass = index === 0 ? "md:col-span-2" : "md:col-span-3";
                    }

                    return (
                        <div key={card.id} className={colSpanClass}>
                            <ModularCard card={card} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
