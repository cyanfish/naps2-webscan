// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'wwwroot/js/site.ts'),
            name: 'Site',
            // the proper extensions will be added
            fileName: 'site',
        },
        outDir: './wwwroot/dist'
    }
})