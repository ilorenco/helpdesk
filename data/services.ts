import "server-only";

import type { Service } from "@/lib/services";

// Every function here gets its role check once authentication exists

// Sample data from the design until the database exists. The ids and prices match the services
// used by the sample tickets.
const services: Service[] = [
    { id: 1, name: "Instalação de Rede", priceInCents: 18000, isActive: true },
    { id: 2, name: "Recuperação de Dados", priceInCents: 20000, isActive: false },
    { id: 3, name: "Manutenção de Hardware", priceInCents: 15000, isActive: true },
    { id: 4, name: "Suporte de Software", priceInCents: 20000, isActive: true },
    { id: 5, name: "Diagnóstico e remoção de vírus", priceInCents: 12000, isActive: true },
];

// Returns copies, like a database query would, so callers can't change the sample data. Ordered
// by id, the order they were created in.
export async function getServices() {
    return services
        .map((service) => ({ ...service }))
        .sort((first, second) => first.id - second.id);
}
