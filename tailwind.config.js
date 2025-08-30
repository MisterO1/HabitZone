/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // background: 'var(--background)',
        // card: 'var(--card)',
        // 'card-foreground': 'var(--card-foreground)',
        // popover: 'var(--popover)',
        // 'popover-foreground': 'var(--popover-foreground)',
        primary: 'var(--primary)',
        // 'primary-foreground': 'var(--primary-foreground)',
        // secondary: 'var(--secondary)',
        // 'secondary-foreground': 'var(--secondary-foreground)',
        // muted: 'var(--muted)',
        // 'muted-foreground': 'var(--muted-foreground)',
        // accent: 'var(--accent)',
        // 'accent-foreground': 'var(--accent-foreground)',
        // destructive: 'var(--destructive)',
        // 'destructive-foreground': 'var(--destructive-foreground)',
        // border: 'var(--border)',
        // input: 'var(--input)',
        // ring: 'var(--ring)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        playfair: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
}
