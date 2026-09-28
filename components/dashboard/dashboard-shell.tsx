import type { Route } from "next";
import type { ReactNode } from "react";

import { MobileHeader } from "@/components/dashboard/mobile-header";
import { NavLink } from "@/components/dashboard/nav-link";
import { UserMenu, type DashboardUser } from "@/components/dashboard/user-menu";
import { Logo } from "@/components/logo";

export type NavItem = {
    href: Route;
    label: string;
    icon: ReactNode;
};

type DashboardShellProps = {
    role: string;
    navItems: NavItem[];
    user: DashboardUser;
    children: ReactNode;
};

export function DashboardShell({ role, navItems, user, children }: DashboardShellProps) {
    const navLinks = navItems.map((item) => (
        <NavLink key={item.href} href={item.href}>
            {item.icon}
            {item.label}
        </NavLink>
    ));

    return (
        <div className="flex flex-1 flex-col bg-gray-100 lg:flex-row">
            <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-50 lg:shrink-0 lg:flex-col lg:pt-3">
                <div className="border-b border-gray-200 px-5 py-6">
                    <Logo variant="light" subtitle={role} />
                </div>
                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5">
                    {navLinks}
                </nav>
                <UserMenu user={user} />
            </aside>
            <MobileHeader role={role} user={user}>
                {navLinks}
            </MobileHeader>
            <main className="flex flex-1 flex-col gap-4 rounded-t-lg bg-gray-600 px-6 pt-7 pb-6 lg:mt-3 lg:gap-6 lg:rounded-tr-none lg:px-12 lg:pt-13 lg:pb-12">
                {children}
            </main>
        </div>
    );
}
