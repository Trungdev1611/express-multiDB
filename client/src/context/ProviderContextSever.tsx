'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./ToastContext";
import React from "react";

//cho vào đây để khỏi phải dùng use client trong rootlayout => khiến toàn bộ app thành client

// Create a client
const queryClient = new QueryClient()
export function ProviderContextServer({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>
        <ToastProvider>{children}</ToastProvider>;
    </QueryClientProvider>

}