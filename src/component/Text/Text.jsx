import React, { useRef, useState } from "react";
import styles from "./Text.module.css";
import axios from "axios";

const About = () => {
  const [prompt, setPrompt] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPrompt(e.target.value);

    // Auto-grow textarea height
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSend = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const res = await axios.post(`http://localhost:8080/chat`, { inp: prompt });
      setResponseText(res.data);
    } catch (err) {
      console.error(err);
      setResponseText("⚠️ Error: Could not fetch response.");
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  const handleKeyDown = (e) => {
    // Allow Enter + Shift for new line
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.aboutPage}>
      <div className={styles.chatContainer}>
        {responseText && (
          <div className={styles.responseBox}>
            <h3>Response:</h3>
            <p>{responseText}</p>
          </div>
        )}

        <div className={styles.inputArea}>
          <textarea
            className={styles.textarea}
            placeholder="Type your message..."
            value={prompt}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
  className={styles.sendBtn}
  onClick={handleSend}
  disabled={loading}
  aria-label="Send"
>
  <span className={styles.arrow}></span>
</button>
        </div>
      </div>
    </div>
  );
};

export default About;
