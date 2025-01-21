import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SchmugBags - Luxury Handbags",
  description: "Discover our collection of classy, handcrafted luxury handbags",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <NavBar />
          <main>{children}</main>
          
          <footer className="bg-gray-100 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">About SchmugBags</h3>
                  <p className="text-gray-600">Crafting luxury handbags with elegance and sophistication.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="/collection" className="text-gray-600 hover:text-gray-900">
                        Collection
                      </a>
                    </li>
                    <li>
                      <a href="/new-arrivals" className="text-gray-600 hover:text-gray-900">
                        New Arrivals
                      </a>
                    </li>
                    <li>
                      <a href="/about" className="text-gray-600 hover:text-gray-900">
                        About Us
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact</h3>
                  <ul className="space-y-2">
                    <li className="text-gray-600">Email: info@schmugbags.com</li>
                    <li className="text-gray-600">Phone: +1 (555) 123-4567</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                <p className="text-gray-600">&copy; {new Date().getFullYear()} SchmugBags. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
