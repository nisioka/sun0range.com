import js from "@eslint/js"
import tseslint from "typescript-eslint"

export default tseslint.config(
  {
    ignores: ["public/**", ".cache/**", "node_modules/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // 既存コードに残る any は段階的に解消するため warning に留める
      "@typescript-eslint/no-explicit-any": "warn",
    },
  }
)
