import "server-only";

import type { Ticket } from "@/lib/tickets";

// Every function here gets its role check once authentication exists

const andreCosta = { name: "André Costa", email: "andre.costa@test.com" };
const carlosSilva = { name: "Carlos Silva", email: "carlos.silva@test.com" };
const anaOliveira = { name: "Ana Oliveira", email: "ana.oliveira@test.com" };

const softwareSupport = { id: 4, name: "Suporte de Software", priceInCents: 20000 };

// Sample data from the design until the database exists
const tickets: Ticket[] = [
    {
        id: 3,
        title: "Rede lenta",
        description: "A internet está muito lenta em todos os computadores do escritório.",
        service: { id: 1, name: "Instalação de Rede", priceInCents: 18000 },
        additionalServices: [],
        client: andreCosta,
        technician: carlosSilva,
        status: "open",
        createdAt: new Date("2025-04-13T18:30:00-03:00"),
        updatedAt: new Date("2025-04-13T20:56:00-03:00"),
    },
    {
        id: 4,
        title: "Backup não está funcionando",
        description:
            "O sistema de backup automático parou de funcionar. Última execução bem-sucedida foi há uma semana.",
        service: { id: 2, name: "Recuperação de Dados", priceInCents: 20000 },
        additionalServices: [
            { id: 1, name: "Assinatura de backup", priceInCents: 12000 },
            { id: 2, name: "Formatação do PC", priceInCents: 7500 },
        ],
        client: andreCosta,
        technician: carlosSilva,
        status: "open",
        createdAt: new Date("2025-04-12T09:12:00-03:00"),
        updatedAt: new Date("2025-04-12T15:20:00-03:00"),
    },
    {
        id: 1,
        title: "Computador não liga",
        description: "O computador não liga desde ontem, nem a luz do botão acende.",
        service: { id: 3, name: "Manutenção de Hardware", priceInCents: 15000 },
        additionalServices: [],
        client: { name: "Aline Souza", email: "aline.souza@test.com" },
        technician: carlosSilva,
        status: "in_progress",
        createdAt: new Date("2025-04-11T16:40:00-03:00"),
        updatedAt: new Date("2025-04-12T09:01:00-03:00"),
    },
    {
        id: 2,
        title: "Instalação de software de gestão",
        description: "Preciso instalar o software de gestão financeira em dois computadores.",
        service: softwareSupport,
        additionalServices: [],
        client: { name: "Julia Maria", email: "julia.maria@test.com" },
        technician: anaOliveira,
        status: "closed",
        createdAt: new Date("2025-04-09T14:05:00-03:00"),
        updatedAt: new Date("2025-04-10T10:15:00-03:00"),
    },
    {
        id: 5,
        title: "Meu fone não conecta no computador",
        description: "O fone Bluetooth aparece na lista, mas não conecta ao computador.",
        service: softwareSupport,
        additionalServices: [],
        client: { name: "Suzane Moura", email: "suzane.moura@test.com" },
        technician: anaOliveira,
        status: "closed",
        createdAt: new Date("2025-04-11T11:20:00-03:00"),
        updatedAt: new Date("2025-04-11T15:16:00-03:00"),
    },
];

// Each ticket is copied on its own, like a database row, so tickets never share objects
// (such as their technician) and callers can't change the sample data.
function copyTicket(ticket: Ticket) {
    return structuredClone(ticket);
}

export async function getTickets() {
    return tickets
        .map(copyTicket)
        .sort((first, second) => second.updatedAt.getTime() - first.updatedAt.getTime());
}

export async function getTicket(id: number) {
    const ticket = tickets.find((sampleTicket) => sampleTicket.id === id);

    return ticket ? copyTicket(ticket) : undefined;
}
