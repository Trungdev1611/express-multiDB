import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import "./globals.css"
import Sidebar from "@/components/Sidebar/Sidebar"

export default function RootLayout(props) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ key: "css" }}>
           {props.children}
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
