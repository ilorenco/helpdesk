import type { Metadata } from "next";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
    title: "Entrar",
};

export default function LoginPage() {
    return (
        <div className="flex w-full max-w-100 flex-col gap-3">
            <Card className="p-6 lg:p-7">
                <form className="flex flex-col gap-8 lg:gap-10">
                    <div className="flex flex-col gap-0.5">
                        <h1 className="text-lg text-gray-200">Acesse o portal</h1>
                        <p className="text-xs text-gray-300">
                            Entre usando seu e-mail e senha cadastrados
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Input
                            label="E-mail"
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder="exemplo@mail.com"
                        />
                        <Input
                            label="Senha"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            placeholder="Digite sua senha"
                        />
                    </div>
                    <Button>Entrar</Button>
                </form>
            </Card>
            <Card className="flex flex-col gap-5 p-6 lg:gap-6 lg:p-7">
                <div className="flex flex-col gap-0.5">
                    <h2 className="text-md font-bold text-gray-200">Ainda não tem uma conta?</h2>
                    <p className="text-xs text-gray-300">Cadastre agora mesmo</p>
                </div>
                <Link href="/sign-up" className={buttonVariants({ variant: "secondary" })}>
                    Criar conta
                </Link>
            </Card>
        </div>
    );
}
