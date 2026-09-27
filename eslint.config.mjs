import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    prettier,
    // Only the design system icons may be used: import them from @/components/icons.
    {
        rules: {
            "no-restricted-imports": [
                "error",
                {
                    paths: [
                        {
                            name: "lucide-react",
                            message:
                                "Import icons from @/components/icons (only the design system icons are allowed).",
                        },
                    ],
                    patterns: [
                        {
                            group: ["lucide-react/*"],
                            message:
                                "Import icons from @/components/icons (only the design system icons are allowed).",
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ["components/icons.ts"],
        rules: {
            "no-restricted-imports": "off",
        },
    },
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
    ]),
]);

export default eslintConfig;
