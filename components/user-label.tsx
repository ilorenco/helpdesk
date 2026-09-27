import { Avatar } from "@/components/ui/avatar";

type UserLabelProps = {
    name: string;
};

export function UserLabel({ name }: UserLabelProps) {
    return (
        <span className="flex items-center gap-2">
            <Avatar name={name} size="sm" />
            <span className="truncate text-sm">{name}</span>
        </span>
    );
}
