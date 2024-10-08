import React from 'react';
import {
  Work_Sans,
  Spline_Sans_Mono,
} from 'next/font/google';
import clsx from 'clsx';
import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './styles.css';

import { cookies } from 'next/headers';

const mainFont = Work_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family',
});
const monoFont = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family-mono',
});
export const metadata={
  title :'Bits & Bytes'
}
function RootLayout({ children }) {
  // TODO: Dynamic theme depending on user preference
  const savedThem= cookies().get('color-theme')
  const theme = savedThem?.value || 'light';
  console.log(theme)

  return (
    <html
      lang="en"
      className={clsx(mainFont.variable, monoFont.variable)}
      data-color-theme={theme}
      style={theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS}
    >
      <body>
        <Header initheme={theme} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
