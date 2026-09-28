import type { Metadata } from "next";

import { PageHeader } from "@/components/dashboard/page-header";
import { AdminTicketsTable } from "@/components/tickets/admin-tickets-table";
import { getTickets } from "@/data/tickets";

export const metadata: Metadata = {
    title: "Chamados",
};

export default async function AdminTicketsPage() {
    const tickets = await getTickets();

    return (
        <>
            <PageHeader title="Chamados" />
            <AdminTicketsTable tickets={tickets} />
        </>
    );
}
