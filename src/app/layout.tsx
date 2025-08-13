// src/app/layout.tsx
"use client"
import SideBar from "@/components/SideBar";
import "./globals.css";
import { store } from "@/redux/store";
import { Provider } from 'react-redux';
import { ThemeProvider } from "next-themes";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body >
        <Provider store = {store}>
          <ThemeProvider attribute="data-theme" defaultTheme="light">
            <div className="flex">
          <SideBar />
          {children}
          </div>
          </ThemeProvider>
          
        </Provider>
      </body>
    </html>
  );
}
