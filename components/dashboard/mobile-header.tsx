"use client";

import { Popover } from "@base-ui/react/popover";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";

import { MobileUserMenu, type DashboardUser } from "@/components/dashboard/user-menu";
import { Menu, X } from "@/components/icons";
import { Logo } from "@/components/logo";
import { dropdownOffset, dropdownVariants } from "@/components/ui/dropdown";

const dropdown = dropdownVariants();

type MobileHeaderProps = {
    role: string;
    user: DashboardUser;
    children: ReactNode;
};

export function MobileHeader({ role, user, children }: MobileHeaderProps) {
    const headerRef = useRef<HTMLElement>(null);
    const [isNavOpen, setIsNavOpen] = useState(false);

    // The layout stays mounted across navigations, so close the menu once a link is chosen
    function closeOnLinkClick(event: MouseEvent<HTMLElement>) {
        if (event.target instanceof Element && event.target.closest("a")) {
            setIsNavOpen(false);
        }
    }

    return (
        <header ref={headerRef} className="flex items-center justify-between p-6 lg:hidden">
            <div className="flex items-center gap-4">
                <Popover.Root open={isNavOpen} onOpenChange={setIsNavOpen}>
                    <Popover.Trigger
                        aria-label="Menu"
                        className="flex size-10 cursor-pointer items-center justify-center rounded-sm bg-gray-200 text-gray-600 [&_svg]:size-5"
                    >
                        {isNavOpen ? <X /> : <Menu />}
                    </Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Positioner
                            anchor={headerRef}
                            sideOffset={dropdownOffset}
                            className={dropdown.mobilePositioner()}
                        >
                            <Popover.Popup className={dropdown.popup()}>
                                <Popover.Title className={dropdown.heading()}>Menu</Popover.Title>
                                <nav onClick={closeOnLinkClick} className="flex flex-col gap-1">
                                    {children}
                                </nav>
                            </Popover.Popup>
                        </Popover.Positioner>
                    </Popover.Portal>
                </Popover.Root>
                <Logo variant="light" subtitle={role} />
            </div>
            <MobileUserMenu user={user} anchor={headerRef} />
        </header>
    );
}
