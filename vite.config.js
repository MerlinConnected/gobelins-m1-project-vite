import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import path from 'path';

const pathSrc = path.resolve(__dirname, './src').replace(/\\/g, '/');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "${pathSrc}/styles/libs/_font-name.module.scss";\n
        @import "${pathSrc}/styles/fonts/_font.scss";\n
        @import "${pathSrc}/styles/libs/_variables.module.scss";\n
        @import "${pathSrc}/styles/libs/_functions.module.scss";\n
        @import "${pathSrc}/styles/libs/_rem.module.scss";\n
        @import "${pathSrc}/styles/libs/_grid.module.scss";\n
        @import "${pathSrc}/styles/libs/_mq.module.scss";\n
        @import "${pathSrc}/styles/libs/_mixins.module.scss";\n
        `,
      },
    },
  },
});
