import React, { useEffect, useState } from "react";
import styles from "./SignUp.module.css";
import axios from "axios";
import { useNavigate} from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function Auth() {
  const navigate=useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");          // ✅ NEW
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  
useEffect(()=>{
    const check = async ()=> {
       try{
        const res= await axios.get("http://localhost:8080/verify",{
          withCredentials:true })
            if(res.status===200)
            {
              navigate("/dashboard")
            }
             
       }catch(err){
            console.log(err )}
    }

    check()
},[])
 


















  const validate = () => {
    // ✅ Validate name only for signup
    if (!isLogin && name.trim().length < 3) {
      return "Name must be at least 3 characters long";
    }

    if (!emailRegex.test(email)) {
      return "Invalid email address";
    }

    if (!passwordRegex.test(password)) {
      return "Password must be 8+ chars, include uppercase, lowercase, number & special character";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const payload = isLogin
        ? { email, password }
        : { name, email, password }; // ✅ send name only on signup

      const res = await fetch(
        `http://localhost:8080/${isLogin ? "login" : "signup"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
             console.log(data);
             
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert(isLogin ? "Login successful" : "Signup successful");
      isLogin ? navigate("/dashboard") : setIsLogin(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        {/* ✅ Name field only for signup */}
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </button>

        <p className={styles.switch}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Auth;
