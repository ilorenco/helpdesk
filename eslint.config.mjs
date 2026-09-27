import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    prettier,
    // Only the design system icons may be used: import them from @/components/icons.
    // Variants must use the tv from @/lib/variants, which knows the design system tokens.
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
                        {
                            name: "tailwind-variants",
                            importNames: ["tv", "createTV", "cn", "cnMerge"],
                            message:
                                "Import tv from @/lib/variants (it is configured with the design system tokens).",
                        },
                    ],
                    patterns: [
                        {
                            group: ["lucide-react/*"],
                            message:
                                "Import icons from @/components/icons (only the design system icons are allowed).",
                        },
                        {
                            group: ["tailwind-variants/*"],
                            message:
                                "Import tv from @/lib/variants (it is configured with the design system tokens).",
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ["components/icons.ts", "lib/variants.ts"],
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
