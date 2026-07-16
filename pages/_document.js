import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="vi" className="scroll-smooth">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  cream: { light: '#FDFBF7', DEFAULT: '#FAF6F0', dark: '#F3EDE2' },
                  charcoal: { light: '#57534E', DEFAULT: '#1C1917', dark: '#0C0A09' },
                  gold: { light: '#DFCFB7', DEFAULT: '#C5A880', dark: '#9B7A3E' }
                },
                fontFamily: {
                  serif: ['"Cormorant Garamond"','serif'],
                  sans: ['"Inter"','sans-serif']
                }
              }
            }
          }
        ` }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
