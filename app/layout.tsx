import SearchBar from "@/components/search";
import "./globals.css";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import Image from "next/image";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lista de paises",
  description: "Uma lista de países criada com o Next 13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunitoSans.className}>
        <main
          className="min-h-screen flex flex-col items-center
         bg-main bg-no-repeat bg-cover bg-fixed"
        >
          <nav
            className="w-full h-16 flex items-center justify-center 
          bg-gradient-to-r  bg-slate-100"
          >
            <section className="container flex items-center  gap-3">
              <Image
                width={48}
                height={48}
                src="/logo.svg"
                alt="Logo da aplicação - emoji de globo"
              />
              <h1 className="font-bold text-2xl">Lista de países</h1>
            </section>
            <section>
              <SearchBar />
              <div>Search Results</div>
            </section>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
