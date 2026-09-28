import Link from "next/link";

import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";

// Shown for any URL the app doesn't handle, instead of Next's default English page
export default function NotFound() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
            <Logo />
            <h1 className="text-xl text-blue-dark">Página não encontrada</h1>
            <p className="text-sm text-gray-300">O endereço que você acessou não existe.</p>
            <Link href="/" className={buttonVariants({ variant: "secondary" })}>
                Voltar ao início
            </Link>
        </main>
    );
}
