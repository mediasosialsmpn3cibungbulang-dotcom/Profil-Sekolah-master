import './global.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'SMPN 3 Cibungbulang',
  description: 'Website Profil Resmi SMPN 3 Cibungbulang',
  icons: {
    icon: '/images/Logo.png',
    apple: '/images/Logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
