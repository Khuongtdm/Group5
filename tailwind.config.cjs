/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: { brand: '#00BEE4', body: '#141416' },
			fontFamily: { sans: ['Inter var', ...require('tailwindcss/defaultTheme').fontFamily.sans] },
		},
	},
	plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar-hide')],
};
