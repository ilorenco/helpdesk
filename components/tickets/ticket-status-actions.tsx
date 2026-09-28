import { getTicketStatusIcon } from "@/components/tickets/ticket-status-tag";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ticketStatuses, ticketStatusLabels, type TicketStatus } from "@/lib/tickets";

type TicketStatusActionsProps = {
    status: TicketStatus;
};

// One button for each status other than the current one (the admin can set any status)
export function TicketStatusActions({ status }: TicketStatusActionsProps) {
    const nextStatuses = ticketStatuses.filter((ticketStatus) => ticketStatus !== status);

    return nextStatuses.map((nextStatus) => {
        const Icon = getTicketStatusIcon(nextStatus);
        const label = ticketStatusLabels[nextStatus];

        return (
            <Button
                key={nextStatus}
                variant="secondary"
                aria-label={`Alterar status para ${label}`}
            >
                <Icon />
                {label}
            </Button>
        );
    });
}

// Loading placeholder for two actions. The minimum widths match the real buttons, so the
// placeholders wrap onto another line on narrow screens just like the buttons do.
export function TicketStatusActionsSkeleton() {
    return (
        <>
            <Skeleton className="h-10 min-w-40" />
            <Skeleton className="h-10 min-w-30" />
        </>
    );
}
