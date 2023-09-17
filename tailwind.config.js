/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.{html,js}", "./js/templates/*.js"],
    theme: {
        extend: {
            keyframes: {
                dropdown: {
                    "0%": { transform: "scaleY(0)", visibility: "hidden" },
                    "100%": { transform: "scaleY(1)" },
                },
                fade: {
                    "0%": { opacity: "0%" },
                    "100%": { opacity: "100%" },
                },
            },
            animation: {
                dropdownOpen: "dropdown 400ms both normal",
                dropdownClose: "dropdown 400ms both reverse",
                fade: "fade 300ms ",
            },
        },
    },
    plugins: [],
};
