import "./globals.css";

export const metadata = {
  title: "Caterers Near Me",
  description: "Find the best caterers for your events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
