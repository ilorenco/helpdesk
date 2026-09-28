import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import {
    TicketDetailsColumns,
    TicketInfoCard,
    TicketSummaryCard,
} from "@/components/ticket-details";
import { TicketStatusActions } from "@/components/ticket-status-actions";
import { getTicket } from "@/data/tickets";
import { parseTicketId } from "@/lib/tickets";

export const metadata: Metadata = {
    title: "Chamado detalhado",
};

export default async function AdminTicketPage(props: PageProps<"/admin/tickets/[id]">) {
    const { id } = await props.params;
    const ticketId = parseTicketId(id);
    const ticket = ticketId === undefined ? undefined : await getTicket(ticketId);

    if (!ticket) {
        notFound();
    }

    return (
        <>
            <PageHeader title="Chamado detalhado" backHref="/admin/tickets">
                <TicketStatusActions status={ticket.status} />
            </PageHeader>
            <TicketDetailsColumns>
                <TicketInfoCard ticket={ticket} />
                <TicketSummaryCard ticket={ticket} />
            </TicketDetailsColumns>
        </>
    );
}
