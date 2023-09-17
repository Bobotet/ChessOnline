import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        boardHorizontal: '20px 400px',
        boardVartical: '400px 20px',
      },
    },
    colors: { blackCell: '#779556', whiteCell: '#ebecd0' },
  },
  plugins: [],
};
export default config;
