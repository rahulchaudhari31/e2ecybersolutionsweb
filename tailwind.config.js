/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "2.5rem",
      },
      screens: {
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FAF5EC",
          50: "#FEFCF7",
          100: "#FDF9F1",
          200: "#F4EAD8",
          300: "#EBDBBF",
        },
        ink: {
          DEFAULT: "#14101A",
          soft: "#241E2B",
          mute: "#4A4351",
        },
        pink: {
          DEFAULT: "#CC0066",
          soft: "#FFD9EC",
          mid: "#F45BA8",
          dark: "#B80065",
        },
        sunshine: {
          DEFAULT: "#FFC83D",
          soft: "#FFEFC2",
        },
        lilac: {
          DEFAULT: "#EDE7F6",
          deep: "#D8CCEE",
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        hand: ["Caveat", "Segoe Script", "cursive"],
      },
      fontSize: {
        "10xl": ["9rem", { lineHeight: "0.88", letterSpacing: "-0.04em" }],
        "11xl": ["11rem", { lineHeight: "0.86", letterSpacing: "-0.04em" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
      },
      boxShadow: {
        soft: "0 20px 60px -24px rgba(20, 16, 26, 0.2)",
        lift: "0 32px 90px -32px rgba(20, 16, 26, 0.38)",
        pink: "0 24px 70px -24px rgba(204, 0, 102, 0.45)",
        card: "0 2px 0 0 rgba(20, 16, 26, 0.04), 0 24px 60px -30px rgba(20, 16, 26, 0.25)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(2deg)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "marquee-slow": "marquee 48s linear infinite",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "spin-slow": "spin-slow 26s linear infinite",
        wiggle: "wiggle 6s ease-in-out infinite",
        blink: "blink 2.4s ease-in-out infinite",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
