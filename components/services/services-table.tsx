import { Ban, CircleCheck, PenLine } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableEmptyRow,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TagStatus } from "@/components/ui/tag-status";
import { formatCurrency } from "@/lib/format";
import type { Service } from "@/lib/services";

const columnCount = 4;

// Everything that changes with a service's status: its tag and the action that toggles it
const serviceStatuses = {
    active: {
        tagVariant: "success",
        icon: CircleCheck,
        label: "Ativo",
        toggleIcon: Ban,
        toggleLabel: "Desativar",
    },
    inactive: {
        tagVariant: "danger",
        icon: Ban,
        label: "Inativo",
        toggleIcon: CircleCheck,
        toggleLabel: "Reativar",
    },
} as const;

function getServiceStatus(service: Service) {
    return serviceStatuses[service.isActive ? "active" : "inactive"];
}

// Shared by the table and its skeleton, so both keep the same column widths. Mobile keeps the
// fixed columns narrow so the title still has room; Valor reaches the design's 328px on xl.
function ServicesTableHeader() {
    return (
        <TableHeader>
            <TableRow>
                <TableHead>Título</TableHead>
                <TableHead className="w-24 md:w-40 xl:w-82">Valor</TableHead>
                <TableHead className="w-13 text-center md:w-24">Status</TableHead>
                <TableHead className="w-20 md:w-35">
                    <span className="sr-only">Ações</span>
                </TableHead>
            </TableRow>
        </TableHeader>
    );
}

type ServicesTableProps = {
    services: Service[];
};

export function ServicesTable({ services }: ServicesTableProps) {
    return (
        <Table>
            <ServicesTableHeader />
            <TableBody>
                {services.map((service) => (
                    <ServiceRow key={service.id} service={service} />
                ))}
                {services.length === 0 && (
                    <TableEmptyRow colSpan={columnCount}>Nenhum serviço cadastrado</TableEmptyRow>
                )}
            </TableBody>
        </Table>
    );
}

type ServiceRowProps = {
    service: Service;
};

function ServiceRow({ service }: ServiceRowProps) {
    const status = getServiceStatus(service);
    const ToggleIcon = status.toggleIcon;

    return (
        <TableRow>
            <TableCell>
                <p className="truncate text-sm font-bold">{service.name}</p>
            </TableCell>
            <TableCell className="text-sm">{formatCurrency(service.priceInCents)}</TableCell>
            <TableCell className="text-center">
                {/* Only the icon on mobile and only the label from tablets up, as in the design */}
                <TagStatus
                    variant={status.tagVariant}
                    icon={status.icon}
                    layout="iconOnMobileLabelFromTablet"
                >
                    {status.label}
                </TagStatus>
            </TableCell>
            <TableCell>
                <div className="flex items-center justify-center gap-2 md:justify-end">
                    <Button
                        variant="link"
                        size="sm"
                        iconOnly="mobile"
                        aria-label={`${status.toggleLabel} ${service.name}`}
                    >
                        <ToggleIcon />
                        <span>{status.toggleLabel}</span>
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        iconOnly
                        aria-label={`Editar ${service.name}`}
                    >
                        <PenLine />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
}

// Loading placeholder with the real header and rows of the same height, so the table doesn't
// jump when the services arrive. Update it together with ServiceRow.

const skeletonRowCount = 5;

function ServiceRowSkeleton() {
    return (
        <TableRow>
            <TableCell>
                <Skeleton className="h-4 w-3/4 max-w-60" />
            </TableCell>
            <TableCell>
                <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell>
                <Skeleton className="mx-auto h-7 w-7 rounded-full md:w-14" />
            </TableCell>
            <TableCell>
                <div className="flex items-center justify-center gap-2 md:justify-end">
                    <Skeleton className="size-5 md:w-20" />
                    <Skeleton className="size-7" />
                </div>
            </TableCell>
        </TableRow>
    );
}

export function ServicesTableSkeleton() {
    return (
        <Table>
            <ServicesTableHeader />
            <TableBody>
                {Array.from({ length: skeletonRowCount }, (_, index) => (
                    <ServiceRowSkeleton key={index} />
                ))}
            </TableBody>
        </Table>
    );
}
