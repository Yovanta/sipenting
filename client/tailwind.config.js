module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
    },
    screens: {
      phone: { min: "320px", max: "480px" },
      tablet: { min: "481px", max: "768px" },
      laptop: { min: "769px", max: "1023px" },
      desktop: { min: "1024px", max: "1200px" },
    },
    colors: {
      primary: {
        blue: "#4C35E0",
        green: "#6EB762",
        successful: "#B7FFAB",
        mossgreen: "#4BAAA5",
        orange: "#FFCA42",
        white: "#FFFFFF",
        red: "#FF3030",
        black: "#1F1F1F",
        gray: "#5C5C5C",
      },
      secondary: {
        successful: "#D3FFCC",
        error: "#FFC0C0",
        yellow: "#FFEEC3",
        softblue: "#EDEAFF",
        white2: "#FDFEFF",
        white3: "#F4F4F4",
        blue2: "#4C34E9",
        gray2: "#888686",
        gray3: "#D7D7D7",
        blackrgba: "rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
