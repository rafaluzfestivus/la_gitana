import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-earth-900 text-cream-100 hover:bg-earth-800": variant === "primary",
                        "bg-gold-500 text-earth-900 hover:bg-gold-400": variant === "secondary",
                        "border border-earth-900 text-earth-900 hover:bg-earth-900 hover:text-cream-100": variant === "outline",
                        "bg-transparent text-earth-900 hover:bg-earth-900/10": variant === "ghost",
                        "text-earth-900 underline-offset-4 hover:underline": variant === "link",

                        "h-9 px-4 text-xs tracking-wider uppercase": size === "sm",
                        "h-11 px-8 text-sm tracking-widest uppercase": size === "md",
                        "h-14 px-10 text-base tracking-widest uppercase font-medium": size === "lg",
                    },
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
