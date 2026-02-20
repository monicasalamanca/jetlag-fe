"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function LifestyleError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Lifestyle page error:", error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#333" }}>
        Could not load lifestyle posts
      </h2>
      <p style={{ marginBottom: "2rem", color: "#666", maxWidth: "500px" }}>
        We ran into a problem loading the latest lifestyle content. This is
        usually temporary — give it a moment and try again.
      </p>
      <button
        onClick={reset}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "0.375rem",
          cursor: "pointer",
          transition: "background-color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#0056b3";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#007bff";
        }}
      >
        Try again
      </button>
      {process.env.NODE_ENV === "development" && (
        <details
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "0.375rem",
            maxWidth: "600px",
            textAlign: "left",
          }}
        >
          <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
            Error Details (Development Only)
          </summary>
          <pre
            style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: "#e9ecef",
              borderRadius: "0.25rem",
              overflow: "auto",
              fontSize: "0.875rem",
            }}
          >
            {error.message}
          </pre>
        </details>
      )}
    </div>
  );
}
