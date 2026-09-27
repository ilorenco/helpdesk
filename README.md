# Helpdesk

Aplicação responsiva de gestão de chamados com painéis de administrador, técnico e cliente.

## Design

O layout, o design system (cores, tipografia e ícones) e os componentes estão no [Figma](https://www.figma.com/community/file/1506654636739959765/plataforma-de-chamados).

## Stack

- [Next.js 16](https://nextjs.org) (App Router) com React 19 e TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) com [Tailwind Variants](https://www.tailwind-variants.org) para variantes de componentes
- [Lucide](https://lucide.dev) para ícones
- ESLint, Prettier, husky, lint-staged e commitlint

## Rodando localmente

Requer Node.js 20.9 ou superior.

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando             | O que faz                                           |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Inicia o servidor de desenvolvimento                |
| `npm run build`     | Gera o build de produção                            |
| `npm run start`     | Roda o build de produção                            |
| `npm run lint`      | Verifica o código com ESLint                        |
| `npm run typecheck` | Gera os tipos das rotas e verifica tipos TypeScript |
| `npm run format`    | Formata todos os arquivos com Prettier              |

## Convenções

- **Formatação:** Prettier com indentação de 4 espaços. Ele também ordena os imports (pacotes, `@/`, relativos) e as classes do Tailwind.
- **Imports:** use o alias `@/` (raiz do projeto) para importar de outras pastas, e `./` apenas para arquivos da mesma pasta.
- **Design system:** cores, tamanhos de fonte e pesos ficam em [`app/theme.css`](app/theme.css). A paleta e a escala de tipografia padrão do Tailwind estão desativadas, então use apenas os tokens do design (ex.: `bg-blue-base`, `text-gray-200`, `text-md`).
- **Variantes:** use o `tv` de [`lib/variants.ts`](lib/variants.ts), que já conhece os tamanhos de fonte do design (ex.: `text-xxs`). O ESLint bloqueia importar o `tv` direto de `tailwind-variants`.
- **Ícones:** importe de [`components/icons.ts`](components/icons.ts), que reúne apenas os ícones do design. O ESLint bloqueia imports diretos de `lucide-react`.
- **Rotas tipadas:** links para rotas que não existem geram erro de TypeScript.
- **Commits:** mensagens em inglês no padrão [Conventional Commits](https://www.conventionalcommits.org/) (ex.: `feat: add ticket list`).

## Verificações antes do commit

Ao rodar `npm install`, o husky instala dois ganchos no git:

- **pre-commit:** roda ESLint e Prettier nos arquivos do commit e depois `npm run typecheck`. Erros de lint ou de tipo bloqueiam o commit.
- **commit-msg:** valida a mensagem com commitlint.

## Editor

Ao abrir o projeto, o VS Code sugere instalar as extensões listadas em `.vscode/extensions.json` (confira o identificador ao instalar):

- Prettier: `esbenp.prettier-vscode`
- Tailwind CSS IntelliSense: `bradlc.vscode-tailwindcss`
- ESLint: `dbaeumer.vscode-eslint`

O `.vscode/settings.json` ativa a formatação ao salvar.

## Agentes de IA

As instruções para agentes de IA ficam em [`AGENTS.md`](AGENTS.md).
