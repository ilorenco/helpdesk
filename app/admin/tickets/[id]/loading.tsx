import { PageHeader } from "@/components/page-header";
import {
    TicketDetailsColumns,
    TicketInfoCardSkeleton,
    TicketSummaryCardSkeleton,
} from "@/components/ticket-details";
import { TicketStatusActionsSkeleton } from "@/components/ticket-status-actions";

// Shown while the ticket loads. It also lets links to this dynamic route be prefetched, so
// navigation starts right away instead of waiting for the server.
export default function AdminTicketLoading() {
    return (
        <>
            <PageHeader title="Chamado detalhado" backHref="/admin/tickets">
                <TicketStatusActionsSkeleton />
            </PageHeader>
            <p role="status" className="sr-only">
                Carregando chamado
            </p>
            <TicketDetailsColumns>
                <TicketInfoCardSkeleton />
                <TicketSummaryCardSkeleton />
            </TicketDetailsColumns>
        </>
    );
}
