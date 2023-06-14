import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Modal, ModalProvider } from "@/features/Modal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ModalProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ModalProvider>
    </>
  );
}
