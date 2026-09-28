import type { ComponentProps } from "react";
import type { VariantProps } from "tailwind-variants";

import { tv } from "@/lib/variants";

export const buttonVariants = tv({
    base: "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-sm font-bold whitespace-nowrap transition-colors [&_svg]:shrink-0",
    variants: {
        variant: {
            primary: "bg-gray-200 text-gray-600 hover:bg-gray-100",
            secondary: "bg-gray-500 text-gray-200 hover:bg-gray-400 hover:text-gray-100",
            link: "text-gray-300 hover:bg-gray-500 hover:text-gray-100",
        },
        size: {
            md: "text-sm [&_svg]:size-4.5",
            sm: "text-xs [&_svg]:size-3.5",
        },
        iconOnly: {
            true: "aspect-square",
            // Icon only on mobile: wrap the label in a <span>, which stays available to screen
            // readers, and it shows next to the icon from tablets up
            mobile: "max-md:aspect-square max-md:px-0 max-md:[&>span]:sr-only",
        },
    },
    compoundVariants: [
        { variant: ["primary", "secondary"], size: "md", class: "h-10 px-4" },
        { variant: ["primary", "secondary"], size: "sm", class: "h-7 px-2" },
        { variant: "link", size: "md", class: "h-6 px-0.5" },
        { variant: "link", size: "sm", class: "h-5 px-0.5" },
        { iconOnly: true, class: "px-0" },
    ],
    defaultVariants: {
        variant: "primary",
        size: "md",
    },
});

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function Button({
    variant,
    size,
    iconOnly,
    className,
    type = "button",
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            className={buttonVariants({ variant, size, iconOnly, className })}
            {...props}
        />
    );
}
