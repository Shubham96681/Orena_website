/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'orena-green-dark': '#1E7F4F',
                'orena-green-light': '#7ED957',
            },
        },
    },
    plugins: [],
}
