/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {}
	},
	plugins: [
		require('daisyui'),
		function ({ addUtilities }) {
			const containerUtility = {
				'.cont': {
					'padding-left': '16px',
					'padding-right': '16px',
					'@screen sm': {
						'padding-left': '40px',
						'padding-right': '40px'
					},
					'@screen md': {
						'padding-left': '100px',
						'padding-right': '100px'
					},
					'@screen 2xl': {
						'padding-left': '200px',
						'padding-right': '200px'
					}
				}
			}
			addUtilities(containerUtility, ['responsive'])
		}
	],
	daisyui: {
		themes: ['business', 'nord', 'cupcake', 'black', 'dim'], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ':root' // The element that receives theme color CSS variables
	}
}
