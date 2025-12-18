import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  // GitHub Actions provides GITHUB_REPOSITORY like "owner/repo"
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
  return {
    base: repo ? `/${repo}/` : "/",
    plugins: [react()],
  };
});
