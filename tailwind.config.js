/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#070118",
        card: "#111827",
        gold: "#D4AF37",
        goldHover: "#E6C35C",
        borderLux: "#1F2933",
        textPrimary: "#E5E7EB",
        textMuted: "#6B7280",
      },
    },
  },
  plugins: [],
};
