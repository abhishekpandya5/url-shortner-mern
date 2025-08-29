import React, { useState, useEffect } from "react";
import UrlForm from "./components/UrlForm";
import Homepage from "./pages/Homepage";

const App = () => {
 

  

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!longUrl.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: longUrl })
      });

      if (response.ok) {
        const result = await response.text();
        setShortUrl(result);
        saveToHistory(longUrl, result);
      } else {
        const errorText = await response.text();
        setError(errorText || "Failed to create short URL. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  

  

  

  return (
    <>
      <Homepage />
    </>
  );
};

export default App;
