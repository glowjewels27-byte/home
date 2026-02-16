export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        champagne: "#E8D8C7",
        ivory: "#F9F6F0",
        blush: "#F3C7D3",
        charcoal: "#1E1E1E"
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Manrope", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 60px rgba(232, 216, 199, 0.35)",
        glass: "0 10px 30px rgba(31, 31, 31, 0.12)"
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(circle at 20% 20%, rgba(243,199,211,0.45), transparent 45%), radial-gradient(circle at 80% 10%, rgba(232,216,199,0.5), transparent 40%), linear-gradient(120deg, #F9F6F0 0%, #F7EDF2 50%, #F9F6F0 100%)",
        "soft-grid": "linear-gradient(transparent 95%, rgba(30,30,30,0.05) 100%), linear-gradient(90deg, transparent 95%, rgba(30,30,30,0.05) 100%)"
      },
      borderRadius: {
        xl: "1.25rem"
      }
    }
  },
  plugins: []
};
