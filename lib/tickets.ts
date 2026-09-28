export const ticketStatuses = ["open", "in_progress", "closed"] as const;

export type TicketStatus = (typeof ticketStatuses)[number];

export const ticketStatusLabels: Record<TicketStatus, string> = {
    open: "Aberto",
    in_progress: "Em atendimento",
    closed: "Encerrado",
};

type Person = {
    name: string;
    email: string;
};

type PricedItem = {
    id: number;
    name: string;
    priceInCents: number;
};

export type Ticket = {
    id: number;
    title: string;
    description: string;
    service: PricedItem;
    additionalServices: PricedItem[];
    client: Person;
    technician: Person;
    status: TicketStatus;
    createdAt: Date;
    updatedAt: Date;
};

export function formatTicketId(id: number) {
    return String(id).padStart(5, "0");
}

// Only digits are accepted, so "0x3" or "3.0" don't open ticket 3, but the zero-padded id the
// screens show ("00003") does
export function parseTicketId(value: string) {
    const id = Number(value);

    return /^\d+$/.test(value) && id > 0 && Number.isSafeInteger(id) ? id : undefined;
}

// A ticket costs its service's base price plus every additional service
export function getTicketTotalInCents({
    service,
    additionalServices,
}: Pick<Ticket, "service" | "additionalServices">) {
    return additionalServices.reduce(
        (total, additionalService) => total + additionalService.priceInCents,
        service.priceInCents,
    );
}
