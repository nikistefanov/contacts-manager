const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: [],
    darkMode: false,
    important: true,
    theme: {
        extend: {
            screens: {
                'md-lg': '860px',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
