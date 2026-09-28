"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { tv } from "@/lib/variants";

const navLinkVariants = tv({
    base: "flex h-11 shrink-0 items-center gap-3 rounded-sm p-3 text-sm transition-colors [&_svg]:size-5 [&_svg]:shrink-0",
    variants: {
        active: {
            true: "bg-blue-dark text-gray-600",
            false: "text-gray-400 hover:bg-gray-200 hover:text-gray-500",
        },
    },
});

type NavLinkProps = {
    href: Route;
    children: ReactNode;
};

export function NavLink({ href, children }: NavLinkProps) {
    const pathname = usePathname();
    const isCurrentPage = pathname === href;
    const isInSection = pathname.startsWith(`${href}/`);
    const isActive = isCurrentPage || isInSection;

    return (
        <Link
            href={href}
            aria-current={isCurrentPage ? "page" : isInSection ? "true" : undefined}
            className={navLinkVariants({ active: isActive })}
        >
            {children}
        </Link>
    );
}
