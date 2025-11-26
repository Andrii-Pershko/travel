import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  const repoName = "travel";
  const base = mode === 'production' ? `/${repoName}/` : '/';

  return {
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
  };
})
