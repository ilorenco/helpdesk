import type { ComponentProps } from "react";

import { tv } from "@/lib/variants";

const cardVariants = tv({
    base: "rounded-md border border-gray-500",
});

export function Card({ className, ...props }: ComponentProps<"div">) {
    return <div className={cardVariants({ className })} {...props} />;
}
