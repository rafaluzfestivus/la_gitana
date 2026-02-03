import { defineQuery } from "next-sanity";

export const MODULAR_SESSIONS_QUERY = defineQuery(`*[_type == "modularSession"] | order(_createdAt asc) {
    _id,
    title,
    layout,
    "cards": cards[]{
        _key,
        title,
        subtitle,
        description,
        type,
        "mediaSrc": image.asset->url,
        "videoUrl": videoUrl,
        link,
        buttonText,
        overlay,
        height
    }
}`);
