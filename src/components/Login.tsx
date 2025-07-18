import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const authChannelRef = useRef<BroadcastChannel | null>(null);

  const login = useCallback((username: string): void => {
    localStorage.setItem("user", username);
    authChannelRef.current?.postMessage({ type: "LOGIN", user: username });
  }, []);

  const isAuthenticated = useCallback((): boolean => {
    return localStorage.getItem("user") !== null;
  }, []);

  const handleLogin = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      login(username);
      navigate("/home");
    },
    [login, navigate, username]
  );

  useEffect(() => {
    // Auth channel setup
    const authChannel = new BroadcastChannel("auth_channel");
    authChannelRef.current = authChannel;

    // User is already logged in, redirect to home
    if (isAuthenticated()) {
      navigate("/home");
      return;
    }

    //  Message handler pattern
    const handler = (event: MessageEvent<{ type: string; user: string }>) => {
      if (event.data.type === "LOGIN" && isAuthenticated()) {
        navigate("/home");
      }
    };

    authChannel.addEventListener("message", handler);

    //  Cleanup pattern
    return () => {
      authChannel.removeEventListener("message", handler);
      authChannel.close();
    };
  }, [authChannelRef, isAuthenticated, navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
