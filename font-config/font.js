import localFont from "@next/font/local";

export const airbnbCereal = localFont({
  src: [
    {
      path: "../public/fonts/AirbnbCereal_W_Bk.otf",
      weight: "400",
    },
  ],
  variable: "--font-airbnb",
});
