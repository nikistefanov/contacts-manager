const colors = require('tailwindcss/colors')

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    important: true,
    theme: {
        extend: {
            screens: {
                'md-lg': '920px',
            },
        },
    },
    variants: {},
    plugins: [],
}
