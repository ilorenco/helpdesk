import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

type UserLabelProps = {
    name: string;
    // With an email the label grows into two lines with a bigger avatar
    email?: string;
};

export function UserLabel({ name, email }: UserLabelProps) {
    return (
        <span className="flex min-w-0 items-center gap-2">
            <Avatar name={name} size={email ? "md" : "sm"} />
            <span className="flex min-w-0 flex-col">
                <span className="truncate text-sm">{name}</span>
                {email && <span className="truncate text-xs text-gray-300">{email}</span>}
            </span>
        </span>
    );
}

type UserLabelSkeletonProps = {
    withEmail?: boolean;
};

// Loading placeholder for UserLabel; update them together
export function UserLabelSkeleton({ withEmail }: UserLabelSkeletonProps) {
    return (
        <span className="flex min-w-0 items-center gap-2">
            <Skeleton
                className={
                    withEmail ? "size-8 shrink-0 rounded-full" : "size-5 shrink-0 rounded-full"
                }
            />
            <span className="flex min-w-0 flex-col gap-1">
                <Skeleton className="h-4 w-24" />
                {withEmail && <Skeleton className="h-3.5 w-36" />}
            </span>
        </span>
    );
}
