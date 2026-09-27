import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
    title: "Técnicos",
};

export default function AdminTechniciansPage() {
    return <PageHeader title="Técnicos" />;
}
