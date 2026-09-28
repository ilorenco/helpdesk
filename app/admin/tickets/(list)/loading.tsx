import { PageHeader } from "@/components/dashboard/page-header";
import { AdminTicketsTableSkeleton } from "@/components/tickets/admin-tickets-table";

export default function AdminTicketsLoading() {
    return (
        <>
            <PageHeader title="Chamados" />
            <p role="status" className="sr-only">
                Carregando chamados
            </p>
            <AdminTicketsTableSkeleton />
        </>
    );
}
