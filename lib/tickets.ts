export type TicketStatus = "open" | "in_progress" | "closed";

export function formatTicketId(id: number) {
    return String(id).padStart(5, "0");
}
