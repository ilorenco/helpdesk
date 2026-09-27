import "server-only";

import type { TicketStatus } from "@/lib/tickets";

export type Ticket = {
    id: number;
    title: string;
    service: string;
    totalInCents: number;
    clientName: string;
    technicianName: string;
    status: TicketStatus;
    updatedAt: Date;
};

// Sample data from the design until the database exists
const tickets: Ticket[] = [
    {
        id: 3,
        title: "Rede lenta",
        service: "Instalação de Rede",
        totalInCents: 18000,
        clientName: "André Costa",
        technicianName: "Carlos Silva",
        status: "open",
        updatedAt: new Date("2025-04-13T20:56:00-03:00"),
    },
    {
        id: 4,
        title: "Backup não está funcionando",
        service: "Recuperação de Dados",
        totalInCents: 20000,
        clientName: "André Costa",
        technicianName: "Carlos Silva",
        status: "open",
        updatedAt: new Date("2025-04-12T15:20:00-03:00"),
    },
    {
        id: 1,
        title: "Computador não liga",
        service: "Manutenção de Hardware",
        totalInCents: 15000,
        clientName: "Aline Souza",
        technicianName: "Carlos Silva",
        status: "in_progress",
        updatedAt: new Date("2025-04-12T09:01:00-03:00"),
    },
    {
        id: 2,
        title: "Instalação de software de gestão",
        service: "Suporte de Software",
        totalInCents: 20000,
        clientName: "Julia Maria",
        technicianName: "Ana Oliveira",
        status: "closed",
        updatedAt: new Date("2025-04-10T10:15:00-03:00"),
    },
    {
        id: 5,
        title: "Meu fone não conecta no computador",
        service: "Suporte de Software",
        totalInCents: 8000,
        clientName: "Suzane Moura",
        technicianName: "Ana Oliveira",
        status: "closed",
        updatedAt: new Date("2025-04-11T15:16:00-03:00"),
    },
];

// The admin role check goes here once authentication exists.
// Returns a copy, like a database query would, so callers can't change the sample data.
export async function getTickets() {
    return structuredClone(tickets).sort(
        (first, second) => second.updatedAt.getTime() - first.updatedAt.getTime(),
    );
}
