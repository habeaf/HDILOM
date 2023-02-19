import { defineConfig } from 'vite'
import * as path from "path";
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "./",
  root: "./src/pages/Popup/",
  build: {
    outDir: path.resolve(__dirname, "./build/Popup"),
  },
  plugins: [react()],
})