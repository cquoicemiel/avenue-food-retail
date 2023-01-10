module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    letterSpacing: {
      widest: '.15em'
    },
    extend: {
      keyframes:{
        button: {
          "0%, 100%": { transform: "scale(1)", opacity: '1'},
          "50%": { transform: "scale(0.95)", opacity: '0.8' }
        },
        pop: {
          "0%, 100%": { transform: "scale(1)"},
          "50%": {transform: 'scale(1.15)'}
        },
        smPop: {
          "0%, 100%": { transform: "scale(1)"},
          "50%": {transform: 'scale(1.05)'}
        }
      },
      animation: {
        button: "button .15s ease-in-out",
        pop: "pop .12s ease-in-out",
        smPop: "smPop .2s ease-in-out",
      },
    },

  },
  plugins: [],
}