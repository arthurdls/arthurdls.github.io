import './globals.css';
import { Poppins } from 'next/font/google';
import Providers from './Providers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata = {
  title: "Portfolio | Arthur De Los Santos - Computer Science & Engineering",
  description: "Arthur De Los Santos - Candidate for S.B. and admitted to M.Eng. in Computer Science and Engineering at MIT. Experienced in Python, TypeScript/JavaScript, C++, and ROS2.",
  keywords: ["Arthur De Los Santos", "portfolio", "MIT", "computer science", "software engineering", "machine learning", "robotics", "autonomous systems"],
  author: "Arthur De Los Santos",
  openGraph: {
    siteName: "Arthur De Los Santos - Portfolio",
    title: "Portfolio | Arthur De Los Santos - Computer Science & Engineering",
    description: "Arthur De Los Santos - Candidate for S.B. and admitted to M.Eng. in Computer Science and Engineering at MIT. Experienced in Python, TypeScript/JavaScript, C++, and ROS2.",
    url: "https://arthurdls.github.io",
    images: ["https://arthurdls.github.io/portfolio-fork.png"],
  },
  twitter: {
    card: "summary",
    site: "https://arthurdls.github.io",
  },
  applicationName: "Portfolio | Arthur De Los Santos - Computer Science & Engineering",
  appleWebApp: {
    title: "Portfolio | Arthur De Los Santos",
  },
  metadataBase: new URL("https://arthurdls.github.io"),
  alternates: {
    canonical: "https://arthurdls.github.io",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} font-poppins bg-gray-100/50 dark:bg-grey-900 text-black dark:text-white overflow-x-hidden`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
