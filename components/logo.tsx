import Image from "next/image";

export function Logo() {
    return (
        <div className="flex items-center gap-3">
            <Image src="/images/logo-icon-dark.svg" alt="" width={40} height={40} />
            <span className="text-xl text-blue-dark">HelpDesk</span>
        </div>
    );
}
