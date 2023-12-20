
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RealT Editor',
  description: 'A real time coding editor',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
      <Footer />  
      </body>
    </html>
  )
}

//Always wrap header and footer inside body othewise it will give following
/**
  Error: There was an error while hydrating. 
  Because the error happened outside of a Suspense boundary, 
  the entire root will switch to client rendering 
 */