import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getFileUpdatedLabel } from '../lib/github';
import { SHOW_RESUME } from '../lib/data';

export const metadata = {
  metadataBase: new URL('https://www.seanforquer.com'),
  title: {
    default: 'Sean Forquer - Product Designer',
    template: '%s - Sean Forquer',
  },
  description:
    'Sean Forquer is a product designer. He runs design at Foxen as a department of one.',
};

export default async function RootLayout({ children }) {
  // git-derived resume freshness, shown in the contact modal's Resume row
  const resumeUpdated = SHOW_RESUME
    ? await getFileUpdatedLabel('public/SeanForquer_Resume.pdf')
    : null;
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('folio-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();",
          }}
        />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header resumeUpdated={resumeUpdated} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
