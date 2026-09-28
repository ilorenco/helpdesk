import { AdminTicketsTableSkeleton } from "@/components/admin-tickets-table";
import { PageHeader } from "@/components/page-header";

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
