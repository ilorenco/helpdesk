import type { ComponentProps } from "react";

import { tv } from "@/lib/variants";

const skeletonVariants = tv({
    base: "rounded-sm bg-gray-500 motion-safe:animate-pulse",
});

// A placeholder shape shown while content loads; the loading UI announces the wait itself
export function Skeleton({ className, ...props }: ComponentProps<"div">) {
    return <div aria-hidden className={skeletonVariants({ className })} {...props} />;
}
