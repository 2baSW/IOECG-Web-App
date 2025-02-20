/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#64748B', // bleu principal
                secondary: '#64748B', // gris secondaire
                background: '#F3F4F6', // couleur de fond
                'light-blue': '#93C5FD', // bleu clair
            },

            fontFamily: {
                sans: ['Roboto', 'Arial', 'sans-serif'],
                serif: ['Georgia', 'serif'],
            },

            spacing: {
                18: '4.5rem',
            },

            fontSize: {
                xl: ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
            },

            boxShadow: {
                'inner-lg': 'inset 0 4px 6px rgba(0, 0, 0, 0.1)',
            },

            // Personnalisation des bordures (radius, épaisseur, etc.)
            borderRadius: {
                'lg': '1rem', // Arrondi des coins
                'full': '9999px', // Bordure complètement arrondie
            },
        },
    },
    plugins: [
        // Exemple d'ajout de plugin officiel pour les formulaires
        //require('@tailwindcss/forms'),
        // Ajoute d'autres plugins si nécessaire
    ],
}
