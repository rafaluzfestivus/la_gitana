import { ReactNode } from 'react';

export type ModularLayout = 'full' | 'half-sym' | 'half-asym-left' | 'half-asym-right' | 'thirds';

export type ModularCardType = 'image' | 'video' | 'text' | 'banner';

export interface ModularCardConfig {
    id: string;
    type: ModularCardType;
    title?: string;
    subtitle?: string;
    description?: string;
    mediaSrc: string; // URL for image or video
    link?: string;
    buttonText?: string;
    overlay?: boolean; // If true, puts text over image
    height?: 'small' | 'medium' | 'large' | 'xl' | 'screen'; // Presets: small (~250px), medium (~400px), large (~600px), xl (~800px), screen (100vh)
}

export interface ModularSession {
    id: string;
    layout: ModularLayout;
    title?: string; // Optional session title
    cards: ModularCardConfig[];
}

export const modularConfig: ModularSession[] = [
    {
        id: 'session-1',
        layout: 'full',
        cards: [
            {
                id: 'card-1',
                type: 'banner',
                title: 'Nova Coleção de Verão',
                subtitle: 'Elegância e Leveza',
                description: 'Descubra as peças que vão transformar o seu visual nesta estação.',
                mediaSrc: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop',
                link: '/collections/verao',
                buttonText: 'Explorar Coleção',
                overlay: true,
                height: 'large',
            },
        ],
    },
    {
        id: 'session-2',
        layout: 'half-sym',
        cards: [
            {
                id: 'card-2',
                type: 'image',
                title: 'Bolsas de Couro',
                mediaSrc: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1957&auto=format&fit=crop',
                link: '/collections/couro',
                buttonText: 'Ver Detalhes',
                overlay: true,
                height: 'medium',
            },
            {
                id: 'card-3',
                type: 'image',
                title: 'Acessórios Exclusivos',
                mediaSrc: 'https://images.unsplash.com/photo-1605763240004-7e93b172d754?q=80&w=1887&auto=format&fit=crop',
                link: '/collections/acessorios',
                buttonText: 'Comprar Agora',
                overlay: true,
                height: 'medium',
            },
        ],
    },
    {
        id: 'session-3',
        layout: 'thirds',
        title: 'Destaques da Semana',
        cards: [
            {
                id: 'card-4',
                type: 'text',
                title: 'Envio Rápido',
                description: 'Receba seus produtos em tempo recorde com nossa logística premium.',
                mediaSrc: '',
                height: 'small',
            },
            {
                id: 'card-5',
                type: 'image',
                mediaSrc: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop',
                link: '/product/destaque',
                height: 'small',
                overlay: false,
            },
            {
                id: 'card-6',
                type: 'text',
                title: 'Garantia de Qualidade',
                description: 'Todos os produtos passam por um rigoroso controle de qualidade.',
                mediaSrc: '',
                height: 'small',
            },
        ],
    },
];
