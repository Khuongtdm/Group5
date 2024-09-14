/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: { brand: '#FF5C26', body: '#fafafa' },
			fontFamily: { sans: ['Inter var', ...require('tailwindcss/defaultTheme').fontFamily.sans] },
		},
	},
	plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar-hide')],
};
