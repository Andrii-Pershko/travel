import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import path from 'path';

// Визначаємо base path для GitHub Pages
// Якщо репозиторій називається "travel", то base = "/travel/"
// Якщо репозиторій називається інакше, змініть REPO_NAME або встановіть змінну середовища GITHUB_REPOSITORY
const REPO_NAME = process.env.REPO_NAME || 'travel';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || REPO_NAME;
const base = process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/';

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [
    react(), 
    tailwindcss(),
    svgr({
      include: "**/*.svg",
      svgrOptions: {
        icon: true,
      },
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
