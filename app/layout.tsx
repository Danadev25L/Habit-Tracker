import type { Metadata } from "next";
import { ClerkProvider, SignedIn, SignedOut, UserButton, SignOutButton } from "@clerk/nextjs";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import SignInComponent from "@/components/SignIn"; // Import SignInComponent

const inter = Inter({ subsets: ["latin"] });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "Track your daily habits and progress",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {/* Show the sign-in page when signed out */}
            <SignedOut>
              <SignInComponent />
            </SignedOut>

            {/* Show the full layout when signed in */}
            <SignedIn>
              <div className="flex flex-col md:flex-row h-screen overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto bg-background p-4">
                  <header className="flex justify-end items-center p-4 gap-4 h-16">
                    {/* Show SignOut and UserButton when signed in */}
                    <UserButton />
                    <SignOutButton />
                  </header>
                  <div className="container mx-auto max-w-4xl">{children}</div>
                </main>
              </div>
              <Toaster />
            </SignedIn>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
