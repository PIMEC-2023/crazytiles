import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [Vue()],
    // ... otras configuraciones de Vite
    test: {
        // Activar API de prueba global similar a jest
        globals: true,
    },
    environment: 'happy-dom',
    resolve: {
        alias: {
            '@': '/src'
        }
    }


});
