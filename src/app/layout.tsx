import "./globals.css";

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Toaster } from "sonner";
import { AuthProvider } from './providers/auth-provider';





export const metadata: Metadata = {
  title: 'StitchPay — облік роботи та заробітку',
  description: 'Особистий кабінет обліку роботи та виплат для швачок',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
    <html lang="uk">
      <body>
          <AuthProvider>
             {/* <SwipeNavigation
          routes={[   ]}
        ></SwipeNavigation> */}
          {children}
          </AuthProvider>
           <Toaster
         position="top-right"
         richColors
         closeButton
         duration={4000}
          />
      </body>
    </html>
  );
}
