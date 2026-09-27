import Image from "next/image";

import { Logo } from "@/components/logo";

export default function AuthLayout({ children }: LayoutProps<"/">) {
    return (
        <div className="relative flex flex-1 flex-col pt-8 lg:items-end lg:pt-3">
            <Image
                src="/images/login-background.png"
                alt=""
                fill
                loading="eager"
                sizes="100vw"
                className="object-cover"
            />
            <main className="relative flex flex-1 flex-col items-center gap-6 rounded-t-lg bg-gray-600 px-6 pt-8 pb-6 lg:w-170 lg:gap-8 lg:rounded-tr-none lg:px-35 lg:py-12">
                <Logo />
                {children}
            </main>
        </div>
    );
}
