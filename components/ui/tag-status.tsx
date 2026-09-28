import type { ReactNode } from "react";
import type { VariantProps } from "tailwind-variants";

import { CircleCheckBig, CircleHelp, Clock2, type LucideIcon } from "@/components/icons";
import { tv } from "@/lib/variants";

const tagStatusVariants = tv({
    slots: {
        root: "inline-flex items-center rounded-full p-1.5 [&_svg]:size-4 [&_svg]:shrink-0",
        icon: "",
        label: "px-1.5 text-xs leading-4 font-bold whitespace-nowrap",
    },
    variants: {
        variant: {
            new: { root: "bg-feedback-open/20 text-feedback-open" },
            info: { root: "bg-feedback-progress/20 text-feedback-progress" },
            success: { root: "bg-feedback-done/20 text-feedback-done" },
            danger: { root: "bg-feedback-danger/20 text-feedback-danger" },
        },
        // The label hidden visually stays available to screen readers
        layout: {
            // Icon and label at every size
            full: {},
            // Only the icon below tablets (md), icon and label from there up
            iconOnMobile: { label: "max-md:sr-only" },
            // Only the icon below tablets (md), only the label from there up
            iconOnMobileLabelFromTablet: { label: "max-md:sr-only", icon: "md:hidden" },
        },
    },
    defaultVariants: {
        layout: "full",
    },
});

type TagStatusVariant = NonNullable<VariantProps<typeof tagStatusVariants>["variant"]>;

export const tagStatusIcons: Record<TagStatusVariant, LucideIcon> = {
    new: CircleHelp,
    info: Clock2,
    success: CircleCheckBig,
    danger: CircleHelp,
};

type TagStatusProps = Omit<VariantProps<typeof tagStatusVariants>, "variant"> & {
    variant: TagStatusVariant;
    // Replaces the variant's default icon
    icon?: LucideIcon;
    children: ReactNode;
};

export function TagStatus({ variant, icon, layout, children }: TagStatusProps) {
    const Icon = icon ?? tagStatusIcons[variant];
    const styles = tagStatusVariants({ variant, layout });

    return (
        <span className={styles.root()}>
            <Icon className={styles.icon()} />
            <span className={styles.label()}>{children}</span>
        </span>
    );
}
