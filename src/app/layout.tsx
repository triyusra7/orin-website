import "./globals.css";

// Root layout is a pass-through; src/app/[locale]/layout.tsx renders the
// document shell so lang/dir and providers follow the active locale.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
