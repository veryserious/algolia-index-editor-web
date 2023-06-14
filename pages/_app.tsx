import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ModalProvider } from "@/features/Modal";
import { HitProvider } from "@/features/Hit";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HitProvider>
        <ModalProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ModalProvider>
      </HitProvider>
    </>
  );
}
