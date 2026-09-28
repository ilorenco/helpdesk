import type { LucideIcon } from "@/components/icons";
import { TagStatus, tagStatusIcons } from "@/components/ui/tag-status";
import { ticketStatusLabels, type TicketStatus } from "@/lib/tickets";

const tagVariants = {
    open: "new",
    in_progress: "info",
    closed: "success",
} as const satisfies Record<TicketStatus, string>;

// The icon each status shows in its tag, so other controls for a status can reuse it
export function getTicketStatusIcon(status: TicketStatus): LucideIcon {
    return tagStatusIcons[tagVariants[status]];
}

type TicketStatusTagProps = {
    status: TicketStatus;
    compactOnMobile?: boolean;
};

export function TicketStatusTag({ status, compactOnMobile }: TicketStatusTagProps) {
    return (
        <TagStatus variant={tagVariants[status]} layout={compactOnMobile ? "iconOnMobile" : "full"}>
            {ticketStatusLabels[status]}
        </TagStatus>
    );
}
