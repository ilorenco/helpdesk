import type { VariantProps } from "tailwind-variants";

import { tv } from "@/lib/variants";

const avatarVariants = tv({
    base: "flex shrink-0 items-center justify-center rounded-full bg-blue-dark text-sm text-gray-600",
    variants: {
        size: {
            sm: "size-5 text-xxs font-normal uppercase",
            md: "size-8",
            lg: "size-10",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

type AvatarProps = VariantProps<typeof avatarVariants> & {
    name: string;
};

// Array.from splits by code point, so names starting with an emoji keep a whole character
function getInitials(name: string) {
    const words = name.trim().split(/\s+/);
    const firstInitial = Array.from(words[0] ?? "")[0] ?? "";
    const lastInitial = words.length > 1 ? Array.from(words[words.length - 1])[0] : "";

    return (firstInitial + lastInitial).toUpperCase();
}

export function Avatar({ name, size }: AvatarProps) {
    return (
        <span aria-hidden className={avatarVariants({ size })}>
            {getInitials(name)}
        </span>
    );
}
