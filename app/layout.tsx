import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Separator } from '@/components/ui/separator'
import NavBar from '@/components/NavBar'
import { ThemeProvider } from '@/providers/ThemProvider'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Reminder App',
  description: 'Simple App For Creating Reminders',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn(inter.className, 'dark')}
        style={{
          colorScheme: 'dark',
        }}
      >
        <ThemeProvider>
          <body>
            <div
              className="
          flex
          min-h-screen
          w-full
          flex-col
          items-center
          dark:bg-black "
            >
              <NavBar />
              <Separator />
              <main className="flex flex-grow w-full justify-center dark:bg-neutral-950 items-center">
                {children}
                <Toaster />
              </main>
            </div>
          </body>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  )
}
