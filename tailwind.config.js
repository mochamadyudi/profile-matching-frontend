/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'mk-',
  content: [
      './public/*.{js,html,jsx}',
      './src/*.{js,html,jsx}',
      './src/**/*.{js,html,jsx}',
      './src/**/**/*.{js,html,jsx}',
      './src/**/**/**/*.{js,html,jsx}',
      './src/**/**/**/**/*.{js,html,jsx}',
      './src/**/**/**/**/**/*.{js,html,jsx}',
      './src/**/**/**/**/**/**/*.{js,html,jsx}',
      './src/**/**/**/**/**/**/**/*.{js,html,jsx}',
      './src/**/**/**/**/**/**/**/**/*.{js,html,jsx}',
      './src/**/**/**/**/**/**/**/**/**/*.{js,html,jsx}',
      './src/**/**/**/**/**/**/**/**/**/**/*.{js,html,jsx}',
      './src/**/**/**/**/**/**/**/**/**/**/**/*.{js,html,jsx}',
      './src/**/**/**/**/**/**/**/**/**/**/**/**/*.{js,html,jsx}',
      './src/**/**/**/**/**/**/**/**/**/**/**/**/**/*.{js,html,jsx}',
      './src/**/**/**/**/**/**/**/**/**/**/**/**/**/**/*.{js,html,jsx}',
      './src/**/**/**/**/**/**/**/**/**/**/**/**/**/**/**/*.{js,html,jsx}',
      './src/**/**/**/**/**/**/**/**/**/**/**/**/**/**/**/**/*.{js,html,jsx}',
      './src/**/**/**/**/**/**/**/**/**/**/**/**/**/**/**/**/**/*.{js,html,jsx}',

  ],
    mode:'jit',
    darkMode:'class',
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
    ],
}
