import Link from "next/link";

import { PenLine } from "@/components/icons";
import { TicketStatusTag } from "@/components/tickets/ticket-status-tag";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { UserLabel, UserLabelSkeleton } from "@/components/user-label";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { formatTicketId, getTicketTotalInCents, type Ticket } from "@/lib/tickets";

// Id, total, client and technician only fit next to the sidebar on wide screens. Headers and
// cells share this class so a column is never shown in one and hidden in the other.
const wideColumnClassName = "hidden xl:table-cell";

const columnCount = 8;

type AdminTicketsTableProps = {
    tickets: Ticket[];
};

// Shared by the table and its skeleton, so both keep the same column widths
function AdminTicketsTableHeader() {
    return (
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
    );
}

export function AdminTicketsTable({ tickets }: AdminTicketsTableProps) {
    return (
        <Table>
            <AdminTicketsTableHeader />
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
    const totalInCents = getTicketTotalInCents(ticket);

    return (
        <TableRow>
            <TableCell className="text-xs">{formatDateTime(ticket.updatedAt)}</TableCell>
            <TableCell className={`${wideColumnClassName} text-xs font-bold`}>{ticketId}</TableCell>
            <TableCell>
                <p className="truncate text-sm font-bold">{ticket.title}</p>
                <p className="truncate text-xs">{ticket.service.name}</p>
            </TableCell>
            <TableCell className={`${wideColumnClassName} text-sm`}>
                {formatCurrency(totalInCents)}
            </TableCell>
            <TableCell className={wideColumnClassName}>
                <UserLabel name={ticket.client.name} />
            </TableCell>
            <TableCell className={wideColumnClassName}>
                <UserLabel name={ticket.technician.name} />
            </TableCell>
            <TableCell className="text-center md:text-left">
                <TicketStatusTag status={ticket.status} compactOnMobile />
            </TableCell>
            <TableCell>
                <Link
                    href={`/admin/tickets/${ticket.id}`}
                    aria-label={`Editar chamado ${ticketId}`}
                    className={buttonVariants({ variant: "secondary", size: "sm", iconOnly: true })}
                >
                    <PenLine />
                </Link>
            </TableCell>
        </TableRow>
    );
}

// Loading placeholder with the real header and rows of the same height, so the table doesn't
// jump when the tickets arrive. Update it together with AdminTicketRow.

const skeletonRowCount = 5;

function AdminTicketRowSkeleton() {
    return (
        <TableRow>
            <TableCell>
                <Skeleton className="h-4 w-full max-w-22" />
            </TableCell>
            <TableCell className={wideColumnClassName}>
                <Skeleton className="h-4 w-10" />
            </TableCell>
            <TableCell>
                <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3.5 w-1/2" />
                </div>
            </TableCell>
            <TableCell className={wideColumnClassName}>
                <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell className={wideColumnClassName}>
                <UserLabelSkeleton />
            </TableCell>
            <TableCell className={wideColumnClassName}>
                <UserLabelSkeleton />
            </TableCell>
            <TableCell>
                <Skeleton className="mx-auto h-7 w-7 rounded-full md:mx-0 md:w-24" />
            </TableCell>
            <TableCell>
                <Skeleton className="size-7" />
            </TableCell>
        </TableRow>
    );
}

export function AdminTicketsTableSkeleton() {
    return (
        <Table>
            <AdminTicketsTableHeader />
            <TableBody>
                {Array.from({ length: skeletonRowCount }, (_, index) => (
                    <AdminTicketRowSkeleton key={index} />
                ))}
            </TableBody>
        </Table>
    );
}
