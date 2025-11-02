import { defineConfig } from "vite";

export default defineConfig({
  base: "/hw-web-2/",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        jobs: "jobs.html",
        books: "books.html",
        movies: "movies.html",
        index: "index.html",
      },
    },
  },
});
