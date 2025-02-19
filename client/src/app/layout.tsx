import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import "./globals.css"
import { ProviderContextServer } from "@/context/ProviderContextSever"


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <ProviderContextServer>
            {children}

          </ProviderContextServer>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
