import { TagStatus } from "@/components/ui/tag-status";
import type { TicketStatus } from "@/lib/tickets";

const statusTags = {
    open: { variant: "new", label: "Aberto" },
    in_progress: { variant: "info", label: "Em atendimento" },
    closed: { variant: "success", label: "Encerrado" },
} as const satisfies Record<TicketStatus, { variant: string; label: string }>;

type TicketStatusTagProps = {
    status: TicketStatus;
    compactOnMobile?: boolean;
};

export function TicketStatusTag({ status, compactOnMobile }: TicketStatusTagProps) {
    const { variant, label } = statusTags[status];

    return (
        <TagStatus variant={variant} compactOnMobile={compactOnMobile}>
            {label}
        </TagStatus>
    );
}
