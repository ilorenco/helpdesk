"use client";

// A client component so useId comes from the client tree: in Server Components the ids restart on
// every request, and a page rendered on navigation could repeat an id its layout already used
import { useId, type ComponentProps } from "react";

import { CircleAlert } from "@/components/icons";
import { tv } from "@/lib/variants";

const inputVariants = tv({
    slots: {
        root: "group/input flex flex-col",
        label: "text-xxs text-gray-300 uppercase transition-colors group-focus-within/input:text-blue-base",
        field: "h-10 border-b border-gray-500 py-2 text-md text-gray-200 caret-blue-base outline-hidden transition-colors placeholder:text-gray-400 focus:border-blue-base",
        helper: "pt-1.5 text-xs text-gray-400 italic",
        error: "flex items-center gap-1 pt-1.5 text-xs text-feedback-danger [&_svg]:size-4 [&_svg]:shrink-0",
    },
    variants: {
        invalid: {
            true: {
                label: "text-feedback-danger group-focus-within/input:text-feedback-danger",
            },
        },
    },
});

type InputProps = ComponentProps<"input"> & {
    label: string;
    helperText?: string;
    error?: string;
};

export function Input({ label, helperText, error, id, className, ...props }: InputProps) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const descriptionId = `${inputId}-description`;
    const isInvalid = Boolean(error);
    const hasDescription = Boolean(error || helperText);
    const styles = inputVariants({ invalid: isInvalid });

    return (
        <div className={styles.root({ className })}>
            <label htmlFor={inputId} className={styles.label()}>
                {label}
            </label>
            <input
                {...props}
                id={inputId}
                aria-invalid={isInvalid}
                aria-describedby={hasDescription ? descriptionId : undefined}
                className={styles.field()}
            />
            {helperText && !error && (
                <p id={descriptionId} className={styles.helper()}>
                    {helperText}
                </p>
            )}
            {error && (
                <p id={descriptionId} className={styles.error()}>
                    <CircleAlert />
                    {error}
                </p>
            )}
        </div>
    );
}
