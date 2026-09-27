import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";

import "./globals.css";

const lato = Lato({
    variable: "--font-lato",
    subsets: ["latin"],
    weight: ["400", "700"],
    style: ["normal", "italic"],
});

export const metadata: Metadata = {
    title: {
        template: "%s | Helpdesk",
        default: "Helpdesk",
    },
    description: "Gestão de chamados",
};

export const viewport: Viewport = {
    themeColor: "#151619",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="pt-BR" className={`${lato.variable} h-full antialiased`}>
            <body className="flex min-h-full flex-col">
                {/* Isolated so Base UI popups, portaled to <body>, always render above the app */}
                <div className="isolate flex flex-1 flex-col">{children}</div>
            </body>
        </html>
    );
}
