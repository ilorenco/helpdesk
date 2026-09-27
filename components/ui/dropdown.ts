import { tv } from "@/lib/variants";

// Distance between a dropdown and its trigger or anchor
export const dropdownOffset = 8;

export const dropdownVariants = tv({
    slots: {
        popup: "flex flex-col gap-4 rounded-md border border-gray-600 bg-gray-100 px-5 py-4 text-gray-500 shadow-md outline-hidden",
        heading: "text-xxs text-gray-400 uppercase",
        // Mobile dropdowns span the header, minus 8px on each side
        mobilePositioner: "w-[calc(var(--anchor-width)-16px)]",
    },
});
