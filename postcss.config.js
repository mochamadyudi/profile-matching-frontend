module.exports = {
  plugins:
    [
        require('autoprefixer'),
        require('tailwindcss'),
        require('postcss-plugin'),
        require('postcss-import'),
        require('tailwindcss/nesting')
    ]
}

module.exports = {
    plugins: {
        'postcss-import': {},
        cssnano: {
            preset: 'default'
        },
        tailwindcss: {},
        autoprefixer: {},
        'postcss-plugin': {}
    },
}
