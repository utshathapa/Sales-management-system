import React from "react";
import "../css/modal.css";
import { useTheme } from "../hooks/useTheme"; // your global theme hook

export default function Modal({ isOpen, onClose, title, message }) {
  const { theme } = useTheme(); // 'light' or 'dark'

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${theme}`} onClick={onClose}>
      <div className={`modal-content ${theme}`} onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <button className="modal-close-btn">{/* Add theme class if needed */}
          Close
        </button>
      </div>
    </div>
  );
}