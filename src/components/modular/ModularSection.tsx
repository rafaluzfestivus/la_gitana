'use client';

import { useState, useEffect } from 'react';
import { modularConfig, ModularSession } from '@/data/modularConfig';
import { getModularSessions } from '@/data/getModularData';
import { ModularGrid } from './ModularGrid';

export function ModularSection() {
    const [sessions, setSessions] = useState<ModularSession[]>(modularConfig);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getModularSessions();
                // If data is returned (even if fallback), update state. 
                // Note: getModularSessions returns modularConfig if Sanity is empty/error.
                // Ideally we'd only update if it's different, but for now this is fine.
                if (data) {
                    setSessions(data);
                }
            } catch (error) {
                console.error("Failed to load sanity data", error);
            }
        }
        loadData();
    }, []);

    if (!sessions || sessions.length === 0) return null;

    return (
        <section className="py-16 md:py-24 container mx-auto px-4 md:px-8">
            {sessions.map((session) => (
                <ModularGrid key={session.id} session={session} />
            ))}
        </section>
    );
}
