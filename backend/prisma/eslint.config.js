import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import dotenv from "dotenv";

dotenv.config();

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    plugins: ["@ts-safeql/eslint-plugin"],
    // exclude `parserOptions` if you are not using TypeScript
    parserOptions: {
      project: "./tsconfig.json",
    },
    rules: {
      "@ts-safeql/check-sql": [
        "error",
        {
          connections: [
            {
              connectionUrl: process.env.DATABASE_URL,
              // The migrations path:
              migrationsDir: "./prisma/migrations",
              targets: [
                // what you would like SafeQL to lint. This makes `prisma.$queryRaw` and `prisma.$executeRaw`
                // commands linted
                {
                  tag: "prisma.+($queryRaw|$executeRaw)",
                  transform: "{type}[]",
                },
              ],
            },
          ],
        },
      ],
    },
    overrides: [
      { files: ["**/*.{js,mjs,cjs,ts}"] },
      { languageOptions: { globals: globals.browser } },
      pluginJs.configs.recommended,
      ...tseslint.configs.recommended,
    ],
  },
];

