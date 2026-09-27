import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
    title: "Serviços",
};

export default function AdminServicesPage() {
    return <PageHeader title="Serviços" />;
}
