import type { ReactNode } from "react";
import type { VariantProps } from "tailwind-variants";

import { CircleCheckBig, CircleHelp, Clock2, type LucideIcon } from "@/components/icons";
import { tv } from "@/lib/variants";

const tagStatusVariants = tv({
    slots: {
        root: "inline-flex items-center rounded-full p-1.5 [&_svg]:size-4 [&_svg]:shrink-0",
        label: "px-1.5 text-xs leading-4 font-bold whitespace-nowrap",
    },
    variants: {
        variant: {
            new: { root: "bg-feedback-open/20 text-feedback-open" },
            info: { root: "bg-feedback-progress/20 text-feedback-progress" },
            success: { root: "bg-feedback-done/20 text-feedback-done" },
            danger: { root: "bg-feedback-danger/20 text-feedback-danger" },
        },
        // Shows only the icon on small screens; the label stays available to screen readers
        compactOnMobile: {
            true: { label: "max-md:sr-only" },
        },
    },
});

type TagStatusVariant = NonNullable<VariantProps<typeof tagStatusVariants>["variant"]>;

export const tagStatusIcons: Record<TagStatusVariant, LucideIcon> = {
    new: CircleHelp,
    info: Clock2,
    success: CircleCheckBig,
    danger: CircleHelp,
};

type TagStatusProps = {
    variant: TagStatusVariant;
    compactOnMobile?: boolean;
    children: ReactNode;
};

export function TagStatus({ variant, compactOnMobile, children }: TagStatusProps) {
    const Icon = tagStatusIcons[variant];
    const styles = tagStatusVariants({ variant, compactOnMobile });

    return (
        <span className={styles.root()}>
            <Icon />
            <span className={styles.label()}>{children}</span>
        </span>
    );
}
