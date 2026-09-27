import { PenLine } from "@/components/icons";
import { TicketStatusTag } from "@/components/ticket-status-tag";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { UserLabel } from "@/components/user-label";
import type { Ticket } from "@/data/tickets";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { formatTicketId } from "@/lib/tickets";

// Id, total, client and technician only fit next to the sidebar on wide screens. Headers and
// cells share this class so a column is never shown in one and hidden in the other.
const wideColumnClassName = "hidden xl:table-cell";

const columnCount = 8;

type AdminTicketsTableProps = {
    tickets: Ticket[];
};

export function AdminTicketsTable({ tickets }: AdminTicketsTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {/* 4px wider than in Figma so the header fits without being truncated */}
                    <TableHead className="w-20 md:w-29">Atualizado em</TableHead>
                    <TableHead className={`${wideColumnClassName} w-16`}>Id</TableHead>
                    <TableHead>Título e Serviço</TableHead>
                    <TableHead className={`${wideColumnClassName} w-26`}>Valor total</TableHead>
                    <TableHead className={`${wideColumnClassName} w-40`}>Cliente</TableHead>
                    <TableHead className={`${wideColumnClassName} w-40`}>Técnico</TableHead>
                    <TableHead className="w-16 text-center md:w-38 md:text-left">Status</TableHead>
                    <TableHead className="w-13">
                        <span className="sr-only">Ações</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tickets.map((ticket) => (
                    <AdminTicketRow key={ticket.id} ticket={ticket} />
                ))}
                {tickets.length === 0 && (
                    <TableRow>
                        <TableCell
                            colSpan={columnCount}
                            className="text-center text-sm text-gray-400"
                        >
                            Nenhum chamado encontrado
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

type AdminTicketRowProps = {
    ticket: Ticket;
};

function AdminTicketRow({ ticket }: AdminTicketRowProps) {
    const ticketId = formatTicketId(ticket.id);

    return (
        <TableRow>
            <TableCell className="text-xs">{formatDateTime(ticket.updatedAt)}</TableCell>
            <TableCell className={`${wideColumnClassName} text-xs font-bold`}>{ticketId}</TableCell>
            <TableCell>
                <p className="truncate text-sm font-bold">{ticket.title}</p>
                <p className="truncate text-xs">{ticket.service}</p>
            </TableCell>
            <TableCell className={`${wideColumnClassName} text-sm`}>
                {formatCurrency(ticket.totalInCents)}
            </TableCell>
            <TableCell className={wideColumnClassName}>
                <UserLabel name={ticket.clientName} />
            </TableCell>
            <TableCell className={wideColumnClassName}>
                <UserLabel name={ticket.technicianName} />
            </TableCell>
            <TableCell className="text-center md:text-left">
                <TicketStatusTag status={ticket.status} compactOnMobile />
            </TableCell>
            <TableCell>
                <Button
                    variant="secondary"
                    size="sm"
                    iconOnly
                    aria-label={`Editar chamado ${ticketId}`}
                >
                    <PenLine />
                </Button>
            </TableCell>
        </TableRow>
    );
}
