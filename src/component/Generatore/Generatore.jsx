import React, { useState } from "react";
import styles from "./Generatore.module.css";

function Generatore() {
  const [prompt, setPrompt] = useState("");
  const [dat, setDat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const Generate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setDat(null);

    try {
      const response = await fetch(
        `http://localhost:8080/image?prompt=${encodeURIComponent(prompt)}`
      );
      const data = await response.json();
               
      if (data.image) {
        setDat(data.image); // base64 image string
      } else {
        setError("No image returned from server.");
      }
    } catch (err) {
      console.error("Error generating image:", err);
      setError("Failed to generate image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contain}>
        <div className={styles.main}>
          <input
            type="text"
            placeholder="Enter Your Prompt"
            value={prompt}
            onChange={handlePromptChange}
            className={styles.input}
          />
          <button
            onClick={Generate}
            disabled={loading}
            className={styles.generate}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.image}>
          {dat && <img src={dat} alt="Generated" />}
        </div>
      </div>
    </div>
  );
}

export default Generatore;
