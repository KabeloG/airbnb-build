import "../styles/globals.css";
import { Montserrat } from "next/font/google";
import { airbnbCereal } from "../font-config/font";
import { Toaster } from "react-hot-toast";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import Footer from "../components/Footer";
import { useState } from "react";
import { SearchContext } from "../context/SearchContext";

const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "z-50",
  delay: 100,
});

const montserrat = Montserrat({ subsets: ["latin"] });

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  const [noOfGuests, setNoOfGuests] = useState(1);

  return (
    <main
      className={`${airbnbCereal.variable} ${montserrat.className}`}
      suppressHydrationWarning={true}
    >
      <SearchContext.Provider
        value={{
          noOfGuests,
          setNoOfGuests,
        }}
      >
        <Component {...pageProps} />
        <Toaster />
      </SearchContext.Provider>
      <Footer />
    </main>
  );
}

export default MyApp;
