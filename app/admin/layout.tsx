import { DashboardShell, type NavItem } from "@/components/dashboard/dashboard-shell";
import { BriefcaseBusiness, ClipboardList, Users, Wrench } from "@/components/icons";

const navItems: NavItem[] = [
    { href: "/admin/tickets", label: "Chamados", icon: <ClipboardList /> },
    { href: "/admin/technicians", label: "Técnicos", icon: <Users /> },
    { href: "/admin/clients", label: "Clientes", icon: <BriefcaseBusiness /> },
    { href: "/admin/services", label: "Serviços", icon: <Wrench /> },
];

// Placeholder until authentication provides the signed-in user
const user = {
    name: "Usuário Adm",
    email: "user.adm@test.com",
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
    return (
        <DashboardShell role="Admin" navItems={navItems} user={user}>
            {children}
        </DashboardShell>
    );
}
