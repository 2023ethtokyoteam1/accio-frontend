/** @type {import('tailwindcss').Config} */
module.exports = {
    experimental: {
        applyComplexClasses: true,
        uniformColorPalette: true,
        extendedFontSizeScale: true,
    },
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                roboto: ["Roboto", "Noto Sans", "Arial"],
                pop: ["Poppins", "Noto Sans", "Arial"],
                sans: ["Noto Sans", "Roboto", "Arial"],
            },
        },
    },
    plugins: [],
};
