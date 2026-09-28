import { PageHeader } from "@/components/dashboard/page-header";

export default function AdminTicketNotFound() {
    return (
        <>
            <PageHeader title="Chamado não encontrado" backHref="/admin/tickets" />
            <p className="text-sm text-gray-300">
                Esse chamado não existe ou foi excluído junto com a conta do cliente.
            </p>
        </>
    );
}
