import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Base Next.js + TypeScript rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Global rule refinements
  {
    rules: {
      // 未使用変数: 先頭アンダースコアは許容（意図的に未使用のもの）
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },

  // JS/JSX/NodeスクリプトにはTS特有の import 形態制限を適用しない
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },

  // テスト系は用途上 any を許容し、Hooksルールを緩和
  {
    files: [
      "tests/**/*.{ts,tsx,js,jsx}",
      "**/*.test.{ts,tsx,js,jsx}",
      "**/__tests__/**/*.{ts,tsx,js,jsx}",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react-hooks/rules-of-hooks": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
];

export default eslintConfig;
