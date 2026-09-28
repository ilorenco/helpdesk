import type { Metadata } from "next";

import { PageHeader } from "@/components/dashboard/page-header";
import { Plus } from "@/components/icons";
import { ServicesTable } from "@/components/services/services-table";
import { Button } from "@/components/ui/button";
import { getServices } from "@/data/services";

export const metadata: Metadata = {
    title: "Serviços",
};

export default async function AdminServicesPage() {
    const services = await getServices();

    return (
        <>
            <PageHeader title="Serviços" inlineActions>
                <Button iconOnly="mobile">
                    <Plus />
                    <span>Novo</span>
                </Button>
            </PageHeader>
            <ServicesTable services={services} />
        </>
    );
}
