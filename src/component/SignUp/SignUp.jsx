import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function SignUp() {
  const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  // Save user details to localStorage after login/signup
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem("authUser", JSON.stringify(user));
    }
  }, [isAuthenticated, user]);

  // Handle Signup button click
  const handleSignup = async () => {
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup", // open signup screen
      },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <h2>Welcome to GenAI</h2>
      {!isAuthenticated ? (
        <button
          onClick={handleSignup}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Sign Up with Auth0
        </button>
      ) : (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>Signed in as:</h3>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
}
