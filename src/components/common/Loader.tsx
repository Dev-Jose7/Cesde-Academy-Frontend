// src/components/common/Loader.tsx
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import "./Loader.css";

let showExternalLoader: (message?: string) => void;
let hideExternalLoader: () => void;

export function useGlobalLoader() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("Cargando...");

  useEffect(() => {
    showExternalLoader = (msg = "Cargando...") => {
      setMessage(msg);
      setVisible(true);
    };
    hideExternalLoader = () => setVisible(false);
  }, []);

  if (!visible) return null;

  return ReactDOM.createPortal(
    <div className="loader-overlay">
      <div className="loader-spinner" />
      <p className="loader-message">{message}</p>
    </div>,
    document.body
  );
}

export function showLoader(message?: string) {
  showExternalLoader?.(message);
}

export function hideLoader() {
  hideExternalLoader?.();
}
