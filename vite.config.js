import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        allowedHosts: true,
        proxy: {
            // Proxy Moodle API calls to avoid CORS issues in development
            '/moodle-api': {
                target: 'https://orena.solutions',
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/moodle-api/, '/moodle/webservice/rest/server.php'),
            },
            // Proxy Moodle file downloads (course images)
            '/moodle-files': {
                target: 'https://orena.solutions',
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/moodle-files/, '/moodle/pluginfile.php'),
            },
            // Proxy local node backend for lead generation
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                secure: false,
            },
        },
    },
})
