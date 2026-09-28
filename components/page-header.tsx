import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowLeft } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";

type PageHeaderProps = {
    title: string;
    backHref?: Route;
    // Actions shown next to the title on desktop and below it, full width, on mobile, where they
    // wrap onto another line when their labels don't fit side by side
    children?: ReactNode;
};

export function PageHeader({ title, backHref, children }: PageHeaderProps) {
    return (
        <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-4">
            <div className="flex flex-col gap-1">
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
            {children && (
                <div className="flex flex-wrap gap-2 *:flex-1 lg:*:flex-none">{children}</div>
            )}
        </header>
    );
}
