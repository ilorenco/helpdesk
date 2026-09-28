import type { ComponentProps, ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { tv } from "@/lib/variants";

const tableVariants = tv({
    slots: {
        table: "w-full table-fixed text-left",
        body: "[&_tr:last-child]:border-b-0",
        row: "border-b border-gray-500",
        head: "h-12 truncate px-3 text-sm font-bold text-gray-400",
        cell: "h-16 px-3 text-gray-200",
        empty: "text-center text-sm text-gray-400",
    },
});

const styles = tableVariants();

export function Table({ className, ...props }: ComponentProps<"table">) {
    return (
        <Card>
            <table className={styles.table({ className })} {...props} />
        </Card>
    );
}

export function TableHeader(props: ComponentProps<"thead">) {
    return <thead {...props} />;
}

export function TableBody({ className, ...props }: ComponentProps<"tbody">) {
    return <tbody className={styles.body({ className })} {...props} />;
}

export function TableRow({ className, ...props }: ComponentProps<"tr">) {
    return <tr className={styles.row({ className })} {...props} />;
}

export function TableHead({ className, ...props }: ComponentProps<"th">) {
    return <th scope="col" className={styles.head({ className })} {...props} />;
}

export function TableCell({ className, ...props }: ComponentProps<"td">) {
    return <td className={styles.cell({ className })} {...props} />;
}

type TableEmptyRowProps = {
    // Every column of the table, including the ones hidden on small screens
    colSpan: number;
    children: ReactNode;
};

// A single full-width row for when the table has nothing to list
export function TableEmptyRow({ colSpan, children }: TableEmptyRowProps) {
    return (
        <TableRow>
            <TableCell colSpan={colSpan} className={styles.empty()}>
                {children}
            </TableCell>
        </TableRow>
    );
}
