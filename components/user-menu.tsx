import { Menu } from "@base-ui/react/menu";
import type { RefObject } from "react";

import { CircleUser, LogOut } from "@/components/icons";
import { Avatar } from "@/components/ui/avatar";
import { dropdownOffset, dropdownVariants } from "@/components/ui/dropdown";
import { tv } from "@/lib/variants";

export type DashboardUser = {
    name: string;
    email: string;
};

const dropdown = dropdownVariants();

const optionVariants = tv({
    base: "flex h-10 cursor-pointer items-center gap-2 rounded-sm text-md outline-hidden focus-visible:outline-2 focus-visible:outline-blue-base focus-visible:outline-solid [&_svg]:size-5",
    variants: {
        tone: {
            default: "text-gray-500",
            danger: "text-feedback-danger",
        },
    },
});

function UserOptions() {
    return (
        <Menu.Group className="flex flex-col gap-4">
            <Menu.GroupLabel className={dropdown.heading()}>Opções</Menu.GroupLabel>
            <div className="flex flex-col">
                <Menu.Item className={optionVariants({ tone: "default" })}>
                    <CircleUser />
                    Perfil
                </Menu.Item>
                <Menu.Item className={optionVariants({ tone: "danger" })}>
                    <LogOut />
                    Sair
                </Menu.Item>
            </div>
        </Menu.Group>
    );
}

type UserMenuProps = {
    user: DashboardUser;
};

export function UserMenu({ user }: UserMenuProps) {
    return (
        <Menu.Root>
            <Menu.Trigger className="flex cursor-pointer items-center gap-3 border-t border-gray-200 px-4 py-5 text-left transition-colors hover:bg-gray-200 data-popup-open:bg-gray-200">
                <Avatar name={user.name} />
                <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm text-gray-600">{user.name}</span>
                    <span className="truncate text-xs text-gray-400">{user.email}</span>
                </span>
            </Menu.Trigger>
            <Menu.Portal>
                <Menu.Positioner
                    side="right"
                    align="end"
                    sideOffset={dropdownOffset}
                    alignOffset={dropdownOffset}
                >
                    <Menu.Popup className={dropdown.popup({ className: "w-49.5" })}>
                        <UserOptions />
                    </Menu.Popup>
                </Menu.Positioner>
            </Menu.Portal>
        </Menu.Root>
    );
}

type MobileUserMenuProps = UserMenuProps & {
    anchor: RefObject<HTMLElement | null>;
};

export function MobileUserMenu({ user, anchor }: MobileUserMenuProps) {
    return (
        <Menu.Root>
            <Menu.Trigger aria-label="Opções do usuário" className="cursor-pointer rounded-full">
                <Avatar name={user.name} size="lg" />
            </Menu.Trigger>
            <Menu.Portal>
                <Menu.Positioner
                    anchor={anchor}
                    sideOffset={dropdownOffset}
                    className={dropdown.mobilePositioner()}
                >
                    <Menu.Popup className={dropdown.popup()}>
                        <UserOptions />
                    </Menu.Popup>
                </Menu.Positioner>
            </Menu.Portal>
        </Menu.Root>
    );
}
