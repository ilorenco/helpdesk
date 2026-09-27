import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
    title: "Clientes",
};

export default function AdminClientsPage() {
    return <PageHeader title="Clientes" />;
}
