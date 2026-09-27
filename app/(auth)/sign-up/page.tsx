import type { Metadata } from "next";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
    title: "Cadastro",
};

export default function SignUpPage() {
    return (
        <div className="flex w-full max-w-100 flex-col gap-3">
            <Card className="p-6 lg:p-7">
                <form className="flex flex-col gap-8 lg:gap-10">
                    <div className="flex flex-col gap-0.5">
                        <h1 className="text-lg text-gray-200">Crie sua conta</h1>
                        <p className="text-xs text-gray-300">Informe seu nome, e-mail e senha</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Input
                            label="Nome"
                            name="name"
                            autoComplete="name"
                            placeholder="Digite o nome completo"
                        />
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
                            autoComplete="new-password"
                            placeholder="Digite sua senha"
                            helperText="Mínimo de 6 caracteres"
                        />
                    </div>
                    <Button>Cadastrar</Button>
                </form>
            </Card>
            <Card className="flex flex-col gap-5 p-6 lg:gap-6 lg:p-7">
                <div className="flex flex-col gap-0.5">
                    <h2 className="text-md font-bold text-gray-200">Já tem uma conta?</h2>
                    <p className="text-xs text-gray-300">Entre agora mesmo</p>
                </div>
                <Link href="/login" className={buttonVariants({ variant: "secondary" })}>
                    Acessar conta
                </Link>
            </Card>
        </div>
    );
}
