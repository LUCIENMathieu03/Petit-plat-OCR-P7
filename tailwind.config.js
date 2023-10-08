/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.{html,js}", "./js/templates/*.js"],
    theme: {
        extend: {
            keyframes: {
                dropdownOpening: {
                    "0%": { transform: "scaleY(0)" },
                    "100%": { transform: "scaleY(1)" },
                },
                dropdownClosing: {
                    "0%": { transform: "scaleY(1)" },
                    "100%": { transform: "scaleY(0)" },
                },
                arrowDropdownOpen: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(180deg)" },
                },
                arrowDropdownClose: {
                    "0%": { transform: "rotate(180deg)" },
                    "100%": { transform: "rotate(0deg)" },
                },
                fadeUp: {
                    "0%": { opacity: "0%", transform: "translateY(100px)" },
                    "100%": { opacity: "100%", transform: "translateY(0px)" },
                },
            },
            animation: {
                dropdownOpening: "dropdownOpening 200ms both",
                dropdownClosing: "dropdownClosing 200ms both",
                arrowDropdownOpen: "arrowDropdownOpen 400ms both",
                arrowDropdownClose: "arrowDropdownClose 400ms both",
                fadeUp: "fadeUp 400ms both",
            },
        },
    },
};
