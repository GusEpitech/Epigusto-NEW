import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "../components/Analytics";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
