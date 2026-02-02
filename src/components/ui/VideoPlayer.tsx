
import { useRef, useEffect } from "react";

export function VideoPlayer({ src, poster, className }: { src: string; poster?: string; className?: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.defaultMuted = true;
            videoRef.current.muted = true;
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.log("Autoplay prevented:", error);
                });
            }
        }
    }, [src]);

    return (
        <video
            ref={videoRef}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            poster={poster}
            className={className || "w-full h-full object-cover"}
        />
    );
}
