// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://fastapi-dashboard-eay4.onrender.com',
    },
  },
});
