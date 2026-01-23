import { cn } from "@/lib/utils";

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-sm bg-earth-900/10", className)}
            {...props}
        />
    );
}

export { Skeleton };
