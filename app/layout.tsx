import { TagProvider } from "@/lib/TagProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Tag management system",
  description: "Created by Palina",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TagProvider>{children}</TagProvider>
        <Toaster />
      </body>
    </html>
  );
}
