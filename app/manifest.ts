import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Helpdesk",
        short_name: "Helpdesk",
        description: "Gestão de chamados",
        start_url: "/",
        display: "standalone",
        background_color: "#f9fafa",
        theme_color: "#151619",
        icons: [
            {
                src: "/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
