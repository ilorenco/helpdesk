import type { Metadata } from "next";

import { AdminTicketsTable } from "@/components/admin-tickets-table";
import { PageHeader } from "@/components/page-header";
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
