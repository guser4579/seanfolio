import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: {
    default: 'Sean Forquer - Product Designer',
    template: '%s - Sean Forquer',
  },
  description:
    'Sean Forquer is a product designer in Columbus, Ohio. He runs design at Foxen.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
