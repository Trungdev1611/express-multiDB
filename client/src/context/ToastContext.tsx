// contexts/ToastContext.tsx
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
}

interface ToastContextProps {
  showToast: (message: string, type?: ToastProps["type"]) => void;
}
export let showToastRef: ((message: string, type?: ToastProps["type"]) => void) | null = null;
const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastProps | undefined>(undefined);



  const showToast = useCallback((message: string, type: ToastProps["type"] = "info") => {
    setToast({ message, type });
  }, []); // ✅ Giữ nguyên function này giữa các lần render


  const handleClose = () => setToast(undefined);

  //setup to call it in Interceptor
  useEffect(() => {
    showToastRef = showToast; // Lưu function này vào biến global
    return () => {
      showToastRef = null; // Cleanup khi unmount
      setToast(undefined)
    };
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar open={!!toast} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        {toast && (
          <Alert onClose={handleClose} severity={toast.type} variant="filled">
            {toast.message}
          </Alert>
        )}
      </Snackbar>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};
