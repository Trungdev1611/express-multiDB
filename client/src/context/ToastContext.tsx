// contexts/ToastContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
}

interface ToastContextProps {
  showToast: (message: string, type?: ToastProps["type"]) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastProps | undefined>(undefined);

  const showToast = (message: string, type: ToastProps["type"] = "info") => {
    setToast({ message, type });
  };

  const handleClose = () => setToast(undefined);

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
