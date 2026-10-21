import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],server:{host:'127.0.0.1',port:5173,strictPort:true,proxy:{'/api':'http://127.0.0.1:3001'}},build:{rollupOptions:{output:{manualChunks(id){if(id.includes('node_modules'))return id.includes('lucide')?'icons':'vendor';if(/\/(content|expanded-content|reading-packs|stories|long-readings|original-checks)\.ts$/.test(id))return 'curriculum';}}}}});
