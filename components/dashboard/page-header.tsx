import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowLeft } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { tv } from "@/lib/variants";

const pageHeaderVariants = tv({
    slots: {
        root: "flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-4",
        actions: "flex flex-wrap gap-2 *:flex-1 lg:*:flex-none",
    },
    variants: {
        // Keeps the actions next to the title on mobile too, for compact buttons like "Novo"
        inlineActions: {
            true: {
                root: "flex-row items-center justify-between lg:items-center",
                actions: "*:flex-none",
            },
        },
    },
});

type PageHeaderProps = {
    title: string;
    backHref?: Route;
    inlineActions?: boolean;
    // Shown next to the title on desktop. On mobile they go below it, full width and wrapping
    // onto another line when they don't fit, unless inlineActions keeps them next to the title
    children?: ReactNode;
};

export function PageHeader({ title, backHref, inlineActions, children }: PageHeaderProps) {
    const styles = pageHeaderVariants({ inlineActions });

    return (
        <header className={styles.root()}>
            {/* At least a button's height (h-10), so pages with and without a header action keep
                their title and content at the same position */}
            <div className="flex min-h-10 flex-col justify-center gap-1">
                {backHref && (
                    <Link
                        href={backHref}
                        className={buttonVariants({
                            variant: "link",
                            size: "sm",
                            className: "self-start",
                        })}
                    >
                        <ArrowLeft />
                        Voltar
                    </Link>
                )}
                <h1 className="text-lg text-blue-dark lg:text-xl">{title}</h1>
            </div>
            {children && <div className={styles.actions()}>{children}</div>}
        </header>
    );
}
