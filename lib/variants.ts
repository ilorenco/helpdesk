import { createTV, type TWMergeConfig } from "tailwind-variants";

// The class merger only knows Tailwind's default font sizes, so without this it
// reads `text-xxs` as a color and drops it when a `text-{color}` class is present.
const twMergeConfig = {
    extend: {
        theme: {
            text: ["xxs"],
        },
    },
} satisfies TWMergeConfig;

export const tv = createTV({ twMergeConfig });
