import * as React from "react";
import { Poppins } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import ReactQueryProvider from "../context/ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

const inter = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ background: "#eef8ff" }}>
        <ReactQueryProvider>
          <AppRouterCacheProvider>
            {/* <ThemeProvider theme={theme}> */}
              {children}
            {/* </ThemeProvider> */}
          </AppRouterCacheProvider>
        </ReactQueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
