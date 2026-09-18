import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // The 3D stack is lazy (icons3d/Icon3DView, dashboard/DashboardView), but
    // splitting the vendors explicitly keeps the first-load chunk small and
    // cacheable across deploys — which is what the mobile Lighthouse budget
    // (brief §3.3, target ≥85) actually turns on.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('three') || id.includes('@react-three')) return 'three';
          if (id.includes('framer-motion') || id.includes('motion-')) return 'motion';
          if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) {
            return 'react';
          }
          return undefined;
        },
      },
    },
    // three + drei legitimately exceed the default 500 kB warning; the point is
    // that they are not in the entry chunk.
    chunkSizeWarningLimit: 900,
  },
});
