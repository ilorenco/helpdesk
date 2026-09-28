import type { ReactNode } from "react";

import { TicketStatusTag } from "@/components/ticket-status-tag";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserLabel, UserLabelSkeleton } from "@/components/user-label";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { formatTicketId, getTicketTotalInCents, type Ticket } from "@/lib/tickets";
import { tv } from "@/lib/variants";

const detailItemVariants = tv({
    slots: {
        root: "flex flex-col gap-0.5",
        term: "text-xs font-bold text-gray-400",
        details: "text-gray-200",
    },
});

const detailItem = detailItemVariants();

// Layout shared by each card and its skeleton, so the loading state always matches
const ticketCardVariants = tv({
    slots: {
        info: "flex flex-col gap-5 p-5 lg:flex-1 lg:p-6",
        summary: "flex flex-col gap-8 p-5 lg:w-74 lg:shrink-0 lg:p-6",
    },
});

const ticketCard = ticketCardVariants();

type TicketDetailsColumnsProps = {
    children: ReactNode;
};

// Stacks the two cards on mobile and puts them side by side on desktop
export function TicketDetailsColumns({ children }: TicketDetailsColumnsProps) {
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">{children}</div>
    );
}

type DetailItemProps = {
    label: string;
    className?: string;
    children: ReactNode;
};

function DetailItem({ label, className, children }: DetailItemProps) {
    return (
        <div className={detailItem.root({ className })}>
            <dt className={detailItem.term()}>{label}</dt>
            <dd className={detailItem.details()}>{children}</dd>
        </div>
    );
}

type PriceRowProps = {
    name: string;
    priceInCents: number;
};

function PriceRow({ name, priceInCents }: PriceRowProps) {
    return (
        <p className="flex justify-between gap-2 text-xs">
            <span>{name}</span>
            <span className="shrink-0">{formatCurrency(priceInCents)}</span>
        </p>
    );
}

type TicketCardProps = {
    ticket: Ticket;
};

export function TicketInfoCard({ ticket }: TicketCardProps) {
    return (
        <Card className={ticketCard.info()}>
            <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-gray-300">
                        {formatTicketId(ticket.id)}
                    </span>
                    <TicketStatusTag status={ticket.status} />
                </div>
                <h2 className="text-md font-bold text-gray-200">{ticket.title}</h2>
            </div>
            {/* A grid, so the two dates sit side by side while each item stays a direct child */}
            <dl className="grid grid-cols-2 gap-x-8 gap-y-5">
                <DetailItem label="Descrição" className="col-span-2">
                    <p className="text-sm">{ticket.description}</p>
                </DetailItem>
                <DetailItem label="Categoria" className="col-span-2">
                    <p className="text-sm">{ticket.service.name}</p>
                </DetailItem>
                <DetailItem label="Criado em">
                    <p className="text-xs">{formatDateTime(ticket.createdAt)}</p>
                </DetailItem>
                <DetailItem label="Atualizado em">
                    <p className="text-xs">{formatDateTime(ticket.updatedAt)}</p>
                </DetailItem>
                <DetailItem label="Cliente" className="col-span-2 gap-2">
                    <UserLabel name={ticket.client.name} />
                </DetailItem>
            </dl>
        </Card>
    );
}

export function TicketSummaryCard({ ticket }: TicketCardProps) {
    const hasAdditionalServices = ticket.additionalServices.length > 0;
    const totalInCents = getTicketTotalInCents(ticket);

    return (
        <Card className={ticketCard.summary()}>
            <dl>
                <DetailItem label="Técnico responsável" className="gap-2">
                    <UserLabel name={ticket.technician.name} email={ticket.technician.email} />
                </DetailItem>
            </dl>
            <div className="flex flex-col gap-4">
                <dl className="flex flex-col gap-4">
                    <DetailItem label="Valores" className="gap-2">
                        <PriceRow name="Preço base" priceInCents={ticket.service.priceInCents} />
                    </DetailItem>
                    {hasAdditionalServices && (
                        <DetailItem label="Adicionais" className="gap-2">
                            <div className="flex flex-col gap-0.5">
                                {ticket.additionalServices.map((additionalService) => (
                                    <PriceRow
                                        key={additionalService.id}
                                        name={additionalService.name}
                                        priceInCents={additionalService.priceInCents}
                                    />
                                ))}
                            </div>
                        </DetailItem>
                    )}
                </dl>
                <p className="flex justify-between gap-2 border-t border-gray-500 pt-3 text-sm font-bold text-gray-200">
                    <span>Total</span>
                    <span>{formatCurrency(totalInCents)}</span>
                </p>
            </div>
        </Card>
    );
}

// Loading placeholders that keep each card's padding and spacing, so the layout barely moves
// when the ticket arrives. Update them together with the cards above.

type DetailItemSkeletonProps = {
    className?: string;
    children: ReactNode;
};

function DetailItemSkeleton({ className, children }: DetailItemSkeletonProps) {
    return (
        <div className={detailItem.root({ className })}>
            <Skeleton className="h-4 w-20" />
            {children}
        </div>
    );
}

function PriceRowSkeleton() {
    return (
        <div className="flex justify-between gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-16" />
        </div>
    );
}

export function TicketInfoCardSkeleton() {
    return (
        <Card className={ticketCard.info()}>
            <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between gap-2">
                    <Skeleton className="h-4 w-10" />
                    <Skeleton className="h-7 w-20 rounded-full" />
                </div>
                <Skeleton className="h-5.5 w-3/5" />
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                <DetailItemSkeleton className="col-span-2">
                    <div className="flex flex-col gap-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                    </div>
                </DetailItemSkeleton>
                <DetailItemSkeleton className="col-span-2">
                    <Skeleton className="h-5 w-2/5" />
                </DetailItemSkeleton>
                <DetailItemSkeleton>
                    <Skeleton className="h-4 w-24" />
                </DetailItemSkeleton>
                <DetailItemSkeleton>
                    <Skeleton className="h-4 w-24" />
                </DetailItemSkeleton>
                <DetailItemSkeleton className="col-span-2 gap-2">
                    <UserLabelSkeleton />
                </DetailItemSkeleton>
            </div>
        </Card>
    );
}

export function TicketSummaryCardSkeleton() {
    return (
        <Card className={ticketCard.summary()}>
            <DetailItemSkeleton className="gap-2">
                <UserLabelSkeleton withEmail />
            </DetailItemSkeleton>
            <div className="flex flex-col gap-4">
                {/* No "Adicionais" block: most tickets have no additional services */}
                <DetailItemSkeleton className="gap-2">
                    <PriceRowSkeleton />
                </DetailItemSkeleton>
                <div className="flex justify-between gap-2 border-t border-gray-500 pt-3">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-20" />
                </div>
            </div>
        </Card>
    );
}
