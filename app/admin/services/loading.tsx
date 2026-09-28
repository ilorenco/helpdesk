import { PageHeader } from "@/components/dashboard/page-header";
import { ServicesTableSkeleton } from "@/components/services/services-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminServicesLoading() {
    return (
        <>
            <PageHeader title="Serviços" inlineActions>
                <Skeleton className="size-10 md:w-23" />
            </PageHeader>
            <p role="status" className="sr-only">
                Carregando serviços
            </p>
            <ServicesTableSkeleton />
        </>
    );
}
