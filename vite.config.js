import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        jobs: "jobs.html",
        books: "books.html",
        movies: "movies.html",
      },
    },
  },
});
