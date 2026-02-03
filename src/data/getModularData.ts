import { client } from '@/sanity/lib/client';
import { MODULAR_SESSIONS_QUERY } from '@/sanity/lib/queries';
import { ModularSession, modularConfig } from '@/data/modularConfig';

export async function getModularSessions(): Promise<ModularSession[]> {
    try {
        const data = await client.fetch(MODULAR_SESSIONS_QUERY);

        if (!data || data.length === 0) {
            console.log("No Sanity data found, using local config.");
            return modularConfig;
        }

        // Transform Sanity data to match ModularSession interface
        return data.map((session: any) => ({
            id: session._id,
            layout: session.layout,
            title: session.title,
            cards: session.cards?.map((card: any) => ({
                id: card._key,
                type: card.type,
                title: card.title,
                subtitle: card.subtitle,
                description: card.description,
                mediaSrc: card.type === 'video' ? (card.videoUrl || '') : (card.mediaSrc || ''),
                link: card.link,
                buttonText: card.buttonText,
                overlay: card.overlay,
                height: card.height
            })) || []
        }));
    } catch (error) {
        console.error("Error fetching Sanity data:", error);
        return modularConfig; // Fallback on error
    }
}
