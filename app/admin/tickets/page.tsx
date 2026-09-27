import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
    title: "Chamados",
};

export default function AdminTicketsPage() {
    return <PageHeader title="Chamados" />;
}
